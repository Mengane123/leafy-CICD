import React from 'react';

const AddToCartButton = ({ item, handleAddToCart }) => {
  return (
    <button 
      className='bg-green-500 text-white py-2 px-4 sm:px-6 md:px-8 lg:px-10 rounded-lg text-base sm:text-lg font-semibold'
      onClick={handleAddToCart}
    >
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
