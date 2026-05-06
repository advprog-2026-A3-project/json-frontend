import { API_BASE_URLS } from './api-config';
import createApiClient from './create-api-client';

const authApi = createApiClient(API_BASE_URLS.auth, true);

export default authApi;
