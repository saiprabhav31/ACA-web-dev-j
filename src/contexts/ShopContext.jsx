import React,{createContext,useState,useEffect} from "react";
import Product_List from "../All_Products";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import userList from '../All_Users';

const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  
  const loadFromLocalStorage = (key, defaultValue) => {
    const saved = localStorage.getItem(key);
    if (saved) {
      return JSON.parse(saved);
    }
    return defaultValue;
  };

export const ShopContext = createContext(null);
function getDefaultCart(){
    let cart = [];
    for(let i=0;i<Product_List.length;i++){
        cart[i] = 0;
    }
    return cart;
}

function ShopContextProvider(props){
    const [selectedProduct, setSelectedProduct] = useState(loadFromLocalStorage('selectedProduct',null));
    const [cartItems, setCartItems] = useState(loadFromLocalStorage('cartItems', getDefaultCart()));
    const [favouriteItems,setFavouriteItems] = useState(loadFromLocalStorage('favouriteItems',getDefaultCart()));
    const [shippingAddress,setShippingAddress] = useState(null);
    const [isLogedIn,setIsLogedIn] = useState(0);
    useEffect(() => {
        saveToLocalStorage('cartItems', cartItems);
      }, [cartItems]);
      useEffect(() => {
        saveToLocalStorage('favouriteItems', favouriteItems);
      }, [favouriteItems]);
      useEffect(()=>{
        saveToLocalStorage('selectedProduct',selectedProduct);
      },[selectedProduct]);
    function addToCart(id,qty){
        let items = [...cartItems];
        items[id-1] = qty;
        setCartItems(items);
    }
    function removeFromCart(id){
        let items = [...cartItems];
        items[id-1] = 0;
        setCartItems(items);
        toast('Removed From Cart');
    }
    function addToFavourites(id) {
        let favourites = [...favouriteItems];
        if (id >= 1 && id <= favourites.length) {
            favourites[id - 1] = 1;
        }
        setFavouriteItems(favourites);
        console.log(favourites);
    }

    function removeFromFavourites(id) {
        let favourites = [...favouriteItems];
        if (id >= 1 && id <= favourites.length) {
            favourites[id - 1] = 0;
        }
        setFavouriteItems(favourites);
        console.log(favourites);
    }
    const contextValue = {Product_List,selectedProduct,setSelectedProduct,cartItems,setCartItems,favouriteItems,setFavouriteItems,addToCart,removeFromCart,addToFavourites,removeFromFavourites,shippingAddress,setShippingAddress,isLogedIn,setIsLogedIn};
    return <ShopContext.Provider value={contextValue}>
        {props.children}
    </ShopContext.Provider>
}

export default ShopContextProvider;