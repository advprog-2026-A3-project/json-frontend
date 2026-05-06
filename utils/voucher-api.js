import { API_BASE_URLS } from './api-config';
import createApiClient from './create-api-client';

const voucherApi = createApiClient(API_BASE_URLS.voucher);

export default voucherApi;
