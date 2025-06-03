// lib/api.ts
import ky from 'ky';
import { CreatePrimaryCategory, PrimaryCategory, UpdatePrimaryCategory } from '@/types';

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