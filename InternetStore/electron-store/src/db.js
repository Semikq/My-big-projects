const mysql = require('mysql2');
const jwt = require('jsonwebtoken')
const secretKey = 'your-secret-key';
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'Q123',
    database: 'shopinternet',
});

const addUser = (user) => {
    return new Promise((resolve, reject) => {
        const query = `
            INSERT INTO users (name, surname, password, email, tel) 
            VALUES (?, ?, ?, ?, ?)
        `;
        const { name, surname, password, email, tel } = user;
        connection.query(
            'SELECT * FROM users WHERE email = ? OR tel = ?', 
            [email, tel], 
            (err, results) => {
                if (err) {
                    reject(err.message);
                } else if (results.length > 0) {
                    reject('Email або телефон вже зареєстровані!');
                } else {
                    connection.query(query, [name, surname, password, email, tel], (err, results) => {
                        if (err) {
                            reject(err.message);
                        } else {
                            const userId = results.insertId;
                            const token = jwt.sign({ userId, role: 'user' }, secretKey, { expiresIn: '1h' });

                            resolve({
                                message: "Користувача успішно додано!",
                                userId,
                                token,
                            });
                        }
                    });
                }
            })
    });
};



const loginUser = ({ email, password }) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 'user' AS role, user_id AS id, name, password 
            FROM users 
            WHERE email = ? 
            UNION 
            SELECT 'admin' AS role, admin_id AS id, name, password 
            FROM admins 
            WHERE email = ? 
        `;

        connection.query(query, [email, email], (err, results) => {
            if (err) {
                reject(err.message);
            } else if (results.length === 0) {
                reject('Неправильний email або пароль!');
            } else {
                const user = results[0]; 
                if (password !== user.password) {
                    reject('Неправильний email або пароль!');
                } else {
                    const token = jwt.sign(
                        { userId: user.id, role: user.role },
                        secretKey,
                        { expiresIn: '1h' }
                    );

                    resolve({
                        message: "Вхід успішний!",
                        userId: user.id,
                        name: user.name,
                        role: user.role,
                        token,
                    });
                }
            }
        });
    });
};

const getCategories = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM categories', (err, results) => {
            if (err) reject(err.message)
            else resolve(results)
        })
    })
}

const getProducts = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM products', (err, results) => {
            if (err) reject(err.message)
            else resolve(results)
        })
    })
}

const getProductById = (id) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM products WHERE product_id = ?', [id], (err, results) => {
            if (err) reject(err.message);
            else resolve(results[0]);
        });
    });
}

const getCategoryById = (id) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM categories WHERE categories_id = ?', [id], (err, results) => {
            if (err) {
                reject(err.message);
            } else if (results.length === 0) {
                reject('Категорія не знайдена');
            } else {
                console.log('Знайдена категорія:', results[0]);
                resolve(results[0]);
            }
        });
    });
};

const getProductCategoryById = (id) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM products WHERE category_id = ?', [id], (err, results) => {
            if (err) reject(err.message);
            else resolve(results);
        });
    });
}

const getAllUsers = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM users';
        connection.query(query, (err, results) => {
            if (err) {
                reject(err.message);
            } else {
                resolve(results);
            }
        });
    });
};

const promoteUserToAdmin = (user_id) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM users WHERE user_id = ?', [user_id], (err, results) => {
            if (err) reject(err.message);
            else if (results.length === 0) {
                reject('Користувача не знайдено');
            } else {
                const user = results[0];
                const queryInsert = `
                    INSERT INTO admins (name, surname, password, email, tel)
                    VALUES (?, ?, ?, ?, ?)
                `;
                connection.query(queryInsert, [user.name, user.surname, user.password, user.email, user.tel], (err, results) => {
                    if (err) reject(err.message);
                    const queryDelete = 'DELETE FROM users WHERE user_id = ?';
                    connection.query(queryDelete, [user_id], (err, results) => {
                        if (err) reject(err.message);
                        else resolve(results); 
                    });
                });
            }
        });
    });
}

const deleteUser = (user_id) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM users WHERE user_id = ?';
        connection.query(query, [user_id], (err, results) => {
            if (err) reject(err.message);
            else resolve(results);
        });
    });
}

const addCategory = (name) => {
    return new Promise((resolve, reject) => {
        const query = `
            INSERT INTO categories (name)
            VALUES (?)
        `;
        connection.query(query, [name], (err, results) => {
            if (err) reject(err.message);
            else resolve(results); 
        });
    });
}

const updateCategory = (categories_id, name) => {
    return new Promise((resolve, reject) => {
        const query = `
            UPDATE categories
            SET name = ?
            WHERE categories_id = ?
        `;
        connection.query(query, [name, categories_id], (err, results) => {
            if (err) reject(err.message);
            else resolve(results);
        });
    });
}

const deleteCategory = (categories_id) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM categories WHERE categories_id = ?';
        connection.query(query, [categories_id], (err, results) => {
            if (err) reject(err.message);
            else resolve(results);
        });
    });
}

const addProduct = (category_id, name, price, description) => {
    return new Promise((resolve, reject) => {
        const query = `
            INSERT INTO products (category_id, name, price, description)
            VALUES (?, ?, ?, ?)
        `;
        connection.query(query, [category_id, name, price, description], (err, results) => {
            if (err) reject(err.message);
            else resolve(results);
        });
    });
}

const updateProduct = (product_id, category_id, name, price, description) => {
    return new Promise((resolve, reject) => {
        const query = `
            UPDATE products
            SET category_id = ?, name = ?, price = ?, description = ?
            WHERE product_id = ?
        `;
        connection.query(query, [category_id, name, price, description, product_id], (err, results) => {
            if (err) reject(err.message);
            else resolve(results);
        });
    });
}


const deleteProduct = (product_id) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM products WHERE product_id = ?';
        connection.query(query, [product_id], (err, results) => {
            if (err) reject(err.message);
            else resolve(results);
        });
    });
}



const createOrder = (createdById, orderStatusId, totalPrice, items) => {
    return new Promise((resolve, reject) => {
        const checkUserQuery = 'SELECT * FROM `ShopInternet`.`users` WHERE `user_id` = ?';
        connection.query(checkUserQuery, [createdById], (err, userResults) => {
            if (err) {
                reject('Помилка при перевірці користувача: ' + err.message);
                return;
            }
            if (!userResults || userResults.length === 0) {
                reject('Користувача з таким ID не існує');
                return;
            }

            const checkStatusQuery = 'SELECT * FROM `ShopInternet`.`order_status` WHERE `order_status_id` = ?';
            connection.query(checkStatusQuery, [orderStatusId], (err, statusResults) => {
                if (err) {
                    reject('Помилка при перевірці статусу замовлення: ' + err.message);
                    return;
                }
                if (!statusResults || statusResults.length === 0) {
                    reject('Статусу замовлення з таким ID не існує');
                    return;
                }

                const orderQuery = 'INSERT INTO `ShopInternet`.`orders` (`created_by`, `order_status_id`, `total_price`, `created_at`) VALUES (?, ?, ?, NOW())';
                connection.query(orderQuery, [createdById, orderStatusId, totalPrice], (err, orderResults) => {
                    if (err) {
                        reject('Помилка при вставці замовлення: ' + err.message);
                        return;
                    }
                    const orderId = orderResults.insertId; 

                    if (Array.isArray(items) && items.length > 0) {
                        const orderItemsQuery = 'INSERT INTO `ShopInternet`.`order_items` (`order_id`, `product_id`, `quantity`, `price`, `product_name`) VALUES ?';
                        const orderItemsValues = items.map(item => [
                            orderId,
                            item.product_id,
                            item.quantity,
                            item.price,
                            item.name 
                        ]);

                        connection.query(orderItemsQuery, [orderItemsValues], (err, itemsResults) => {
                            if (err) {
                                reject('Помилка при вставці товарів в замовлення: ' + err.message);
                            } else {
                                resolve({ orderId, items: itemsResults.affectedRows });
                            }
                        });
                    } else {
                        resolve({ orderId, items: 0 });
                    }
                });
            });
        });
    });
};

const updateOrderStatus = (orderId, newStatusId) => {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE `ShopInternet`.`orders` SET `order_status_id` = ? WHERE `order_id` = ?';
        connection.query(query, [newStatusId, orderId], (err, results) => {
            if (err) reject(err.message);
            else resolve(results);
        });
    });
};

const getAllOrders = () => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
                o.order_id,
                o.created_by,
                o.order_status_id,
                o.total_price,
                o.created_at,
                u.name AS created_by_username,
                os.order_status AS order_status_name,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'product_id', oi.product_id,
                        'quantity', oi.quantity,
                        'price', oi.price
                    )
                ) AS items
            FROM 
                \`ShopInternet\`.orders o
            JOIN 
                \`ShopInternet\`.users u ON o.created_by = u.user_id
            JOIN 
                \`ShopInternet\`.order_status os ON o.order_status_id = os.order_status_id
            LEFT JOIN 
                \`ShopInternet\`.order_items oi ON o.order_id = oi.order_id
            GROUP BY 
                o.order_id, o.created_by, o.order_status_id, o.total_price, o.created_at, u.name, os.order_status
        `;
        
        connection.query(query, (err, results) => {
            if (err) {
                reject('Помилка при отриманні замовлень: ' + err.message);
            } else {
                results.forEach(order => {
                    if (order.items && typeof order.items === 'string') {
                        order.items = JSON.parse(order.items);
                    }
                });
                resolve(results);
            }
        });
    });
};

