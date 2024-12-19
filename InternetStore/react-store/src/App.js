import React from 'react';
import { CreateProductsPage } from "./pages/productsList/products"
import { CreateProductPage } from "./pages/product/product"
import { CreateBasketPage } from "./pages/basket/basket"
import { CreatePrimaryAppBar } from './pages/primaryAppBar/primaryAppBar';
import { CreateAuthorizationPage } from './pages/authorization/authorization';
import { CreatePageEditingCategories } from './pages/editingCategories/editingCategories';
import { CreatePageEditingProducts } from './pages/editingProducts/editingProducts';
import { CreatePageEditingUsers } from './pages/editingUsers/editingUsers';
import { CreatePageOrders } from './pages/orders/orders'
import { CreatePageOrdersUser } from './pages/ordersUser/ordersUser';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { Provider, useSelector } from 'react-redux'
import store from './Redux/redux'
import './App.css';

function ProtectedRoute({ element }) {
  const authUser = useSelector((store) => store.auth);
  return authUser?.token ? element : <Navigate to="/authorization" replace />
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <CreatePrimaryAppBar />
          <main>
            <Routes>
              <Route path="/" element={<CreateProductsPage />} />
              <Route path="/:id" element={<CreateProductsPage />} />
              <Route path="/product/:id" element={<CreateProductPage />} />
              {/* Protected pages */}
              <Route path="/basket" element={<ProtectedRoute element={<CreateBasketPage />} />} />
              <Route path="/editingCategories" element={<ProtectedRoute element={<CreatePageEditingCategories />} />} />
              <Route path="/editingProducts" element={<ProtectedRoute element={<CreatePageEditingProducts />} />} />
              <Route path="/editingUsers" element={<ProtectedRoute element={<CreatePageEditingUsers />} />} />
              <Route path="/orders" element={<ProtectedRoute element={<CreatePageOrders />} />} />
              <Route path="/ordersUser" element={<ProtectedRoute element={<CreatePageOrdersUser />} />} />
              {/* authorization */}
              <Route path="/authorization" element={<CreateAuthorizationPage />} />
            </Routes>
          </main>
          <footer>Online Store</footer>
        </div>
      </Router>
    </Provider>
  );
  }
  
  export default App