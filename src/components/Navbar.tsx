import React from 'react';
import { ShoppingBag, User, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '../context/StoreContext';
import { signInWithGoogle, auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';

interface NavbarProps {
  onCartClick: () => void;
  onAdminClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onCartClick, onAdminClick }) => {
  const { user, profile, cart } = useStore();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-cream/80 backdrop-blur-md border-b border-brand-ink/5 pt-4 pb-4 px-6 md:px-12 flex justify-between items-center transition-all duration-300">
      <div className="flex-1 flex items-center gap-8">
        <button className="md:hidden text-brand-ink">
          <Menu size={24} />
        </button>
        <div className="hidden md:flex items-center gap-6 text-[11px] uppercase tracking-[0.2em] font-medium opacity-70">
          <a href="#" className="hover:opacity-100 transition-opacity">Shop All</a>
          <a href="#" className="hover:opacity-100 transition-opacity">Skincare</a>
          <a href="#" className="hover:opacity-100 transition-opacity">Makeup</a>
        </div>
      </div>

      <div className="flex-1 text-center">
        <h1 className="text-2xl md:text-3xl tracking-[0.15em] font-bold uppercase leading-none cursor-pointer">
          Maan
        </h1>
      </div>

      <div className="flex-1 flex justify-end items-center gap-6">
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              {profile?.role === 'admin' && (
                <button 
                  onClick={onAdminClick}
                  className="text-[10px] uppercase tracking-widest bg-brand-ink text-brand-cream px-3 py-1 rounded-full hover:bg-brand-gold transition-colors"
                >
                  Admin
                </button>
              )}
              <div className="group relative">
                <button className="flex items-center gap-2 hover:opacity-100 transition-opacity">
                  <User size={20} strokeWidth={1.5} />
                </button>
                <div className="absolute right-0 top-full mt-2 w-48 bg-white shadow-xl border border-gray-100 py-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto rounded-lg">
                  <div className="px-4 py-2 border-b border-gray-50 mb-1">
                    <p className="text-xs font-semibold truncate">{user.displayName}</p>
                    <p className="text-[10px] text-gray-500 truncate">{user.email}</p>
                  </div>
                  <button 
                    onClick={() => signOut(auth)}
                    className="w-full text-left px-4 py-2 text-xs hover:bg-gray-50 text-red-500 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button 
              onClick={signInWithGoogle}
              className="text-[11px] uppercase tracking-widest font-medium hover:text-brand-gold transition-colors"
            >
              Sign In
            </button>
          )}
          
          <button 
            onClick={onCartClick}
            className="relative flex items-center justify-center p-2 hover:scale-105 transition-transform"
          >
            <ShoppingBag size={22} strokeWidth={1.5} />
            {cartCount > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                key={cartCount}
                className="absolute -top-1 -right-1 bg-brand-gold text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold"
              >
                {cartCount}
              </motion.span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};
