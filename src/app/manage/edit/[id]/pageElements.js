'use client';

import NavBar from "@/components/NavBar";
import AdminProductForm from "@/components/AdminProductForm";
import { useRouter } from "next/navigation";
import { useFetchTobi } from "@/hooks/useFetchTobi";
// import { useFetch } from "@/hooks/useFetch";

export default function EditProductPageElements({ productId }) {
  const router = useRouter();
  // const { data: product, loading, errorMessage } = useFetch(`https://api.escuelajs.co/api/v1/products/${productId}`)

  const {data: product, loading, errorMessage} = useFetchTobi(`https://tobys-fakestore.up.railway.app/products/${productId}`);

  const handleSubmit = async (productData) => {
    // console.log("Edit form submitted", productData);
    try {
      const response = await fetch(`https://tobys-fakestore.up.railway.app/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      // console.log(response);
      if (response.ok) {
        // console.log("Edit form submitted", productData);
        router.push('/manage');
      } else {
        console.error('Failed to update product');
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
    // router.push('/manage');
  };

  return (
    <div>
      <NavBar />
      {loading && <p>Loading product...</p>}
      {errorMessage && <p>Error: {errorMessage}</p>}
      {!loading && !errorMessage && (
        <>
          <h2>Edit Product</h2>
          <AdminProductForm product={product} onSubmit={handleSubmit} />
        </>
      )}
    </div>
  );
}