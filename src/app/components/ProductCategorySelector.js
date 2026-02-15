import { useState } from "react"
function ProductCategorySelector({categories, loading, fetchError}) {
  return (
    <aside className="w-1/8 flex flex-col">
      <p className="text-xl font-bold">Categories</p>

      {/* loading */}
      {loading && (
        <p>Loading...</p>
      )}

      {/* empty fetch */}
      {!loading && categories.length === 0 && (
        <p>No category found.</p>
      )}

      {/* error fetch */}
      {!loading && categories.length === 0 && fetchError === 'category' && (
        <p>Error fetching product categories.</p>
      )}

      {/* fetch success */}
      {!loading &&  categories.length > 0 && categories.map(
        (category) => <p key={category.id} className="text-base">{category.name}</p>
      )}
    </aside>
  )
}

export default ProductCategorySelector
