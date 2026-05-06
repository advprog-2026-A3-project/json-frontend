import { API_BASE_URLS } from './api-config';
import createApiClient from './create-api-client';

const inventoryApi = createApiClient(API_BASE_URLS.inventory);

export default inventoryApi;
