const { contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld('api', {
    addUser: (user) => ipcRenderer.invoke('addUser', user),
    loginUser: (user) => ipcRenderer.invoke('loginUser', user),
    getCategories: () => ipcRenderer.invoke('getCategories'),
    getProducts: () => ipcRenderer.invoke('getProducts'),
    getProductById: (id) => ipcRenderer.invoke('getProductById', id),
    getCategoryById: (id) => ipcRenderer.invoke('getCategoryById', id),
    getProductCategoryById: (id) => ipcRenderer.invoke('getProductCategoryById', id),
    getAllUsers: () => ipcRenderer.invoke('getAllUsers'),
    promoteUserToAdmin: (id) => ipcRenderer.invoke('promoteUserToAdmin', id),
    deleteUser: (id) => ipcRenderer.invoke('deleteUser', id),
    addCategory: (name) => ipcRenderer.invoke('addCategory', name),
    updateCategory: (id, name) => ipcRenderer.invoke('updateCategory', id, name),
    deleteCategory: (id) => ipcRenderer.invoke('deleteCategory', id),
    addProduct: (category_id, name, price, description) => ipcRenderer.invoke('addProduct', category_id, name, price, description),
    updateProduct: (product_id, category_id, name, price, description) => ipcRenderer.invoke('updateProduct', product_id, category_id, name, price, description),
    deleteProduct: (id) => ipcRenderer.invoke('deleteProduct', id),
    createOrder: (id, status, totalPrice, items) => ipcRenderer.invoke('createOrder', id, status, totalPrice, items),
    getAllOrders: () => ipcRenderer.invoke('getAllOrders'),
    updateOrderStatus: (orderId, newStatusId) => ipcRenderer.invoke('updateOrderStatus', orderId, newStatusId),
    getUserOrderItems: (id) => ipcRenderer.invoke('getUserOrderItems', id)
});