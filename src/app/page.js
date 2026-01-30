'use client';
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductList from "./components/ProductList";
// import ProductCategorySelector from "./components/ProductCategorySelector";
import Advertisement from "./components/Advertisement";

export default function Home() {
  const [products, setProducts] = useState([]);
  // const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState('');

  // const fetchProductsCategories = async () => {
  //   setLoading(true)
  //   const response = await fetch('https://api.escuelajs.co/api/v1/categories/')

  //   if (!response.ok) {
  //     throw new Error("Error fetching categories.")
  //   }

  //   const data = await response.json();
  //   setCategories(data);
  // }

  const fetchProductsInfo = async () => {
    const response = await fetch('https://api.escuelajs.co/api/v1/products/')

    if (!response.ok) {
      throw new Error("Error fetching products.")
    }

    const data = await response.json();
    setProducts(data);
    setLoading(false)
  }

  useEffect(
    () => {
      try{
        setLoading(true);
        fetchProductsInfo();
      } catch (errir) {
        setFetchError('info')} 
      finally {
        // setLoading(false)
      }
    }, []
  )
  
  // next development: insert the following into useEffect
  // // fetch product categories
  // try{
  //   setLoading(true);
  //   fetchProductsCategories();
  // } catch (errir) {
  //   setFetchError('category');
  // }
  // finally {
  //   setLoading(false)
  // }

  // fetch product info

  return (
    <div className="bg-stone-400 h-full w-full text-black flex flex-col items-center">
      <Header/>
      <Advertisement/>
      <div className="flex flex-row justify-center h-full">
        {/* <ProductCategorySelector 
          categories={categories}
          loading={loading} 
          fetchError={fetchError}
        /> */}
        {/* loading */}
      {loading && (
        <p>Loading...</p>
      )}

      {/* error fetch */}
      {fetchError === 'info' && (
        <p>Error fetching products.</p>
      )}

      {/* success fetch */}
      {!loading && fetchError === '' && <ProductList products={products}/>}
      </div>
      <Footer/>
    </div>
  );
}