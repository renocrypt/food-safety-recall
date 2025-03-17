// src/lib/api.ts
import { RecallApiResponse } from "../types/recall";

const API_BASE_URL = "https://api.fda.gov/food/enforcement.json";

export const fetchRecalls = async (
  limit: number = 10,
  skip: number = 0,
  searchTerm: string = "",
): Promise<RecallApiResponse> => {
  try {
    let url = `${API_BASE_URL}?limit=${limit}&skip=${skip}`;

    if (searchTerm) {
      //VERY IMPORTANT: The FDA API uses a specific search syntax
      //We are building a very basic search here.  A real implementation
      //would need to handle complex queries and escaping.
      url += `&search=${searchTerm}`;
    }

    const response = await fetch(url);

    if (!response.ok) {
      //This is VERY important: handle non-200 responses
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data: RecallApiResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching recalls:", error);
    throw error; // Re-throw the error so React Query can handle it
  }
};
