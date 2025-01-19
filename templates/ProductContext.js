import React, { createContext, useContext, useState } from "react";

// Create the Product Context
const ProductContext = createContext();

// Export the useProducts hook for easier consumption of the context
export const useProducts = () => {
  return useContext(ProductContext);
};

// ProductProvider component to wrap around components that need access to the context
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([
    { id: "1", name: "Stock 1", price: 15000, stock: 146, image: null },
    { id: "2", name: "Stock 2", price: 15000, stock: 146, image: null },
    { id: "3", name: "Stock 3", price: 15000, stock: 146, image: null },
  ]);

  const addProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  const editProduct = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  const deleteProduct = (id) => {
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, editProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
