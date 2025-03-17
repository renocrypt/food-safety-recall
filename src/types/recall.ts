// src/types/recall.ts

export interface Recall {
  recall_number: string;
  recalling_firm: string;
  product_description: string;
  reason_for_recall: string;
  recall_initiation_date: string; // Consider using Date objects if you need date manipulation
  status: string;
  classification: string; // E.g., Class I, Class II, Class III
  distribution_pattern: string;
  product_quantity: string;
  code_info: string;
  //Add other fields that are relevant from the API data
}

// Interface for the API response (adjust based on the actual API structure)
export interface RecallApiResponse {
  results: Recall[];
  meta: {
    //add meta information like, for example, total results
    results: {
      total: number;
    };
  };
}
