import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import { useCartStore } from '../../store/CartStore';
import { Link } from 'react-router-dom';
import { createPortal } from 'react-dom';

const ShoppingCart = forwardRef(({ onCheckout }, ref) => {
  const dialog = useRef();

  useImperativeHandle(ref, () => ({
    open() {
      dialog.current?.showModal();
    },
    close() {
      dialog.current?.close();
    }
  }), []);

  const { cart, removeProductFromCart, updateProductQuantity, clearCart } = useCartStore((state) => ({
    cart: state.cart,
    removeProductFromCart: state.removeProductFromCart,
    updateProductQuantity: state.updateProductQuantity,
    clearCart: state.clearCart,
  }));

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const discount = totalPrice > 3000 ? 0.05 * totalPrice : 0;
  const finalPrice = totalPrice - discount;

  return createPortal(
    <dialog ref={dialog} className='p-4 min-h-screen bg-gray-50 mt-12 sm:mt-14 md:mt-14 lg:mt-12 rounded'>
      <button 
        onClick={() => dialog.current?.close()} 
        className="absolute top-2 right-2 text-red-500 text-2xl"
      >
        &times;
      </button>

      {cart.length === 0 ? (
        <p className='flex mx-auto my-32 justify-center text-3xl text-green-500 items-center rounded-xl h-40 w-full md:w-80'>
          Your cart is empty
        </p>
      ) : (
        <div className='border-2 border-blue-300 rounded-lg bg-white shadow-lg'>
          <h2 className='text-2xl font-bold mb-4 p-4 border-b border-gray-300'>Shopping Cart</h2>
          <div className='hidden md:grid grid-cols-5 gap-4 p-4 border-b border-gray-300 bg-gray-100'>
            <div className='font-semibold'>Image & Title</div>
            <div className='font-semibold text-center'>Quantity</div>
            <div className='font-semibold text-center'>Price</div>
            <div className='font-semibold text-center'>Actions</div>
            <div></div>
          </div>

          {cart.map(product => (
            <div key={product.id} className='grid grid-cols-1 md:grid-cols-5 gap-4 items-center p-4 border-b border-gray-300'>
              <div className='flex items-center space-x-4'>
                <img className='w-24 h-24 object-cover' src={product.image} alt={product.title} />
                <h3 className='text-lg font-semibold'>{product.title}</h3>
              </div>
              <div className='text-center'>
                <div className='flex items-center justify-center space-x-2'>
                  <button 
                    className='bg-green-500 text-white p-2 w-8 h-8 rounded-full'
                    onClick={() => updateProductQuantity(product.id, product.quantity - 1)}
                    disabled={product.quantity <= 1}
                  >
                    -
                  </button>
                  <span className='text-lg'>{product.quantity}</span>
                  <button 
                    className='bg-green-500 text-white p-2 w-8 h-8 rounded-full'
                    onClick={() => updateProductQuantity(product.id, product.quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className='text-center'>₹{product.price * product.quantity}</div>
              <div className='text-center'>
                <button 
                  className='bg-red-500 text-white py-1 px-4 rounded'
                  onClick={() => removeProductFromCart(product.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className='p-4 text-right border-t border-gray-300'>
            <div className='mb-2'>
              <p className='text-lg font-semibold'>Original Total Price: ₹{totalPrice.toFixed(2)}</p>
              {discount > 0 && (
                <p className='text-lg font-semibold text-red-500'>
                  Discount Applied: ₹{discount.toFixed(2)}
                </p>
              )}
            </div>
            {discount > 0 && (
              <h3 className='text-xl font-semibold'>
                New Buying Price: ₹{finalPrice.toFixed(2)}
              </h3>
            )}
            <div className='mt-4 flex flex-col sm:flex-row sm:space-x-4'>
              <Link to={'/checkout'}>
                <button 
                  className='bg-blue-500 text-white py-2 px-6 rounded-lg text-lg font-semibold'
                  onClick={onCheckout}
                >
                  Checkout
                </button>
              </Link>
              <button 
                className='bg-red-500 text-white py-2 px-6 rounded-lg text-lg font-semibold mt-4 sm:mt-0'
                onClick={clearCart}
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </dialog>,
    document.getElementById('main')
  );
});

export default ShoppingCart;
