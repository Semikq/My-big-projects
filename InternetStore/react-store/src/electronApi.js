export const addUser = async (user) => {
    return await window.api.addUser(user);
};

export const loginUser = async (user) => {
    return await window.api.loginUser(user);
};

export const fetchCategories = async () => {
    return await window.api.getCategories(); 
};

export const fetchProducts = async () => {
    return await window.api.getProducts();
};

export const fetchProductById = async (id) => {
    return await window.api.getProductById(id);
};

export const fetchCategoryById = (id) => {
    return window.api.getCategoryById(id);
};

export const fetchProductCategoryById = (id) => {
    return window.api.getProductCategoryById(id);
};

export const getAllUsers = async () => {
    return await window.api.getAllUsers();;
};

export const fetchPromoteUserToAdmin = (id) => {
    return window.api.promoteUserToAdmin(id);
};

export const fetchDeleteUser = (id) => {
    return window.api.deleteUser(id);
};

export const fetchAddCategory = (name) => {
    return window.api.addCategory(name);
};

export const fetchUpdateCategory = (id, name) => {
    return window.api.updateCategory(id, name);
};

export const fetchDeleteCategory = (id) => {
    return window.api.deleteCategory(id);
};

export const fetchAddProduct = (category_id, name, price, description) => {
    return window.api.addProduct(category_id, name, price, description);
};

export const fetchUpdateProduct = (product_id, category_id, name, price, description) => {
    return window.api.updateProduct(product_id, category_id, name, price, description);
};

export const fetchDeleteProduct = (id) => {
    return window.api.deleteProduct(id);
};

export const getAllOrders = async () => {
    return await window.api.getAllOrders();
};

export const createOrder = (id, status, totalPrice, items) => {
    return window.api.createOrder(id, status, totalPrice, items);
};

export const updateOrderStatus = (orderId, newStatusId) => {
    return window.api.updateOrderStatus(orderId, newStatusId);
};

export const getUserOrderItems = (id) => {
    return window.api.getUserOrderItems(id);
};
