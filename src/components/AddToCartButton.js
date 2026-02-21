import { useSessionContext } from "@/context/SessionContext";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

function AddToCartButton({ product }) {
  const session = useSessionContext();
  const { addItem } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    if (product) {
      addItem({
        id: product.id.toString(),
        name: product.title,
        price: product.price,
        // image: product.images[0].toString() <- platzi
        image: product.image // <- tobi
      });
      
      setIsAdded(true);
      setTimeout(() => {
        setIsAdded(false);
      }, 2000);
    }
  };

  return (   
    session === null ? <></> : 
      <button 
        className={`text-white text-center py-2 rounded w-24 text-sm ${
          isAdded 
            ? 'bg-green-600 cursor-not-allowed' 
            : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
        }`}
        onClick={handleAddToCart}
        disabled={isAdded}
      >
        {isAdded ? 'Added' : 'Add to Cart'}
      </button>
  )
}

export default AddToCartButton
