import React from 'react';
import { motion } from 'motion/react';
import { PlusCircle, Heart } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useStore();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-white border border-slate-100 rounded-[32px] p-2 transition-all duration-500 hover:shadow-2xl hover:shadow-brand-ink/5 hover:-translate-y-2">
        <div className="w-full h-full overflow-hidden rounded-[24px]">
          <img 
            src={product.images[0]} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
        </div>
        
        {/* Quick actions overlay */}
        <div className="absolute bottom-6 left-6 right-6 flex gap-2 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
          <button 
            onClick={() => addToCart(product)}
            className="flex-1 bg-brand-ink text-white py-4 px-6 rounded-2xl text-[10px] uppercase tracking-widest font-bold flex items-center justify-center gap-2 hover:bg-brand-peach hover:text-brand-ink transition-colors shadow-xl"
          >
            Add to Cart
          </button>
          <button className="bg-white text-brand-ink p-4 rounded-2xl hover:text-red-500 transition-colors shadow-lg border border-slate-100">
            <Heart size={18} />
          </button>
        </div>
      </div>

      <div className="mt-6 px-4">
        <p className="text-[10px] uppercase tracking-[0.2em] opacity-40 font-bold mb-2">{product.category}</p>
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-serif leading-none group-hover:text-brand-peach transition-colors">{product.name}</h3>
          <p className="text-sm font-bold tracking-tighter text-brand-ink/80">${product.price}</p>
        </div>
      </div>
    </motion.div>
  );
};

