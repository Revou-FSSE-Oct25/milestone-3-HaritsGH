'use client';
import { useState, useEffect } from "react";
import ProductList from "../../components/ProductList";
// import ProductCategorySelector from "./components/ProductCategorySelector";
import Advertisement from "../../components/Advertisement"
import LogoutButton from "../../components/LogoutButton"
import { getSession } from "../../lib/auth"

export default async function DashboardPage() {
  // get session user role
  const session = await getSession()

  const isAdmin = session?.role === 'admin';

  // fetch setup

  const [products, setProducts] = useState([]);
  // const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState('');

  // fetch products info

  const fetchProductsInfo = async () => {
    const response = await fetch('https://api.escuelajs.co/api/v1/products/') // https://tobys-fakestore.up.railway.app

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
 
  // fetch product categories

  // const fetchProductsCategories = async () => {
    //   setLoading(true)
    //   const response = await fetch('https://api.escuelajs.co/api/v1/categories/')
  
    //   if (!response.ok) {
    //     throw new Error("Error fetching categories.")
    //   }
  
    //   const data = await response.json();
    //   setCategories(data);
    // }

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

  return (
    <div className="flex flex-col items-center">
      <Advertisement/>
      <div>
        <h2>Dashboard</h2>
        <LogoutButton/>
      </div>

      {/* content admin only can see */}
      {isAdmin && (
        <div>
          <p>DAIWA SCARLET MONTOK BANGET AJGGG</p>
        </div>
      )}

      {/* content everyone can see */}
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
    </div>
  );
}