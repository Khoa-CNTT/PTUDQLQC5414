import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { toast } from 'react-toastify';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '$';
    const delivery_fee = 3;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [discount, setDiscount] = useState(0);
    const [coupon, setCoupon] = useState(null);
    const [name, setName] = useState([]);
    const [token, setToken] = useState('');
    const navigate = useNavigate();

    const login = (token, name) => {
        localStorage.setItem('token', token);
        localStorage.setItem('name', name);
        localStorage.setItem('user', JSON.stringify({ name })); //Thêm dòng này review product
        setToken(token);
        setName(name);
        navigate('/');
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        localStorage.removeItem('user'); //  Thêm dòng này review product
        setToken('');
        setName('');
        navigate('/login');
    };

    //add vào cart
    const addToCart = (itemId, size, subCategory) => {
        if (!size || !subCategory) {
            alert('Select Product Size and Subcategory');
            return;
        }

        let cartData = structuredClone(cartItems); // Deep copy tránh mutation

        // Khởi tạo các cấp nếu chưa tồn tại
        if (!cartData[itemId]) cartData[itemId] = {};
        if (!cartData[itemId][size]) cartData[itemId][size] = {};

        if (cartData[itemId][size][subCategory]) {
            cartData[itemId][size][subCategory] += 1;
        } else {
            cartData[itemId][size][subCategory] = 1;
        }

        setCartItems(cartData);

        // Nếu user đã login thì sync với backend
        if (token) {
            axios.post(`${backendUrl}/api/cart/add`, {
                itemId,
                size,
                subCategory
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).catch(error => {
                console.error("Error syncing cart:", error);
            });
        }
    };

    //hiển thị Count trên cart Navbar
    const getCartCount = () => {
        let totalCount = 0;
        for (const itemId in cartItems) {
            const sizes = cartItems[itemId];
            for (const size in sizes) {
                const subCategories = sizes[size];
                for (const subCategory in subCategories) {
                    const quantity = subCategories[subCategory];
                    if (quantity > 0) {
                        totalCount += quantity;
                    }
                }
            }
        }
        return totalCount;
    };

    const updateQuantity = (itemId, size, subCategory, quantity) => {
        const cartData = structuredClone(cartItems);

        // Khởi tạo nếu chưa tồn tại
        if (!cartData[itemId]) cartData[itemId] = {};
        if (!cartData[itemId][size]) cartData[itemId][size] = {};

        if (quantity === 0) {
            delete cartData[itemId][size][subCategory];
            // Nếu sau khi xóa không còn subCategory nào → xóa size
            if (Object.keys(cartData[itemId][size]).length === 0) {
                delete cartData[itemId][size];
            }
            // Nếu sau khi xóa không còn size nào → xóa itemId
            if (Object.keys(cartData[itemId]).length === 0) {
                delete cartData[itemId];
            }
        } else {
            cartData[itemId][size][subCategory] = quantity;
        }

        setCartItems(cartData);

        if (token) {
            axios.post(`${backendUrl}/api/cart/update`, {
                itemId,
                size,
                subCategory,
                quantity
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).catch(error => {
                console.log(error);
                // toast.error(error.message);
            });
        }
    };

    const getCartAmount = () => {
        let totalAmount = 0;

        for (const itemId in cartItems) {
            const itemInfo = products.find((product) => product._id === itemId);
            if (!itemInfo) continue;

            const sizes = cartItems[itemId];
            for (const size in sizes) {
                const subCategories = sizes[size];
                for (const subCategory in subCategories) {
                    const quantity = subCategories[subCategory];
                    if (quantity > 0) {
                        totalAmount += itemInfo.price * quantity;
                    }
                }
            }
        }

        return totalAmount;
    };

    //get ProductList
    const getProductsData = () => {
        axios.get(`${backendUrl}/api/product/list`)
            .then(response => {
                if (response.data.success) {
                    setProducts(response.data.products);
                } else {
                    // toast.error(response.data.message);
                    alert(response.data.message);
                }
            })
            .catch(error => {
                console.log(error);
                // toast.error(error.message);
                alert(error.message);
            });
    };

    const getUserCart = (token) => {
        axios.post(`${backendUrl}/api/cart/get`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                if (response.data.success) {
                    setCartItems(response.data.cartData);
                }
            })
            .catch(error => {
                console.log(error);
                // toast.error(error.message);
            });
    };

    useEffect(() => {
        getProductsData();
    }, []);

    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'));
            getUserCart(localStorage.getItem('token'));
        }
    }, []);

    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        discount,
        setDiscount,
        cartItems,
        addToCart,
        setCartItems,
        getCartCount,
        updateQuantity,
        getCartAmount,
        coupon,
        setCoupon,
        navigate,
        backendUrl,
        login,
        logout,
        name,
        setName,
        token,
        setToken
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
