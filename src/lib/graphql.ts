import { gql } from '@apollo/client';

// 1. Define Types based on your Entity
export interface Category {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  discount: number;
  rating: number | null;
  categoryId: number | null;
  category: Category | null;
  createdAt: string;
  updatedAt: string;
}

// 2. Queries (Match your @Query definitions)
export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      name
      createdAt
      updatedAt
    }
  }
`;

export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      price
      discount
      rating
      categoryId
      category {
        id
        name
      }
      createdAt
      updatedAt
    }
  }
`;

// 3. Mutations (Match your @Mutation definitions)
export const CREATE_CATEGORY = gql`
  mutation CreateCategory($createCategoryInput: CreateCategoryInput!) {
    createCategory(createCategoryInput: $createCategoryInput) {
      id
      name
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($id: Int!) {
    deleteCategory(id: $id)
  }
`;

export const CREATE_PRODUCT = gql`
  mutation CreateProduct($createProductInput: CreateProductInput!) {
    createProduct(createProductInput: $createProductInput) {
      id
      name
      price
      discount
      rating
      categoryId
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: Int!) {
    deleteProduct(id: $id)
  }
`;