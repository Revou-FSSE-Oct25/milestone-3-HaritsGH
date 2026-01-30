import ProductCard from "./ProductCard";

function ProductList({products}) {
  return (
    <main className="w-7/8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
      {
        products.map((product) => <ProductCard key={product.id} product={product}/>)
      }
    </main>
  )
}

export default ProductList
