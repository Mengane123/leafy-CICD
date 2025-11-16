import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import AddToCartButton from './AddToCartButton';
import { FaRegStar } from "react-icons/fa";
import { useCartStore } from '../../store/CartStore';
import data from '../Data/data';
import data2 from '../Data/data2';

const SingleProduct = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const addProductToCart = useCartStore(state => state.addProductToCart);

  const fetchProduct = useCallback(() => {
    setLoading(true);
    try {
      const selectedProduct = data.find(item => item.id === id) || data2.find(item => item.id === id);
      if (selectedProduct) {
        setProduct(selectedProduct);
      } else {
        setError("Product not found");
      }
    } catch (err) {
      setError("Failed to fetch product");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className='p-4 md:p-6 lg:p-8'>
      {product ? (
        <div>
          <div className='flex gap-2 text-lg md:text-xl my-4 mx-auto max-w-5xl text-green-500'>
            <Link to={`/`}><span>Home</span> / </Link> <span>{product.title}</span>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 my-10 mx-auto max-w-5xl'>
            <div className='flex justify-center items-center'>
              <img className='w-full max-w-md h-auto object-cover' src={product.image} alt={product.title} />
            </div>
            <div className='p-4 md:p-6 lg:p-8'>
              <h2 className='font-bold text-green-500 text-3xl md:text-4xl'>{product.title}</h2>
              <div className='text-xl md:text-2xl mt-2'>
                <span className='text-green-500 font-semibold'>Description:</span> {product.description}
              </div>
              {/* <div className='text-xl md:text-2xl mt-2 flex items-center gap-2'>
                <span className='text-green-500 font-semibold'>Rating:</span>
                <p className='text-yellow-500 text-2xl md:text-3xl'><FaRegStar /></p>
                {product.rating}
              </div> */}
              <p className='text-xl md:text-2xl mt-2'>
                <span className='text-green-500 font-semibold'>Price:</span> ₹{product.price}
              </p>
              <div className='mt-4'>
                <AddToCartButton item={product} handleAddToCart={() => addProductToCart(product)} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Product not found</p>
      )}
    </div>
  );
};

export default SingleProduct;
