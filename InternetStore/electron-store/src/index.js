const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path') 
const { connection, addUser, loginUser, getCategories, getProducts, getProductById, getCategoryById, getProductCategoryById, addCategory, updateCategory, deleteCategory, addProduct, updateProduct, deleteProduct, getAllUsers, promoteUserToAdmin, deleteUser, createOrder, updateOrderStatus, getAllOrders, getUserOrderItems } = require('./db')

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            enableRemoteModule: false,
            nodeIntegration: false, 
        },
    })

    mainWindow.setMenuBarVisibility(false)
    mainWindow.loadURL('http://localhost:3000')
    
}

app.whenReady().then(() => {
    ipcMain.handle('addUser', async (event, user) => {
        return await addUser(user);
    });

    ipcMain.handle('loginUser', async (event, user) => {
        return await loginUser(user);
    });

    ipcMain.handle('getCategories', async () => {
        return await getCategories()
    })
    
    ipcMain.handle('getProducts', async () => {
        return await getProducts()
    })

    ipcMain.handle('getProductById', async (event, id) => {
        return await getProductById(id)
    })

    ipcMain.handle('getCategoryById', async (event, id) => {
        return await getCategoryById(id);
    })

    ipcMain.handle('getProductCategoryById', async (event, id) => {
        return await getProductCategoryById(id);
    })

    ipcMain.handle('getAllUsers', async (event, id) => {
        return await getAllUsers(id);
    })

    ipcMain.handle('promoteUserToAdmin', async (event, id) => {
        return await promoteUserToAdmin(id);
    })

    ipcMain.handle('deleteUser', async (event, id) => {
        return await deleteUser(id);
    })

    ipcMain.handle('addCategory', async (event, name) => {
        return await addCategory(name);
    })

    ipcMain.handle('updateCategory', async (event, id, name) => {
        return await updateCategory(id, name);
    })
    
    ipcMain.handle('deleteCategory', async (event, id) => {
        return await deleteCategory(id);
    })

    ipcMain.handle('addProduct', async (event, category_id, name, price, description) => {
        return await addProduct(category_id, name, price, description);
    });

    ipcMain.handle('updateProduct', async (event, product_id, category_id, name, price, description) => {
        return await updateProduct(product_id, category_id, name, price, description);
    });

    ipcMain.handle('deleteProduct', async (event, id) => {
        return await deleteProduct(id);
    });

    ipcMain.handle('createOrder', async (event, id, status, totalPrice, items) => {
            return await createOrder(id, status, totalPrice, items);
    });

    ipcMain.handle('getAllOrders', async () => {
        return await getAllOrders();
    });

    ipcMain.handle('updateOrderStatus', async (event, orderId, newStatusId) => {
        return await updateOrderStatus(orderId, newStatusId);
    });

    ipcMain.handle('getUserOrderItems', async (event, userId) => {
        return await getUserOrderItems(userId);
    });
    createWindow()
})

app.on('window-all-closed', () => {
    connection.end()
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})