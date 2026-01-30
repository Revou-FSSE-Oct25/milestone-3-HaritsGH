'use client';
import { useState, useEffect } from "react";
import Footer from "./components/Footer";
import ProductList from "./components/ProductList";
import ProductCategorySelector from "./components/ProductCategorySelector";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState('');

  const fetchProductsCategories = async () => {
    setLoading(true)
    const response = await fetch('https://api.escuelajs.co/api/v1/categories/')

    if (!response.ok) {
      throw new Error("Error fetching categories.")
    }

    const data = await response.json();
    setCategories(data);
  }

  const fetchProductsInfo = async () => {
    setLoading(true)
    const response = await fetch('https://api.escuelajs.co/api/v1/products/')

    if (!response.ok) {
      throw new Error("Error fetching products.")
    }

    const data = await response.json();
    setProducts(data);
  }

  useEffect(
    () => {
      // fetch product categories
      try{
        setLoading(true);
        fetchProductsCategories();
      } catch (errir) {
        setFetchError('category');
      }
      finally {
        setLoading(false)
      }

      // fetch product info
      try{
        fetchProductsInfo()
      } catch (errir) {
        setFetchError('info')} 
      finally {
        setLoading(false)
      }
    }, []
  )
  
  return (
    <div className="bg-stone-400 h-full w-full text-white flex flex-col">
      <h1 className="text-6xl flex justify-center font-extrabold">RevoShop</h1>
      <div className="flex flex-row self-center w-9/10">
        <ProductCategorySelector 
          categories={categories}
          loading={loading} 
          fetchError={fetchError}
        />
        <ProductList 
          products={products} 
          loading={loading} 
          fetchError={fetchError}
        />
      </div>
      <Footer/>
    </div>
  );
}