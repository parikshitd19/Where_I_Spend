// types/index.ts

export interface PrimaryCategory {
  id: number;
  name: string;
  description?: string;
}

export interface SecondaryCategory {
  id: number;
  name: string;
  description?: string;
  primary_category_id: number;
  primary_category?: PrimaryCategory;
}

export interface Transaction {
  id: string;
  amount: number; // or number if you plan to parse it
  place: string;
  details?: string;
  transaction_date: Date; // ISO format (e.g. "2024-06-01")
  secondary_category_id: number;
  primary_category_id: number;
  primary_category?: PrimaryCategory;
  secondary_category?: SecondaryCategory;
}

// Create/update types

export type CreatePrimaryCategory = Omit<PrimaryCategory, 'id'>;
export type CreateSecondaryCategory = Omit<SecondaryCategory, 'id'>;
export type CreateTransaction = Omit<Transaction, 'id'>;

export type UpdatePrimaryCategory = Partial<PrimaryCategory>;
export type UpdateSecondaryCategory = Partial<SecondaryCategory>;
export type UpdateTransaction = Partial<Transaction>;
