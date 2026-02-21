import React, { useState, useEffect } from 'react'

const AdminProductForm = ({ product = null, onSubmit }) => {
  // Platzi
  // const [formData, setFormData] = useState({
  //   title: '',
  //   description: '',
  //   price: '',
  //   categoryId: '',
  //   images: ''
  // })

  // Tobi
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    image: ''
  })

  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (product) {
      setFormData({
        // Platzi
        // title: product.title || '',
        // description: product.description || '',
        // price: product.price || '',
        // categoryId: product.category?.id || '',
        // images: product.images?.[0] || ''

        // Tobi
        title: product.title || '',
        description: product.description || '',
        price: product.price || '',
        category: product.category || '',
        image: product.image || ''
      })
    }
  }, [product])

  useEffect(() => {
    const fetchCategories = async () => {
      // Platzi
      // try {
      //   const response = await fetch('https://api.escuelajs.co/api/v1/categories')
      //   if (!response.ok) {
      //     throw new Error('Failed to fetch categories')
      //   }
      //   const data = await response.json()
      //   setCategories(data)
      // } catch (error) {
      //   console.error('Error fetching categories:', error)
      //   // Fallback categories if API fails
      //   setCategories([
      //     { id: 1, name: 'Fetch Error' }
      //   ])
      // }
      
      // Tobi
      setCategories([
        { id: 1, name: 'Electronics' },
        { id: 2, name: 'Clothing' },
        { id: 3, name: 'Books' }
      ])
    }

    fetchCategories()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const submissionData = {
      ...formData,
      // Platzi
      // categoryId: parseInt(formData.categoryId),
      // price: parseFloat(formData.price),
      // images: [formData.images]
      
      // Tobi
      price: parseFloat(formData.price)
    }
    onSubmit(submissionData)
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      {loading && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Loading...</span>
        </div>
      )}

      {errorMessage && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 font-medium">{errorMessage}</p>
        </div>
      )}

      {!loading && !errorMessage && 
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
              Product Name:
            </label>
            <input 
              id="title"
              type="text" 
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter product name" 
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 outline-none"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
              Product Description:
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description" 
              required
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 outline-none resize-none"
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-semibold text-gray-700 mb-2">
              Product Price:
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">$</span>
              <input 
                id="price"
                type="number" 
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00" 
                required
                step="0.01"
                min="0"
                className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 outline-none"
              />
            </div>
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
              Product Category:
            </label>
            <select 
              id="category"
              // name="categoryId"
              // value={formData.categoryId}
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 outline-none bg-white"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} 
                // value={category.id}
                value={category.name}
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="images" className="block text-sm font-semibold text-gray-700 mb-2">
              Product Image URL:
            </label>
            <input 
              id="images"
              type="url" 
              // name="images"
              // value={formData.images}
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg" 
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 outline-none"
            />
          </div>

          <div className="pt-4">
            <button 
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors duration-200 shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98] transition-transform"
            >
              {product ? 'Update Product' : 'Add Product'}
            </button>
          </div>
        </form>
      }
    </div>
  )
}

export default AdminProductForm