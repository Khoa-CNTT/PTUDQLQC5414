import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { toast } from 'react-toastify';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '$';
    const delivery_fee = 10;
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
    const addToCart = (itemId, size) => {
        if (!size) {
            // toast.error('Select Product Size');
            alert('Select Product Size');
            return;
        }

        let cartData = structuredClone(cartItems); //Tạo bản sao deep copy để tránh thay đổi trực tiếp state cũ 

        if (cartData[itemId]) { //KTRA San pham co trong Cart chua
            if (cartData[itemId][size]) {//KTRA SIZE
                cartData[itemId][size] += 1; // +1
            } else {
                cartData[itemId][size] = 1; // tao size =1
            }
        } else {
            cartData[itemId] = { [size]: 1 }; // Tao san pham Cart
        }

        setCartItems(cartData);

        if (token) {
            axios.post(`${backendUrl}/api/cart/add`, { itemId, size }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .catch(error => {
                    console.log(error);
                    // toast.error(error.message);
                });
        }
    };

    //hiển thị Count trên cart Navbar
    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) { //items là key cấp 1 của cartItems
            for (const item in cartItems[items]) { //Duyệt qua từng item con trong mỗi nhóm
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
        return totalCount;
    };

    const updateQuantity = (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);

        if (token) {
            axios.post(`${backendUrl}/api/cart/update`, { itemId, size, quantity }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .catch(error => {
                    console.log(error);
                    // toast.error(error.message);
                });
        }
    };

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item];
                    }
                } catch (error) {
                    console.log(error);
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
