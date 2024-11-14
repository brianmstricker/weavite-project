"use server";
import weaviate, { WeaviateClient } from "weaviate-client";

type Row = {
 image: {
  src: string;
 };
 item_ID: string;
 query: string;
 title: string;
 position: number;
};

export async function initWeaviteClient() {
 const wcdUrl = process.env.WCD_URL as string;
 const wcdApiKey = process.env.WCD_API_KEY as string;

 try {
  const client: WeaviateClient = await weaviate.connectToWeaviateCloud(wcdUrl, {
   authCredentials: new weaviate.ApiKey(wcdApiKey),
  });

  await client.isReady();

  // await insertData(client);
  await getDBData(client);

  client.close();
 } catch (error) {
  console.error(error);
 }
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
 const data = allData.rows.map((item: { row: Row }) => ({
  ...item.row,
  image: item.row.image.src,
 }));
 // console.log(data);
 return data;
}

async function insertData(client: WeaviateClient) {
 const schema = client.collections.get("Google_Shopping");
 const data = await getExternalData();
 const result = await schema.data.insertMany(data);
 console.log("Insertion response: ", result);
}

async function getDBData(client: WeaviateClient) {
 const questions = client.collections.get("Google_Shopping");
 const response = await questions.query.fetchObjects();
 console.log("DB Data: ", response.objects);
 return response.objects;
}
