"use client";

import { useState } from "react";
import {
  GET_CATEGORIES,
  GET_PRODUCTS,
  CREATE_CATEGORY,
  CREATE_PRODUCT,
  DELETE_CATEGORY,
  DELETE_PRODUCT,
  Category,
  Product,
} from "@/lib/graphql";
import { useQuery, useMutation } from "@apollo/client/react";

export default function Dashboard() {
  // State for forms
  const [newCategoryName, setNewCategoryName] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("0");
  const [productDiscount, setProductDiscount] = useState("0");
  const [productCategoryId, setProductCategoryId] = useState("");

  // Queries
  const {
    loading: loadingCategories,
    data: categoriesData,
    error: categoriesError,
  } = useQuery<{ categories: Category[] }>(GET_CATEGORIES);

  const {
    loading: loadingProducts,
    data: productsData,
    error: productsError,
  } = useQuery<{ products: Product[] }>(GET_PRODUCTS);

  // Mutations
  const [createCategory] = useMutation(CREATE_CATEGORY, {
    refetchQueries: [{ query: GET_CATEGORIES }],
  });

  const [deleteCategory] = useMutation(DELETE_CATEGORY, {
    refetchQueries: [{ query: GET_CATEGORIES }, { query: GET_PRODUCTS }], // Refetch products too as they might lose category
  });

  const [createProduct] = useMutation(CREATE_PRODUCT, {
    refetchQueries: [{ query: GET_PRODUCTS }],
  });

  const [deleteProduct] = useMutation(DELETE_PRODUCT, {
    refetchQueries: [{ query: GET_PRODUCTS }],
  });

  // Handlers
  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName) return;
    try {
      await createCategory({
        variables: { createCategoryInput: { name: newCategoryName } },
      });
      setNewCategoryName("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createProduct({
        variables: {
          createProductInput: {
            name: productName,
            price: parseFloat(productPrice),
            discount: parseInt(productDiscount),
            categoryId: productCategoryId ? parseInt(productCategoryId) : null,
            // rating is optional in your backend, omitted here for simplicity
          },
        },
      });
      setProductName("");
      setProductPrice("0");
      setProductDiscount("0");
      setProductCategoryId("");
    } catch (err) {
      console.error(err);
    }
  };

  if (loadingCategories || loadingProducts) return <p className="p-10">Loading...</p>;
  if (categoriesError || productsError) return <p className="p-10 text-red-500">Error loading data</p>;

  return (
    <main className="min-h-screen p-8 bg-slate-400">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Inventory Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* CATEGORIES SECTION */}
        <div className="bg-gray-200 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Categories</h2>
          
          {/* Add Category Form */}
          <form onSubmit={handleAddCategory} className="flex gap-2 mb-4 text-gray-800">
            <input
              type="text"
              placeholder="Category Name"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="border p-2 rounded flex-grow"
              required
            />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 hover:cursor-pointer">
              Add
            </button>
          </form>

          {/* Category List */}
          <ul className="space-y-2">
            {categoriesData?.categories.map((cat) => (
              <li key={cat.id} className="flex justify-between items-center p-3 bg-gray-50 rounded border">
                <span className="font-medium text-gray-800">{cat.name}</span>
                <button
                  onClick={() => deleteCategory({ variables: { id: cat.id } })}
                  className="text-red-500 hover:text-red-700 text-sm hover:underline hover:cursor-pointer"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* PRODUCTS SECTION */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Products</h2>

          {/* Add Product Form */}
          <form onSubmit={handleAddProduct} className="grid grid-cols-2 gap-3 mb-4 text-gray-800">
            <input
              type="text"
              placeholder="Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="border p-2 rounded col-span-2"
              required
            />
            <input
              type="number"
              placeholder="Price"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              className="border p-2 rounded"
              step="0.01"
              required
            />
            <input
              type="number"
              placeholder="Discount (%)"
              value={productDiscount}
              onChange={(e) => setProductDiscount(e.target.value)}
              className="border p-2 rounded"
              max="100"
              required
            />
            <select
              value={productCategoryId}
              onChange={(e) => setProductCategoryId(e.target.value)}
              className="border p-2 rounded col-span-2 text-gray-700"
            >
              <option value="">Select Category (Optional)</option>
              {categoriesData?.categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 col-span-2 hover:cursor-pointer">
              Add Product
            </button>
          </form>

          {/* Product List */}
          <div className="space-y-2 max-h-78 overflow-y-auto">
            {productsData?.products.map((prod) => (
              <div key={prod.id} className="p-3 border rounded bg-gray-50 flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-700">{prod.name}</h3>
                  <p className="text-sm text-gray-600">
                    ${prod.price} | Disc: {prod.discount}%
                  </p>
                  <p className="text-xs text-blue-500 mt-1">
                    Category: {prod.category?.name || "None"}
                  </p>
                </div>
                <button
                  onClick={() => deleteProduct({ variables: { id: prod.id } })}
                  className="text-red-500 hover:text-red-700 text-sm hover:underline hover:cursor-pointer"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}