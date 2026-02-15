import { useCart } from "@/context/CartContext"

function AddToCartButton({ id, name, price}) {
  const addItem = useCart((state) => state.addItem)

  const handleAdd = () => {
    addItem(toAdd)
  }
  return (
    <button className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-center py-2 rounded w-24 text-sm"
      onClick={handleAdd}
    >
      Add to Cart
    </button>
  )
}

export default AddToCartButton
