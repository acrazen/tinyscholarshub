// src/lib/services/resourceService.ts
'use server';

import { sampleResources } from '@/lib/data';
import type { ResourceItem } from '@/lib/types';
// import { API_ENDPOINTS } from '@/lib/api/endpoints';

/**
 * Fetches all resources.
 * Currently returns mock data.
 */
export const getResources = async (): Promise<ResourceItem[]> => {
  // TODO: Replace with actual API call
  // const response = await fetch(API_ENDPOINTS.resources);
  // ...
  return Promise.resolve(sampleResources);
};
