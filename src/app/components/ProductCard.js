import Link from "next/link";

function ProductCard({ product }) {
  // product object keys: id, title, price, images[0-2], category.name
  return (
    <article className="h-full rounded-lg border shadow-sm overflow-hidden flex flex-col bg-stone-300">
      
      <div className="aspect-square bg-gray-100">
        <img src={product.images[0]} alt="" className="object-cover w-full h-full"/>
      </div>
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div className="flex flex-col">
          <p className="font-bold">{product.title}</p>
          <p className="font-xs text-gray-500 mt-4">{product.category.name}</p>
        </div>
        <div className="flex flex-col">
          <p className="self-end text-2xl pr-4">$ {product.price}</p>
          <Link href={`product/${product.id}`} className="w-full mt-2 bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700 active:bg-blue-800">Details</Link>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
