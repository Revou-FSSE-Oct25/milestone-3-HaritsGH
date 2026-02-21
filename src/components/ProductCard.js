import Link from "next/link";
import Image from "next/image";
import AddToCartButton from "./AddToCartButton";

function ProductCard({ product }) {
  // product object keys: id, title, price, images[0-2], category.name (platzi)
  // product object keys: id, title, price, image, category (tobi)
  return (
    <article className="h-full rounded-lg border shadow-sm overflow-hidden flex flex-col bg-stone-300">
      
      <div className="aspect-square bg-gray-100">
        <Image unoptimized src={product.image} alt="" width={500} height={500} className="object-cover w-full h-full"/>
      </div>
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div className="flex flex-col">
          <p className="font-bold">{product.title}</p>
          <p className="font-xs text-gray-500 mt-4">{product.category}</p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row justify-between">
            <p className="self-end text-2xl pr-4">$ {product.price}</p>
            <AddToCartButton product={product}/>
          </div>
          <Link href={`/product/${product.id}`} className="w-full mt-2 bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700 active:bg-blue-800">Details</Link>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
