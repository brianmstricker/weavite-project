"use server";
import weaviate, { WeaviateClient } from "weaviate-client";
import axios from "axios";
import { Data, Row } from "@/types";

const cache = new Map<string, { data: Data[]; timestamp: number }>();
const cacheTTL = 1000 * 60 * 60; // 1 hour

export async function initWeaviteAndGetData(pageNumber: number = 1) {
 const wcdUrl = process.env.WCD_URL as string;
 const wcdApiKey = process.env.WCD_API_KEY as string;

 const cacheKey = "weavite-data";
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

  // await insertData(client);

  const res = await getDBData(client, pageNumber);
  // console.log(res.length);

  client.close();
  cache.set(cacheKey, { data: res, timestamp: now });
  return res;
 } catch (error) {
  console.error(error);
 }
}

async function downloadImage(url: string): Promise<string> {
 const response = await axios.get(url, { responseType: "arraybuffer" });
 const base64Image = Buffer.from(response.data, "binary").toString("base64");
 return base64Image;
}

async function getExternalData() {
 const dataset = "Marqo/google-shopping-general-eval-100k";
 const config = "default";
 const split = "test";
 const offset = 0;
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
 // console.log(data);
 return data;
}

async function insertData(client: WeaviateClient) {
 const schema = client.collections.get("Google_Shopping");
 // const clearSchema = await schema.data.deleteMany(schema.filter.byProperty("item_ID").like("*"));
 // console.log("Clear response: ", clearSchema);
 const data = await getExternalData();
 const result = await schema.data.insertMany(data);
 console.log("Insertion response: ", result);
}

async function getDBData(client: WeaviateClient, page: number = 1): Promise<Data[]> {
 const schema = client.collections.get("Google_Shopping");
 const response = await schema.query.fetchObjects({
  limit: 24,
  offset: (page - 1) * 24,
 });
 // console.log("response", response.objects);
 const data: Data[] = response.objects.map((obj: any) => ({
  image: obj.properties.image,
  item_ID: obj.properties.item_ID,
  query: obj.properties.query,
  title: obj.properties.title,
  position: obj.properties.position,
 }));
 return data;
}
