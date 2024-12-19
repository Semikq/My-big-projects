import React, { useEffect, useState } from 'react'
import "./editingCategories.css"

import { fetchCategories, fetchAddCategory, fetchUpdateCategory, fetchDeleteCategory } from '../../electronApi'

function formatDate(rawDate) {
    const date = new Date(rawDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    const formattedDate = `${hours}:${minutes}/${day}.${month}.${year}`;
    return <p>Час створення: {formattedDate}</p>;
}

function RenderEditingCategories(){
    const [categories, setCategories] = useState([])
    const [newCategoryName, setNewCategoryName] = useState('');
    const [shouldUpdateCategories, setShouldUpdateCategories] = useState(false);

    useEffect(() => {
        fetchCategories().then(result => setCategories(result))
    },[shouldUpdateCategories])

    const handleCategoryNameChange = (e, categoryId) => {
        const updatedCategories = categories.map(category =>
            category.categories_id === categoryId
                ? { ...category, name: e.target.value }
                : category
        );
        setCategories(updatedCategories);
    };

    return (
        <div className='categoriesField'>
            <div className='category'>
                <input type='text' placeholder='Додати нову категорію' value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)}/>
                <input type='button' value="Додати" onClick={() => {fetchAddCategory(newCategoryName); setShouldUpdateCategories(!shouldUpdateCategories); setNewCategoryName("")}}/>
            </div>
            {categories.map((category) => (
            <div className='category'>
                <input type='text' value={category.name} onChange={(e) => handleCategoryNameChange(e, category.categories_id)} />
                {formatDate(category.created_at)}
                <input type='button' onClick={() => {fetchUpdateCategory(category.categories_id, category.name); setShouldUpdateCategories(!shouldUpdateCategories)}} value="Редагувати"></input>
                <input type='button' onClick={() => {fetchDeleteCategory(category.categories_id); setShouldUpdateCategories(!shouldUpdateCategories)}} value="Видалити"></input>
            </div>
            ))}
        </div>
    )
}

export function CreatePageEditingCategories(){
    return (
        <div className='containerEditingCategories'>
            <RenderEditingCategories />
        </div>
    )
}