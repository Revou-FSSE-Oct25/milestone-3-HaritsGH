import Header from "@/app/components/Header"
import Footer from "@/app/components/Footer"
import AddToCartButton from "@/app/components/AddToCartButton"
import Link from "next/link"

async function getProduct(id) {
  const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {cache: 'no-store'})
  
  if (!res.ok) {
    throw new Error('Failed to fetch product')
  }

  return res.json()
}

export default async function page({ params }) {
  const { id } = await params
  const product = await getProduct(id)

  return (
    <div className="bg-stone-400 h-full w-full text-black flex flex-col items-center">
      <Header/>
      <Link href={"/"} className="underline hover:text-blue-600 active:text-red-600 mb-2 text-xl">Browse other products</Link>
      <main className="h-full flex flex-col lg:flex-row items-center lg:items-start p-4 w-7/8 w-80 lg:w-3xl border bg-stone-300">
        <img src={product.images[0]} alt={product.title} className="w-80 h-80 aspect-square bg-gray-100 overflow-hidden object-contain"/>
        <div className="flex flex-col p-5 w-80 lg:w-full">
          <div className="flex flex-col lg:flex-row justify-between">
            <div className="flex flex-col">
              <strong className="font-bold text-2xl justify-between">{product.title}</strong>
              <p className="font-xs">{product.category.name}</p>
            </div>
            <p className="text-2xl min-w-1/8 self-end">$ {product.price}</p>
          </div>
          <p className="my-5 text-justify text-xl">{product.description}</p>
          <AddToCartButton/>
        </div>
      </main>
      <Footer/>
    </div>
  )
}
