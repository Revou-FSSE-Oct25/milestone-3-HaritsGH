'use client';

import { useState, useEffect } from "react";

// import { useFetch } from "@/hooks/useFetch";
import { useFetchTobi } from "@/hooks/useFetchTobi";

import Image from "next/image";
import Link from "next/link";

import NavBar from "@/components/NavBar";

function AdminEditPageElements() {
  const tableHeader = ["Image", "Name", "Price", "Category", "Description", "Actions"];

  // const {data: products, loading, errorMessage} = useFetch('https://api.escuelajs.co/api/v1/products/');

  const {data, loading, errorMessage} = useFetchTobi('https://tobys-fakestore.up.railway.app/products');
  const products = data?.data || [];

  // product object keys: id, title, price, images[0-2], category.name (platzi)
  // product object keys: id, title, price, image, category (tobi)

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Admin Edit</h2>
          <Link 
            href="/manage/add"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Product
          </Link>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600 text-lg">Loading products...</span>
          </div>
        )}

        {errorMessage && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 font-medium">{errorMessage}</p>
          </div>
        )}

        {!loading && !errorMessage && 
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {tableHeader.map((header) => (
                      <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products?.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-4 py-4 whitespace-nowrap align-middle">
                        <div className="flex-shrink-0 h-24 w-24">
                          <Image 
                            unoptimized 
                            src={product.image} 
                            alt={product.title} 
                            width={128} 
                            height={128}
                            className="h-24 w-24 rounded-lg object-cover border border-gray-200"
                          />
                        </div>
                      </td>
                      <td className="px-4 py-4 align-middle">
                        <div className="text-sm font-medium text-gray-900 max-w-xs truncate" title={product.title}>
                          {product.title}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap align-middle">
                        <div className="text-sm font-semibold text-gray-900">${product.price}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap align-middle">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {/* {product.category?.name} */}
                          {product.category}
                        </span>
                      </td>
                      <td className="px-4 py-4 align-middle">
                        <div className="text-sm text-justify text-gray-600 max-w-sm" style={{ wordWrap: 'break-word', whiteSpace: 'normal' }}>
                          {product.description}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium space-x-2 align-middle">
                        <Link 
                          href={`/manage/edit/${product.id}`}
                          className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded hover:bg-blue-700 transition-colors duration-200"
                        >
                          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Edit
                        </Link>
                        <Link 
                          href={`/manage/delete/${product.id}`}
                          className="inline-flex items-center px-3 py-1.5 bg-red-600 text-white text-xs font-medium rounded hover:bg-red-700 transition-colors duration-200"
                        >
                          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default AdminEditPageElements