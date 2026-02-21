'use client';

import NavBar from "@/components/NavBar";
import AdminProductForm from "@/components/AdminProductForm";

import { useRouter } from "next/navigation";

export default function AddProductPage() {
  const router = useRouter();

  const handleSubmit = async (productData) => {
    try {
      const response = await fetch('https://tobys-fakestore.up.railway.app/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        // console.log("Add form submitted", productData);
        router.push('/manage');
      } else {
        console.error('Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
    // router.push('/manage');
  };

  return (
    <div>
      <NavBar />
      <h2>Add New Product</h2>
      <AdminProductForm onSubmit={handleSubmit} />
    </div>
  );
}