function ProductCard({ product }) {
  // product object keys: id, title, price, images[0-2], category.name
  return (
    <div key={product.id} className="flex flex-col">
      
      <img src={product.images[0]} alt="" className="object-contain"/>
      <p className="font-bold">{product.title}</p>
      <p className="font-xs mt-4">{product.category.name}</p>
      <div className="flex gap-x-1 justify-end mt-2">
        <p>$ </p>
        <p className="font-medium">{product.price}</p>
      </div>
      
      <a>
        <button>Details</button>
      </a>
    </div>
  )
}

export default ProductCard