const getUserOrderItems = (user_id) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
                o.order_id,
                o.created_by,
                o.order_status_id,
                o.total_price,
                o.created_at,
                u.name AS created_by_username,
                os.order_status AS order_status_name,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'product_id', oi.product_id,
                        'quantity', oi.quantity,
                        'price', oi.price
                    )
                ) AS items
            FROM 
                \`ShopInternet\`.orders o
            JOIN 
                \`ShopInternet\`.users u ON o.created_by = u.user_id
            JOIN 
                \`ShopInternet\`.order_status os ON o.order_status_id = os.order_status_id
            LEFT JOIN 
                \`ShopInternet\`.order_items oi ON o.order_id = oi.order_id
            WHERE 
                o.created_by = ?
            GROUP BY 
                o.order_id, o.created_by, o.order_status_id, o.total_price, o.created_at, u.name, os.order_status
        `;
        
        connection.query(query, [user_id], (err, results) => {
            if (err) {
                reject('Помилка при отриманні замовлень користувача: ' + err.message);
            } else {
                results.forEach(order => {
                    if (order.items && typeof order.items === 'string') {
                        order.items = JSON.parse(order.items);
                    }
                });
                resolve(results); 
            }
        });
    });
};

module.exports = { connection, addUser, loginUser, getCategories, getProducts, getProductById, getCategoryById, getProductCategoryById,
    getAllUsers, promoteUserToAdmin, deleteUser, addCategory, updateCategory, deleteCategory, addProduct, updateProduct, deleteProduct,
    createOrder, updateOrderStatus, getAllOrders, getUserOrderItems}