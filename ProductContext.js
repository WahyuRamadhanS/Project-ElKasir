import React, { createContext, useState, useContext } from "react";

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  return (
    <ProductContext.Provider value={{ products, setProducts, cart, setCart }}>
      {children}
    </ProductContext.Provider>
  );
};
