"use server";
import weaviate, { WeaviateClient } from "weaviate-client";
import axios from "axios";
import { Data, Row } from "@/types";

const cache = new Map<string, { data: Data[]; timestamp: number }>();
const cacheTTL = 1000 * 60 * 60; // 1 hour

export async function initWeaviteAndGetData(pageNumber: number = 1, searchQuery: string = "") {
 const wcdUrl = process.env.WCD_URL as string;
 const wcdApiKey = process.env.WCD_API_KEY as string;

 const cacheKey = `weavite-data-${pageNumber}`;
 const now = Date.now();

 if (cache.has(cacheKey)) {
  const cachedData = cache.get(cacheKey);
  if (cachedData && now - cachedData.timestamp < cacheTTL) {
   return cachedData.data;
  } else {
   cache.delete(cacheKey);
  }
 }

 try {
  const client: WeaviateClient = await weaviate.connectToWeaviateCloud(wcdUrl, {
   authCredentials: new weaviate.ApiKey(wcdApiKey),
  });

  await client.isReady();

  // const data = await clearData(client);
  // const data = await insertData(client);

  const data = await getDBData(client, pageNumber, searchQuery);

  client.close();
  cache.set(cacheKey, { data, timestamp: now });
  return data;
 } catch (error) {
  console.error(error);
  return null;
 }
}

async function downloadImage(url: string): Promise<string> {
 const response = await axios.get(url, { responseType: "arraybuffer" });
 const base64Image = Buffer.from(response.data, "binary").toString("base64");
 return base64Image;
}

async function getExternalData(offset: number = 0) {
 const dataset = "Marqo/google-shopping-general-eval-100k";
 const config = "default";
 const split = "test";
 const length = 100;

 const response = await fetch(
  `https://datasets-server.huggingface.co/rows?dataset=${dataset}&config=${config}&split=${split}&offset=${offset}&length=${length}`
 );
 const allData = await response.json();
 const data = await Promise.all(
  allData.rows.map(async (item: { row: Row }) => {
   const imageUrl = item.row.image.src;
   const imageBuffer = await downloadImage(imageUrl);
   return { ...item.row, image: imageBuffer };
  })
 );
 return data;
}

async function insertData(client: WeaviateClient) {
 const schema = client.collections.get("Google_Shopping");
 const totalItems = 1000;
 const batchSize = 100;
 const processedItems = new Set<string>();
 for (let offset = 0; offset < totalItems; offset += batchSize) {
  console.log(`Fetched items ${offset} to ${offset + batchSize}:`);
  const data = await getExternalData(offset);
  const newData = data.filter((item: Data) => {
   if (processedItems.has(item.title)) {
    console.log(`Skipping duplicate item: ${item.title}`);
    return false;
   }
   processedItems.add(item.title);
   return true;
  });
  if (newData.length > 0) {
   await schema.data.insertMany(newData);
   console.log(`Inserted ${newData.length} new items`);
  } else {
   console.log("No new items to insert in this batch");
  }
 }
 await new Promise((resolve) => setTimeout(resolve, 1000));
 console.log(`Total unique items processed: ${processedItems.size}`);
}

async function getDBData(client: WeaviateClient, page: number = 1, searchQuery: string): Promise<Data[]> {
 const schema = client.collections.get("Google_Shopping");
 const response = await schema.query.fetchObjects({
  limit: 24,
  offset: (page - 1) * 24,
 });
 const data: Data[] = response.objects.map((obj: any) => ({
  image: obj.properties.image,
  item_ID: obj.properties.item_ID,
  query: obj.properties.query,
  title: obj.properties.title,
  position: obj.properties.position,
 }));
 return data;
}

async function clearData(client: WeaviateClient) {
 const schema = client.collections.get("Google_Shopping");
 const clearSchema = await schema.data.deleteMany(schema.filter.byProperty("item_ID").like("*"));
 console.log("Clear response: ", clearSchema);
}
