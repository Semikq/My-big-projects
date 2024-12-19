import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./primaryAppBar.css";
import { fetchCategories } from "../../electronApi";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../Redux/reducers/authReducer';
import { useNavigate } from 'react-router-dom';

function MenuCategory() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories().then(resultCategories => setCategories(resultCategories))
    }, [])

    return (
        <div className="bottom-menu">
            {categories.map((category) => (
                <Link to={`/${category.categories_id}`}>{category.name}</Link>
            ))}
        </div>
    );
}

function MenuUser({ isMenuUserOpen, setMenuUserOpen }) {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const role = useSelector((store) => store.auth.payload.role)

    return (
        <div className="right-menu">
            {role === "admin" && (
                <>
                <Link to="/editingCategories"><p>Редагування категорій</p></Link>
                <Link to="/editingProducts"><p>Редагування продуктів</p></Link>
                <Link to="/editingUsers"><p>Редагування користувачів</p></Link>
                <Link to="/orders"><p>Підтвердження замовлень</p></Link>
                </>
            )}
            <Link to="/ordersUser"><p>Ваші замовлення</p></Link>
            <p onClick={() => {dispatch(logout()); setMenuUserOpen(!isMenuUserOpen); navigate('/')}}>Вийти</p>
        </div>
    );
}


function RenderPrimaryAppBar() {
    const token = useSelector((store) => store.auth.token)
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMenuUserOpen, setMenuUserOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
        if(isMenuUserOpen){
            setMenuUserOpen((prev) => !prev);
        }
    };

    const toggleUserMenu = () => {
        setMenuUserOpen((prev) => !prev);
        if(isMenuOpen){
            setIsMenuOpen((prev) => !prev);
        }
    };

    return (
        <>
            <h1 className='linkMenu' onClick={toggleMenu}>Категорії</h1>

            <Link className='linkMenu' to={`/`}> <h1>Головна</h1> </Link>
            <Link className='linkMenu' to={`/basket`}> <h1>Кошик</h1> </Link>

            {token ? <h1 className='linkMenu' onClick={toggleUserMenu}>Профіль</h1> : <Link className='linkMenu' to={"/authorization"}><h1>Увійти</h1></Link>}

            {isMenuOpen && <MenuCategory />}
            {isMenuUserOpen && <MenuUser isMenuUserOpen={isMenuUserOpen} setMenuUserOpen={setMenuUserOpen}/>}
        </>
    );
}

export function CreatePrimaryAppBar() {
    return (
        <header>
            <RenderPrimaryAppBar />
        </header>
    );
}
