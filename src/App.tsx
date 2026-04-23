import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { CartDrawer } from './components/CartDrawer';
import { AdminPanel } from './components/AdminPanel';
import { SAMPLE_PRODUCTS } from './data';
import { Search, SlidersHorizontal, ChevronRight } from 'lucide-react';

function StoreFront() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const { profile } = useStore();

  return (
    <div className="relative min-h-screen">
      <Navbar 
        onCartClick={() => setIsCartOpen(true)} 
        onAdminClick={() => setIsAdminOpen(true)}
      />
      
      <main>
        <Hero />

        {/* Featured Collection */}
        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto space-y-12">
          <div className="bg-white rounded-[32px] p-8 md:p-12 border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-brand-peach">The Essentials</span>
              <h2 className="text-4xl md:text-5xl font-light tracking-tight">Curated <span className="italic">Luminosity</span></h2>
            </div>
            <div className="flex flex-wrap items-center gap-6">
              <div className="relative hidden lg:block">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-ink/30" size={16} />
                <input 
                  type="text" 
                  placeholder="Search Rituals..." 
                  className="bg-[#F9F9F8] border border-brand-ink/5 rounded-2xl py-3.5 px-12 text-[10px] uppercase tracking-widest font-bold focus:outline-none focus:border-brand-peach transition-colors w-72"
                />
              </div>
              <button className="flex items-center gap-3 text-[10px] uppercase tracking-widest font-bold border border-slate-200 bg-white px-8 py-3.5 rounded-2xl hover:bg-brand-ink hover:text-white transition-all shadow-sm">
                <SlidersHorizontal size={14} />
                Filter
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {SAMPLE_PRODUCTS.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <button className="group flex items-center gap-6 text-[10px] uppercase tracking-[0.4em] font-bold py-5 px-16 bg-brand-ink text-white rounded-[32px] hover:bg-brand-peach hover:text-brand-ink transition-all duration-500 shadow-xl shadow-brand-ink/10 active:scale-95">
              View All Products
              <ChevronRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </section>

        {/* Brand Ethos */}
        <section className="px-6 md:px-12 py-12 max-w-7xl mx-auto">
          <div className="bg-brand-ink text-brand-cream py-24 px-8 md:px-20 rounded-[48px] overflow-hidden relative">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-peach/20 rounded-full blur-[150px] -mr-48 -mt-48" />
            
            <div className="max-w-4xl mx-auto text-center space-y-16 relative z-10">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <span className="text-brand-peach text-[10px] uppercase tracking-[0.6em] font-bold">Our Philosophy</span>
                <h2 className="text-5xl md:text-7xl font-light font-serif leading-tight">Beyond the <span className="italic">Surface.</span></h2>
                <p className="max-w-xl mx-auto opacity-60 leading-relaxed text-sm md:text-lg font-light">
                  Maan cosmetics is built on the alchemy of science and spirit. Each formula is a sacred blend of heritage botanicals and cutting-edge biotechnology.
                </p>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/10 pt-16">
                <EthosBox title="Ethically Sourced" desc="Direct partnerships with botanical farmers ensuring fair trade and purity." />
                <EthosBox title="Zero-Carbon" desc="Our laboratory and shipping facilities are powered 100% by renewable energy." />
                <EthosBox title="Cruelty-Free" desc="We advocate for beauty that causes no harm, ever. Leaping Bunny certified." />
              </div>
            </div>
          </div>
        </section>


        {/* Footer */}
        <footer className="bg-brand-cream border-t border-brand-ink/5 py-24 px-6 md:px-12">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold tracking-[0.2em] uppercase">Maan</h3>
              <p className="text-xs opacity-50 leading-loose">
                Elevating the daily ritual into an act of self-love. Join our journey towards conscious luminosity.
              </p>
            </div>
            <FooterLinks title="Journal" links={['Our Story', 'Botanical Science', 'Rituals', 'Sustainability']} />
            <FooterLinks title="Services" links={['Shipping & Returns', 'Privacy Policy', 'Terms of Use', 'Accessibility']} />
            <div className="space-y-6">
              <h4 className="text-[11px] uppercase tracking-[0.3em] font-bold">The Inner Circle</h4>
              <p className="text-[10px] opacity-50 uppercase tracking-widest leading-loose">
                Receive exclusive previews and botanical insights.
              </p>
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="w-full bg-transparent border-b border-brand-ink/20 py-4 text-xs font-medium focus:outline-none focus:border-brand-gold transition-colors"
                />
                <button className="absolute right-0 top-1/2 -translate-y-1/2 p-2 hover:text-brand-gold transition-colors">
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-brand-ink/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] uppercase tracking-widest opacity-40">
            <p>© 2026 Maan Cosmetics. All rights reserved.</p>
            <div className="flex gap-8">
              <span>Instagram</span>
              <span>Pinterest</span>
              <span>Twitter</span>
            </div>
          </div>
        </footer>
      </main>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <AdminPanel isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </div>
  );
}

const EthosBox = ({ title, desc }: any) => (
  <div className="space-y-4">
    <h4 className="text-brand-gold text-[11px] uppercase tracking-[0.3em] font-bold">{title}</h4>
    <p className="text-xs opacity-50 leading-relaxed font-sans">{desc}</p>
  </div>
);

const FooterLinks = ({ title, links }: any) => (
  <div className="space-y-6">
    <h4 className="text-[11px] uppercase tracking-[0.3em] font-bold">{title}</h4>
    <ul className="space-y-4">
      {links.map((link: string) => (
        <li key={link}>
          <a href="#" className="text-xs opacity-50 hover:opacity-100 hover:text-brand-gold transition-all">{link}</a>
        </li>
      ))}
    </ul>
  </div>
);

export default function App() {
  return (
    <StoreProvider>
      <StoreFront />
    </StoreProvider>
  );
}
