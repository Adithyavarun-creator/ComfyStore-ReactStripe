import React, { useContext, useEffect, useReducer } from "react";
import productsReducer from "../reducers/productsReducer";
import {
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_ERROR,
  GET_PRODUCTS_SUCCESS,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_ERROR,
  GET_SINGLE_PRODUCT_SUCCESS,
  SIDEBAR_CLOSE,
  SIDEBAR_OPEN,
} from "../actions/actions";
import { productsurl } from "../utils/constants";
import axios from "axios";

const initialState = {
  isSidebarOpen: false,
  products_loading: false,
  products_error: false,
  products: [],
  featured_products: [],
  single_product_loading: false,
  single_product_error: false,
  single_product: {},
};

const ProductsContext = React.createContext();

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productsReducer, initialState);

  const openSidebar = () => {
    dispatch({
      type: SIDEBAR_OPEN,
    });
  };

  const closeSidebar = () => {
    dispatch({
      type: SIDEBAR_CLOSE,
    });
  };

  const fetchProducts = async (url) => {
    dispatch({
      type: GET_PRODUCTS_BEGIN,
    });
    try {
      const response = await axios.get(url);
      //console.log(response.data);
      const products = response.data;
      dispatch({
        type: GET_PRODUCTS_SUCCESS,
        payload: products,
      });
    } catch (error) {
      dispatch({
        type: GET_PRODUCTS_ERROR,
      });
    }
  };

  const fetchSingleProduct = async (url) => {
    dispatch({
      type: GET_SINGLE_PRODUCT_BEGIN,
    });
    try {
      const response = await axios.get(url);
      //console.log(response.data);
      const singleProduct = response.data;
      dispatch({
        type: GET_SINGLE_PRODUCT_SUCCESS,
        payload: singleProduct,
      });
    } catch (error) {
      dispatch({
        type: GET_SINGLE_PRODUCT_ERROR,
      });
    }
  };

  useEffect(() => {
    fetchProducts(productsurl);
  }, []);

  //console.log(products);

  return (
    <ProductsContext.Provider
      value={{
        ...state,
        openSidebar,
        closeSidebar,
        fetchSingleProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => {
  return useContext(ProductsContext);
};
