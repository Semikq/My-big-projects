import React, { useEffect, useState } from 'react'
import { fetchCategories, fetchProductCategoryById, fetchAddProduct, fetchUpdateProduct, fetchDeleteProduct } from '../../electronApi'
import "./editingProducts.css"

function RenderEditingProducts() {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [productFields, setProductFields] = useState({});
    const [shouldUpdateProducts, setShouldUpdateProducts] = useState(false);
    const [newId, setNewId] = useState("");
    const [newName, setNewName] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [newPrice, setNewPrice] = useState("");

    useEffect(() => {
        fetchCategories().then(result => setCategories(result));
    }, []);

    useEffect(() => {
        if (selectedCategoryId) {
            fetchProductCategoryById(selectedCategoryId).then(result => {
                setProducts(result);
                const initialProductFields = result.reduce((acc, product) => {
                    acc[product.product_id] = {
                        name: product.name,
                        description: product.description,
                        price: product.price
                    };
                    return acc;
                }, {});
                setProductFields(initialProductFields);
            });
        }
    }, [selectedCategoryId, shouldUpdateProducts]);

    const handleProductChange = (e, productId, field) => {
        const updatedProductFields = {
            ...productFields,
            [productId]: {
                ...productFields[productId],
                [field]: e.target.value
            }
        };
        setProductFields(updatedProductFields);
    };

    const handleUpdateProduct = (productId) => {
        const { name, description, price } = productFields[productId] || {};
        fetchUpdateProduct(productId, selectedCategoryId, name, price, description)
    };
    

    return (
        <div className='productsField'>
            <div className='categories'>
                <select onChange={(e) => setSelectedCategoryId(e.target.value)} value={selectedCategoryId}>
                    <option value="">Оберіть категорію для редагування товарів</option>
                    {categories.map((category) => (
                        <option key={category.categories_id} value={category.categories_id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className='products'>
                <div className="cardProduct">
                    <input placeholder='Введіть id категорії товару' value={newId} onChange={(e) => setNewId(e.target.value)}/>
                    <input placeholder='Введіть ім’я товару' value={newName} onChange={(e) => setNewName(e.target.value)}/>
                    <input placeholder='Введіть опис товару' value={newDescription} onChange={(e) => setNewDescription(e.target.value)}/>
                    <input placeholder='Введіть ціну товару' value={newPrice} onChange={(e) => setNewPrice(e.target.value)}/>
                    <input type="button" className='input' value="Додати" onClick={() => {fetchAddProduct(newId, newName, newPrice, newDescription); setNewId(""); setNewName(""); setNewPrice(""); setNewDescription(""); setShouldUpdateProducts(!shouldUpdateProducts)}}/>
                </div>
                {products.map((product) => (
                    <div key={product.product_id} className="cardProduct">
                        <input placeholder='Введіть ім’я товару' value={productFields[product.product_id]?.name || product.name} onChange={(e) => handleProductChange(e, product.product_id, 'name')}/>
                        <input placeholder='Введіть опис товару' value={productFields[product.product_id]?.description || product.description} onChange={(e) => handleProductChange(e, product.product_id, 'description')}/>
                        <input placeholder='Введіть ціну товару' value={productFields[product.product_id]?.price || product.price} onChange={(e) => handleProductChange(e, product.product_id, 'price')}/>
                        <input type="button" className='input' onClick={() => handleUpdateProduct(product.product_id)} value="Редагувати"/>
                        <input type="button" className='input' value="Видалити" onClick={() => {fetchDeleteProduct(product.product_id); setShouldUpdateProducts(!shouldUpdateProducts)}}/>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function CreatePageEditingProducts(){
    return (
        <RenderEditingProducts />
    )
}