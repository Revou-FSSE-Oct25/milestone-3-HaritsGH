'use client';

import ProductCard from "@/components/ProductCard";
import Advertisement from "@/components/Advertisement";
import NavBar from "@/components/NavBar";


// import { useFetch } from "@/hooks/useFetch";
import { useFetchTobi } from "@/hooks/useFetchTobi";

export default function Home() {
  // fetch product info
  
  // const {data: products, loading, errorMessage} = useFetch('https://api.escuelajs.co/api/v1/products/');
  
  const {data, loading, errorMessage} = useFetchTobi('https://tobys-fakestore.up.railway.app/products');
  const products = data?.data || [];

  return (
    <div className="flex flex-col items-center">
      <NavBar />

      <Advertisement/>

      <div className="flex flex-row justify-center h-full">
        {/* loading */}
        {loading && <p>Loading...</p>}

        {/* error fetch */}
        {errorMessage && <p>Error fetching products.</p>}

        {!loading && !errorMessage && products.length === 0 && <p>No products found.</p>}

        {/* success fetch */}
        {!loading && !errorMessage && 
          <main className="w-7/8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
            {
              (products || []).map((product) => 
                <ProductCard 
                  key={product.id} 
                  product={product}
                />
              )
            }
          </main>
        }
      </div>
    </div>
  );
}