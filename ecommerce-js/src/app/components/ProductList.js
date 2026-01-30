import ProductCard from "./ProductCard";

function ProductList({products, loading, fetchError}) {
  return (
    <main className="w-7/8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
      {/* loading */}
      {loading && (
        <p>Loading...</p>
      )}

      {/* empty fetch */}
      {!loading && products.length === 0 && fetchError === '' && (
        <p>No product listed.</p>
      )}

      {/* error fetch */}
      {!loading && fetchError === 'info' && (
        <p>Error fetching products.</p>
      )}

      {/* fetch success */}
      {!loading && products.length > 0 && 
        products.map((product) => <ProductCard product={product}/>)
      }
    </main>
  )
}

export default ProductList
