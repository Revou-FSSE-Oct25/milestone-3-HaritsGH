import { useFetch } from "../hooks/useFetch";

import ProductCard from "./ProductCard";

function ProductList() {
  const { data: products, loading, error } = useFetch('https://api.escuelajs.co/api/v1/products/');

  return (
    <div className="flex flex-row justify-center h-full">
      {/* loading */}
      {loading && (
        <p>Loading...</p>
      )}

      {/* error fetch */}
      {!!error && (
        <p>Error fetching products.</p>
      )}

      {/* success fetch */}
      {!loading && !error && (
        <div className="w-7/8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
          {
            products.map((product) => <ProductCard key={product.id} product={product}/>)
          }
        </div>
      )}
    </div>
  );
}

export default ProductList
