/* eslint-disable react-refresh/only-export-components */
// context/ProductContext.tsx

import { createContext, useContext, useState, type ReactNode } from "react";

interface ProductContextType {
  products: Common.Product[];
  addProduct: (product: Common.Product) => void;
  updateProduct: (id: string, product: Partial<Common.Product>) => void;
  deleteProduct: (id: string) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Common.Product[]>([]);

  const addProduct = (product: Common.Product) => {
    setProducts((prev) => [...prev, product]);
  };

  const updateProduct = (id: string, newData: Partial<Common.Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...newData } : p))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <ProductContext.Provider
      value={{ products, addProduct, updateProduct, deleteProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context)
    throw new Error("useProductContext must be used within ProductProvider");
  return context;
};
