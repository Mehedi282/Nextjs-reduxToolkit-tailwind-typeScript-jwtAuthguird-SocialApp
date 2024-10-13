import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export interface MutationResult {
    data?: any; // Replace with the actual data type returned by the mutation
    error?: string[] | FetchBaseQueryError | SerializedError;  // Replace with the actual error type if applicable
  }