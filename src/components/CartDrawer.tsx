import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity } = useStore();
  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-ink/40 backdrop-blur-sm z-[100]"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-screen w-full max-w-md bg-brand-cream z-[101] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-brand-ink/5 flex justify-between items-center bg-white/50">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} strokeWidth={1.5} />
                <h2 className="text-xl font-serif tracking-tight">Shopping Bag</h2>
                <span className="text-[10px] bg-brand-ink text-white px-2 py-0.5 rounded-full font-bold ml-1">
                  {cart.length}
                </span>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:rotate-90 transition-transform duration-300"
              >
                <X size={24} strokeWidth={1} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center opacity-30 space-y-4">
                  <ShoppingBag size={64} strokeWidth={0.5} />
                  <p className="text-sm uppercase tracking-widest font-medium">Your bag is empty</p>
                </div>
              ) : (
                cart.map(item => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={item.id} 
                    className="flex gap-4 group"
                  >
                    <div className="w-24 aspect-[3/4] rounded-xl overflow-hidden bg-white shrink-0 shadow-sm border border-brand-ink/5">
                      <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="text-sm font-semibold leading-snug pr-4">{item.name}</h3>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="p-1 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all"
                          >
                            <X size={14} />
                          </button>
                        </div>
                        <p className="text-[10px] uppercase tracking-wider text-brand-gold font-bold mt-1">${item.price}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-brand-ink/10 rounded-lg p-1 bg-white">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-gray-50 rounded"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-gray-50 rounded"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <p className="text-xs font-bold ml-auto">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            <div className="p-8 bg-white border-t border-brand-ink/5 space-y-6 shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
              <div className="space-y-2">
                <div className="flex justify-between text-sm opacity-60">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm opacity-60">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="flex justify-between text-xl font-serif pt-2">
                  <span>Total</span>
                  <span className="font-sans font-bold tracking-tighter">${total.toFixed(2)}</span>
                </div>
              </div>
              
              <button 
                disabled={cart.length === 0}
                className="w-full bg-brand-ink text-brand-cream py-5 rounded-2xl text-[11px] uppercase tracking-[0.2em] font-bold flex items-center justify-center gap-3 hover:bg-brand-gold transition-all duration-500 disabled:opacity-20 disabled:cursor-not-allowed group shadow-xl shadow-brand-ink/10"
              >
                Secure Checkout
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              
              <p className="text-[9px] text-center text-gray-400 uppercase tracking-widest">
                Complimentary shipping on all orders over $150
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
