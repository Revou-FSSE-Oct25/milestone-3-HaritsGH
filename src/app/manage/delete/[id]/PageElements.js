'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useFetchTobi } from "@/hooks/useFetchTobi";

export default function DeleteProductPageElements({ params }) {
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const router = useRouter();

  const { data, loading, errorMessage } = useFetchTobi(`https://tobys-fakestore.up.railway.app/products/${params.value.id}`);
  const product = data?.data || data;

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const response = await fetch(`https://tobys-fakestore.up.railway.app/products/${params.value.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        router.push('/manage');
      } else {
        setDeleteError('Failed to delete product');
      }
    } catch (err) {
      setDeleteError('Error deleting product');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600 text-lg">Loading product...</span>
      </div>
    );
  }

  if (errorMessage || deleteError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <p className="text-red-700 font-medium">{errorMessage || deleteError}</p>
          <Link 
            href="/manage" 
            className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Back to Manage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Delete Product</h1>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-700 font-medium">
                Are you sure you want to delete this product? This action cannot be undone.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Details</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Name:</span>
                    <p className="text-gray-900">{product.title}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Price:</span>
                    <p className="text-gray-900">${product.price}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Category:</span>
                    <p className="text-gray-900">{product.category}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Description:</span>
                    <p className="text-gray-900">{product.description}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Image</h3>
                <div className="flex-shrink-0">
                  <Image 
                    unoptimized 
                    src={product.image} 
                    alt={product.title} 
                    width={300} 
                    height={300}
                    className="rounded-lg object-cover border border-gray-200"
                  />
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="inline-flex items-center px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {deleting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Deleting...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete Product
                  </>
                )}
              </button>
              
              <Link 
                href="/manage"
                className="inline-flex items-center px-6 py-3 bg-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-400 transition-colors duration-200"
              >
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
