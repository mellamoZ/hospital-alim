"use server";

import algoliasearch, { SearchIndex } from "algoliasearch";
import { EntityType } from "./entityType";

const algoliaAppId = process.env.ALGOLIA_APP_ID;
const algoliaApiKey = process.env.ALGOLIA_API_ID;
const indexName = process.env.ALGOLIA_INDEX_NAME;

if (!algoliaAppId || !algoliaApiKey || !indexName) {
  throw new Error("Algolia environment variables are not set.");
}

interface Entity {
  id: string;
  description: string;
  page: string;
}

interface UpdatedData {
  description: string;
  page: string;
}

interface Record {
  objectID: string;
  description: string;
  page: string;
}

const searchClient = algoliasearch(algoliaAppId, algoliaApiKey);
const index: SearchIndex = searchClient.initIndex(indexName);

export const searchAlgoliaRecords = async (
  query: string
): Promise<Record[]> => {
  try {
    const { hits } = await index.search<Record>(query);
    return hits;
  } catch (error) {
    console.error("Error searching algolia records:", error);
    throw error;
  }
};

export const insertAlgoliaRecord = async (
  entity: Entity,
  entityType: EntityType
): Promise<void> => {
  try {
    await index.saveObject({
      objectID: `${entityType}_${entity.id}`,
      description: entity.description,
      page: entity.page,
    });
  } catch (error) {
    console.error("Error inserting algolia record:", error);
    throw error;
  }
};

export const deleteAlgoliaRecord = async (objectId: string): Promise<void> => {
  try {
    await index.deleteObject(objectId);
  } catch (error) {
    console.error("Error deleting algolia record:", error);
    throw error;
  }
};

export const updateAlgoliaRecord = async (
  entity: Entity,
  entityType: EntityType,
  updatedData: UpdatedData
): Promise<void> => {
  try {
    const existingRecord = await index.getObject(`${entityType}_${entity.id}`);

    const updatedRecord = { ...existingRecord, ...updatedData };

    await index.saveObject(updatedRecord);

    console.log(`Record with objectId ${entity.id} updated successfully.`);
  } catch (error) {
    console.error("Error updating record:", error);
  }
};
