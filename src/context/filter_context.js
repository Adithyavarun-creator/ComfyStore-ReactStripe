import React, { useContext, useEffect, useReducer } from "react";
import filterReducer from "../reducers/filterReducer";
import { useProductsContext } from "./products_context";
import {
  CLEAR_FILTERS,
  FILTER_PRODUCTS,
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  UPDATE_SORT,
} from "../actions/actions";

const initialState = {
  filtered_products: [],
  all_products: [],
  grid_view: false,
  sort: "price-lowest", //comes from option value in Sort.jsx
  filters: {
    text: "",
    company: "all",
    category: "all",
    color: "all",
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false,
  },
};

const FilterContext = React.createContext();

export const FilterProvider = ({ children }) => {
  //get products from product context
  const { products } = useProductsContext();
  const [state, dispatch] = useReducer(filterReducer, initialState);

  //as we fetch products according to filter product changes
  useEffect(() => {
    dispatch({
      type: LOAD_PRODUCTS,
      payload: products,
    });
  }, [products]);

  //for sorting purpose
  useEffect(() => {
    dispatch({
      type: FILTER_PRODUCTS,
    });
    dispatch({
      type: SORT_PRODUCTS,
    });
  }, [products, state.sort, state.filters]);

  const setGridView = () => {
    dispatch({
      type: SET_GRIDVIEW,
    });
  };

  const setListView = () => {
    dispatch({
      type: SET_LISTVIEW,
    });
  };

  const updateSort = (e) => {
    //const name = e.target.name;
    const value = e.target.value;
    //console.log(value);
    dispatch({
      type: UPDATE_SORT,
      payload: value,
    });
  };

  const updateFilters = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "category") {
      value = e.target.textContent;
    }

    if (name === "color") {
      value = e.target.dataset.color;
    }

    if (name === "price") {
      value = Number(value);
    }

    if (name === "shipping") {
      value = e.target.checked;
    }

    dispatch({
      type: UPDATE_FILTERS,
      payload: { name, value },
    });
  };

  const clearFilters = () => {
    dispatch({
      type: CLEAR_FILTERS,
    });
  };

  return (
    <FilterContext.Provider
      value={{
        ...state,
        setGridView,
        setListView,
        updateSort,
        updateFilters,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  return useContext(FilterContext);
};
