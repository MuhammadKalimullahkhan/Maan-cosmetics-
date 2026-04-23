import React from 'react';
import { motion } from 'motion/react';

export const Hero: React.FC = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-brand-cream">
      {/* Background soft gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-gold/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-ink/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="space-y-2">
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.5 }}
              className="text-[12px] uppercase tracking-[0.4em] font-medium"
            >
              Pure • Conscious • Ethereal
            </motion.span>
            <h1 className="text-6xl md:text-8xl font-light leading-[0.9] tracking-tight">
              Elegance <br />
              <span className="italic font-normal text-brand-gold">Redefined.</span>
            </h1>
          </div>
          <p className="max-w-md text-sm md:text-base leading-relaxed opacity-70">
            Crafting botanically-infused cosmetics that celebrate your natural luminosity. 
            Maan is more than a brand; it's a ritual for the soul.
          </p>
          <div className="flex gap-6 items-center">
            <button className="bg-brand-ink text-brand-cream px-10 py-4 rounded-full text-xs uppercase tracking-widest font-semibold hover:bg-brand-gold transition-all duration-300 hover:scale-105 shadow-xl shadow-brand-ink/10">
              Explore Collection
            </button>
            <button className="text-xs uppercase tracking-widest font-semibold border-b border-brand-ink pb-1 hover:text-brand-gold hover:border-brand-gold transition-all">
              Our Vision
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: "circOut" }}
          className="relative aspect-[4/5] md:aspect-[3/4] w-full max-w-lg mx-auto"
        >
          <div className="absolute inset-0 border border-brand-ink/10 rounded-[100px] -m-4 md:-m-8 z-0" />
          <div className="w-full h-full rounded-[100px] overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1596462502278-27bf87a9346b?q=80&w=2680&auto=format&fit=crop" 
              alt="Luxury Cosmetics Concept"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          {/* Floating badge */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-6 -left-6 bg-white p-6 rounded-full shadow-xl border border-brand-ink/5"
          >
            <div className="text-center group cursor-default">
              <span className="block text-[24px] font-serif leading-none italic">100%</span>
              <span className="block text-[9px] uppercase tracking-widest mt-1 opacity-50">Natural</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
