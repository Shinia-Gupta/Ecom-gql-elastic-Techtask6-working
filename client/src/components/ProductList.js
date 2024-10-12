"use client";
import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import ProductCard from './ProductCard';
import  PaginationList  from './PaginationList';
import SkeletonCard from './SkeletonCard';

const GET_PRODUCTS = gql`
  query GetProducts($skip: Int, $limit: Int) {
    getProducts(skip: $skip, limit: $limit) {
    products{
      objectID
      name
      salePrice
      url
      image
      customerReviewCount
}
      resultCount
      }
  }
`;


const ProductList = () => {
  const [skip, setSkip] = useState(0);
  const [limit] = useState(21);
  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: { skip, limit },
    notifyOnNetworkStatusChange: true,
  });





  return (
    <div style={{ padding: '1rem' }}>
      {error && <p>Error fetching products: {error.message}</p>}
      <div className="flex flex-wrap gap-4 p-4">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : data?.getProducts?.products.map(product => (
              <ProductCard
                key={product.objectID}
                id={product.objectID}
                title={product.name}
                price={product.salePrice}
                url={product.url}
                image={product.image}
                reviewCount={product.customerReviewCount}
                className="w-64" 
              />
            ))}
      </div>
      {data?.getProducts?.products && (
        <PaginationList
          totalItems={data.getProducts.resultCount || 0}
          itemsPerPage={limit}
          onPageChange={newPage => setSkip(()=>Math.max(1, (newPage - 1) * limit))}
        />
      )}
    </div>
  );
};

export default ProductList;
