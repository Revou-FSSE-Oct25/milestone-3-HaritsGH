'use client';

import AddToCartButton from "@/components/AddToCartButton";
import { useFetchTobi } from "@/hooks/useFetchTobi";
import Link from "next/link";
import Image from "next/image";

export default function ProductDetailPageElements({ productId }) {
  // const {data: product, loading, errorMessage} = useFetch(`https://api.escuelajs.co/api/v1/products/${productId}`)
  
  const {data: product, loading, errorMessage} = useFetchTobi(`https://tobys-fakestore.up.railway.app/products/${productId}`)

  // product object keys: id, title, price, images[0-2], category.name (platzi)
  // product object keys: id, title, price, image, category (tobi)

  // const product = { id: '1', title: 'Premium Coffee Bean', price: 45, description: 'Single origin Ethiopian Yirgacheffe.', images: ['https://i.imgur.com/w3Y8NwQ.jpeg'], category: {name: 'Drink'}};

  return (
    <div className="flex flex-col items-center">
      {/* loading */}
      {loading && (
        <p>Loading...</p>
      )}

      {/* error fetch */}
      {errorMessage && (
        <p>Error fetching products.</p>
      )}

      {!loading && !errorMessage && (
        <div className="flex flex-col items-center">
          <Link href={'/'} className="underline hover:text-blue-600 active:text-red-600 mb-2 text-xl">Browse other products</Link>
          <main className="h-full flex flex-col lg:flex-row items-center lg:items-start p-4 w-7/8 w-80 lg:w-3xl border bg-stone-300">
            <Image unoptimized src={product.image} alt={product.title} width={320} height={320} className="w-80 h-80 aspect-square bg-gray-100 overflow-hidden object-contain"/>
            <div className="flex flex-col p-5 w-80 lg:w-full">
              <div className="flex flex-col lg:flex-row justify-between">
                <div className="flex flex-col">
                  <strong className="font-bold text-2xl justify-between">{product.title}</strong>
                  <p className="font-xs">{product.category}</p>
                </div>
                <p className="text-2xl min-w-1/8 self-end">$ {product.price}</p>
              </div>
              <p className="my-5 text-justify text-xl">{product.description}</p>
              <AddToCartButton product={product}/>
            </div>
          </main>
        </div>
      )}
    </div>
  )
}
