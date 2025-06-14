// lib/api.ts
import ky from 'ky';
import { CreatePrimaryCategory, PrimaryCategory, UpdatePrimaryCategory, 
  CreateSecondaryCategory, SecondaryCategory, UpdateSecondaryCategory,
  Transaction,
  CreateTransaction,
  UpdateTransaction,
  MonthSummaryStats} from '@/types';


const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

if (!backendUrl) {
  throw new Error('NEXT_PUBLIC_BACKEND_URL is not defined in .env');
}

export const api = ky.create({
  prefixUrl: backendUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getPrimaryCategories = async (): Promise<PrimaryCategory[]> => {
  return api.get('primary_category/').json();
};

export const createPrimaryCategory = async (data: CreatePrimaryCategory) => {
  return api.post('primary_category/', { json: data }).json();
};

export const deletePrimaryCategory = async (id: number) => {
  return api.delete(`primary_category/${id}/`).json();
};
export const updatePrimaryCategory = async (
  id: number,
  data: UpdatePrimaryCategory
): Promise<PrimaryCategory> => {
  return api.put(`primary_category/${id}/`, { json: data }).json();
};

export const getSecondaryCategories = async (): Promise<SecondaryCategory[]> => {
  return api.get('secondary-category/').json();
};

export const createSecondaryCategory = async (data: CreateSecondaryCategory) => {
  return api.post('secondary-category/', { json: data }).json();
};

export const deleteSecondaryCategory = async (id: number) => {
  return api.delete(`secondary-category/${id}/`).json();
};
export const updateSecondaryCategory = async (
  id: number,
  data: UpdateSecondaryCategory
): Promise<SecondaryCategory> => {
  return api.put(`secondary-category/${id}/`, { json: data }).json();
};

export const getTransactions = async (): Promise<Transaction[]> => {
  return api.get('transactions/').json();
};

export const createTransaction = async (data: CreateTransaction) => {
  return api.post('transactions/', { json: data }).json();
};

export const deleteTransaction = async (id: number) => {
  return api.delete(`transactions/${id}/`).json();
};
export const updateTransaction = async (
  id: number,
  data: UpdateTransaction
): Promise<Transaction> => {
  return api.put(`transactions/${id}/`, { json: data }).json();
};

export const getMonthSummaryData = async ():Promise<MonthSummaryStats> => {
  return api.get('transactions/get_curr_month_summary/').json();
}