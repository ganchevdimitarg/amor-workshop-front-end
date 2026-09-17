import {BrowserRouter, Route, Routes} from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import {AuthProvider} from "./context/AuthContext";
import {CartProvider} from "./context/CartContext";
import {LanguageProvider} from "./context/LanguageContext";
import Admin from "./pages/Admin";
import AdminProducts from "./pages/AdminProducts";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import EditProduct from "./pages/EditProduct";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import OrderDetail from "./pages/OrderDetail";
import OrderHistory from "./pages/OrderHistory";
import ProductDetail from "./pages/ProductDetail";
import Profile from "./pages/Profile";
import QuickOrder from "./pages/QuickOrder";
import Register from "./pages/Register";

export default function App() {
    return (
        <LanguageProvider>
            <AuthProvider>
                <CartProvider>
                    <BrowserRouter>
                        <div className="app-shell">
                            <Navbar/>
                            <main className="app-main">
                                <Routes>
                                    <Route path="/" element={<Home/>}/>
                                    <Route path="/piece/:id" element={<ProductDetail/>}/>
                                    <Route path="/quick-order/:id" element={<QuickOrder/>}/>
                                    <Route path="/cart" element={<Cart/>}/>
                                    <Route path="/checkout" element={<Checkout/>}/>
                                    <Route path="/login" element={<Login/>}/>
                                    <Route path="/register" element={<Register/>}/>
                                    <Route
                                        path="/profile"
                                        element={
                                            <ProtectedRoute>
                                                <Profile/>
                                            </ProtectedRoute>
                                        }
                                    />
                                    <Route
                                        path="/orders"
                                        element={
                                            <ProtectedRoute>
                                                <OrderHistory/>
                                            </ProtectedRoute>
                                        }
                                    />
                                    <Route
                                        path="/admin"
                                        element={
                                            <ProtectedRoute adminOnly>
                                                <Admin/>
                                            </ProtectedRoute>
                                        }
                                    />
                                    <Route
                                        path="/admin/products"
                                        element={
                                            <ProtectedRoute adminOnly>
                                                <AdminProducts/>
                                            </ProtectedRoute>
                                        }
                                    />
                                    <Route
                                        path="/admin/products/:id"
                                        element={
                                            <ProtectedRoute adminOnly>
                                                <EditProduct/>
                                            </ProtectedRoute>
                                        }
                                    />
                                    <Route
                                        path="/admin/orders/:id"
                                        element={
                                            <ProtectedRoute adminOnly>
                                                <OrderDetail/>
                                            </ProtectedRoute>
                                        }
                                    />
                                    <Route path="*" element={<NotFound/>}/>
                                </Routes>
                            </main>
                            <Footer/>
                        </div>
                    </BrowserRouter>
                </CartProvider>
            </AuthProvider>
        </LanguageProvider>
    );
}
