import { API_BASE_URLS } from './api-config';
import createApiClient from './create-api-client';

const inventoryClient = createApiClient(API_BASE_URLS.inventory);

/**
 * Get all products
 * @returns {Promise} Response with all products
 */
export const getProducts = () => {
    return inventoryClient.get('/api/products');
};

/**
 * Create a new product
 * @param {Object} data - Product data
 * @returns {Promise} Response with created product
 */
export const createProduct = (data) => {
    return inventoryClient.post('/api/products', data);
};

/**
 * Get product by ID
 * @param {string|number} id - Product ID
 * @returns {Promise} Response with product details
 */
export const getProductById = (id) => {
    return inventoryClient.get(`/api/products/${id}`);
};

/**
 * Update product
 * @param {string|number} id - Product ID
 * @param {Object} data - Updated product data
 * @returns {Promise} Response with updated product
 */
export const updateProduct = (id, data) => {
    return inventoryClient.put(`/api/products/${id}`, data);
};

/**
 * Delete product
 * @param {string|number} id - Product ID
 * @returns {Promise} Response confirmation
 */
export const deleteProduct = (id) => {
    return inventoryClient.delete(`/api/products/${id}`);
};

/**
 * Search products by name
 * @param {string} nama - Product name to search
 * @returns {Promise} Response with matching products
 */
export const searchProductsByName = (nama) => {
    return inventoryClient.get('/api/products/search/nama', {
        params: { nama },
    });
};

/**
 * Get products by Jastiper ID
 * @param {string|number} jastiperId - Jastiper ID
 * @returns {Promise} Response with products for the Jastiper
 */
export const getProductsByJastiper = (jastiperId) => {
    return inventoryClient.get('/api/products/search/jastiper', {
        params: { jastiperId },
    });
};

// Export the client as default for backward compatibility
export default inventoryClient;
