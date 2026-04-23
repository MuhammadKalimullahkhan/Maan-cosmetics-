import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, LayoutDashboard, Package, ShoppingCart, Users, TrendingUp, 
  Plus, Search, Edit3, Trash2, ArrowUpRight, ArrowDownRight, 
  BarChart3, RefreshCw
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell 
} from 'recharts';
import { useStore } from '../context/StoreContext';
import { SAMPLE_PRODUCTS } from '../data';

const analyticsData = [
  { name: 'Mon', sales: 4000, revenue: 2400 },
  { name: 'Tue', sales: 3000, revenue: 1398 },
  { name: 'Wed', sales: 2000, revenue: 9800 },
  { name: 'Thu', sales: 2780, revenue: 3908 },
  { name: 'Fri', sales: 1890, revenue: 4800 },
  { name: 'Sat', sales: 2390, revenue: 3800 },
  { name: 'Sun', sales: 3490, revenue: 4300 },
];

const categoryData = [
  { name: 'Skincare', value: 400 },
  { name: 'Makeup', value: 300 },
  { name: 'Fragrance', value: 200 },
  { name: 'Haircare', value: 100 },
];

const COLORS = ['#1a1a1a', '#c5a059', '#8e9299', '#e5e5e5'];

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'orders'>('dashboard');
  const { user } = useStore();
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-brand-ink/90 z-[200] flex items-center justify-center p-0 md:p-12 overflow-hidden"
        >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="w-full h-full max-w-7xl bg-[#FAF9F6] rounded-none md:rounded-[40px] overflow-hidden flex shadow-2xl"
          >
            {/* Sidebar Navigation */}
            <nav className="w-20 md:w-64 bg-[#121212] h-full flex flex-col p-4 md:p-8 text-white shrink-0">
              <div className="flex items-center gap-3 mb-12">
                <div className="w-10 h-10 bg-brand-peach rounded-2xl flex items-center justify-center text-brand-ink">
                  <TrendingUp size={20} />
                </div>
                <span className="hidden md:block text-xl font-semibold tracking-tight">Maan Panel</span>
              </div>

              <ul className="space-y-4 flex-1">
                <NavTab active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} icon={<LayoutDashboard size={20}/>} label="Dashboard" />
                <NavTab active={activeTab === 'products'} onClick={() => setActiveTab('products')} icon={<Package size={20}/>} label="Products" />
                <NavTab active={activeTab === 'orders'} onClick={() => setActiveTab('orders')} icon={<ShoppingCart size={20}/>} label="Orders" />
                <NavTab active={false} onClick={() => {}} icon={<Users size={20}/>} label="Customers" />
              </ul>

              <div className="mt-auto p-4 md:p-6 bg-white/5 rounded-[24px] hidden md:block">
                <p className="text-[10px] text-white/40 mb-2 uppercase tracking-widest font-bold">Cloud Presence</p>
                <div className="w-full h-1.5 bg-white/10 rounded-full mb-3 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '75%' }}
                    className="h-full bg-brand-peach rounded-full"
                  />
                </div>
                <p className="text-[10px] text-white/60 font-medium">750 / 1000 Units Active</p>
              </div>

              <button 
                onClick={onClose}
                className="mt-8 md:hidden w-full aspect-square flex items-center justify-center bg-white/10 rounded-2xl"
              >
                <X size={20} />
              </button>
            </nav>

            {/* Main Content Area */}
            <main className="flex-1 overflow-hidden flex flex-col">
              <header className="p-8 md:p-12 pb-4 flex justify-between items-center shrink-0">
                <div>
                  <h1 className="text-3xl font-serif text-slate-800">Welcome, {user?.displayName?.split(' ')[0]}</h1>
                  <p className="text-slate-400 text-sm">Here is what's happening with Maan today.</p>
                </div>
                <div className="flex gap-4">
                  <button className="hidden md:block px-8 py-3 bg-white border border-slate-200 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm hover:bg-slate-50 transition-colors">Export Report</button>
                  <button onClick={onClose} className="md:hidden p-3 bg-white border border-slate-200 rounded-2xl"><Search size={20}/></button>
                  <button className="px-8 py-3 bg-[#121212] text-white rounded-full text-xs font-bold uppercase tracking-widest shadow-lg hover:bg-brand-peach hover:text-brand-ink transition-all active:scale-95">+ Add Product</button>
                  <button onClick={onClose} className="hidden md:flex p-3 bg-brand-ink/5 text-brand-ink rounded-full hover:rotate-90 transition-transform">
                    <X size={20} />
                  </button>
                </div>
              </header>

              <div className="flex-1 overflow-y-auto p-8 md:p-12 pt-4">
                {activeTab === 'dashboard' && <DashboardView />}
                {activeTab === 'products' && <ProductsListView />}
                {activeTab === 'orders' && <OrdersListView />}
              </div>
            </main>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const NavTab = ({ active, onClick, icon, label }: any) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all ${
      active 
        ? 'bg-brand-peach/20 text-brand-peach border border-brand-peach/30' 
        : 'text-white/40 hover:text-white hover:bg-white/5'
    }`}
  >
    {icon}
    <span className="hidden md:block text-sm font-medium tracking-tight">{label}</span>
  </button>
);


const DashboardView = () => (
  <div className="grid grid-cols-1 lg:grid-cols-4 grid-rows-none lg:grid-rows-3 gap-5 min-h-[700px]">
    {/* Sales Overview (Large) */}
    <div className="lg:col-span-2 lg:row-span-2 bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm flex flex-col">
      <div className="flex justify-between items-start mb-10">
        <h3 className="text-lg font-medium">Sales Revenue</h3>
        <select className="bg-slate-50 border-none text-[10px] uppercase tracking-widest font-bold rounded-lg px-3 py-1.5 focus:ring-0">
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
        </select>
      </div>
      <div className="flex-1 min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={analyticsData}>
            <defs>
              <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#E2B49A" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#E2B49A" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
            <Tooltip 
              contentStyle={{ border: 'none', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}
            />
            <Area type="monotone" dataKey="revenue" stroke="#E2B49A" strokeWidth={4} fillOpacity={1} fill="url(#colorRev)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>

    {/* Quick Stats - Revenue */}
    <div className="bg-[#E2B49A] rounded-[32px] p-8 text-white flex flex-col justify-between shadow-lg shadow-[#E2B49A]/20">
      <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
        <TrendingUp size={24} />
      </div>
      <div>
        <p className="text-sm text-white/80 font-medium mb-1">Total Revenue</p>
        <h4 className="text-4xl font-bold tracking-tighter">$42,890</h4>
        <span className="inline-block mt-3 text-[10px] bg-white/20 px-3 py-1 rounded-full font-bold uppercase tracking-wider">+12.4% vs last mo</span>
      </div>
    </div>

    {/* Quick Stats - Orders */}
    <div className="bg-white border border-slate-100 rounded-[32px] p-8 flex flex-col justify-between shadow-sm">
      <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
        <ShoppingCart size={24} />
      </div>
      <div>
        <p className="text-sm text-slate-500 font-medium mb-1">Active Orders</p>
        <h4 className="text-4xl font-bold tracking-tighter text-slate-900">142</h4>
        <span className="inline-block mt-3 text-[10px] text-emerald-500 font-bold uppercase tracking-widest">12 Ready to Ship</span>
      </div>
    </div>

    {/* Inventory Pulse (Wide) */}
    <div className="lg:col-span-2 bg-brand-ink rounded-[32px] p-8 text-white flex items-center gap-8 shadow-xl">
      <div className="flex-1">
        <h4 className="text-xl font-medium mb-1">Inventory Pulse</h4>
        <p className="text-sm text-white/50">4 products are below threshold</p>
      </div>
      <div className="flex -space-x-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="w-14 h-14 rounded-full border-4 border-[#121212] overflow-hidden bg-white/10">
            <img src={SAMPLE_PRODUCTS[i % SAMPLE_PRODUCTS.length].images[0]} alt="" className="w-full h-full object-cover opacity-80" />
          </div>
        ))}
        <div className="w-14 h-14 rounded-full border-4 border-[#121212] bg-[#E2B49A] flex items-center justify-center text-xs text-brand-ink font-bold">+1</div>
      </div>
    </div>

    {/* Recent Transactions (Wide) */}
    <div className="lg:col-span-3 bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm overflow-hidden flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-lg font-medium">Recent Transactions</h3>
        <button className="text-[10px] text-brand-gold font-bold uppercase tracking-widest hover:opacity-70 transition-opacity">View All</button>
      </div>
      <div className="flex-1 overflow-x-auto">
        <table className="w-full text-left">
          <thead className="text-[10px] text-slate-400 uppercase tracking-widest border-b border-slate-50">
            <tr>
              <th className="pb-4 font-bold">Customer</th>
              <th className="pb-4 font-bold">Product</th>
              <th className="pb-4 font-bold">Amount</th>
              <th className="pb-4 font-bold">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {[
              { name: 'Elena Rossi', product: 'Eternal Glow Serum', price: '$85.00', status: 'Shipped' },
              { name: 'Jameson K.', product: 'Silk Velvet Tincture', price: '$32.00', status: 'Processing' }
            ].map((row, i) => (
              <tr key={i} className="border-b border-slate-50 last:border-0 group hover:bg-slate-50/50 transition-colors">
                <td className="py-5 font-bold text-slate-900">{row.name}</td>
                <td className="py-5 text-slate-500">{row.product}</td>
                <td className="py-5 font-medium tracking-tight">{row.price}</td>
                <td className="py-5">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${row.status === 'Shipped' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    {/* Retention Rate (Circle) */}
    <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center">
      <div className="relative w-32 h-32 mb-6">
        <svg className="w-full h-full transform -rotate-90">
          <circle cx="64" cy="64" r="54" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-slate-50" />
          <circle cx="64" cy="64" r="54" stroke="currentColor" strokeWidth="10" fill="transparent" strokeDasharray="339.29" strokeDashoffset="84.8" className="text-[#E2B49A]" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <span className="text-3xl font-bold tracking-tighter">75%</span>
        </div>
      </div>
      <p className="text-xs text-slate-500 font-medium">Customer Retention</p>
      <p className="text-[10px] text-emerald-500 font-bold mt-2 tracking-widest uppercase">+4.2% trend</p>
    </div>
  </div>
);

const StatCard = ({ label, value, trend, isUp, icon }: any) => (
  <div className="bg-white p-6 rounded-[28px] border border-brand-ink/5 shadow-sm">
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-brand-ink/5 rounded-xl text-brand-ink">
        {icon}
      </div>
      <div className={`flex items-center gap-1 text-[10px] font-bold ${isUp ? 'text-green-500' : 'text-red-500'}`}>
        {isUp ? <ArrowUpRight size={12}/> : <ArrowDownRight size={12}/>}
        {trend}
      </div>
    </div>
    <p className="text-[10px] uppercase tracking-widest font-bold opacity-40 mb-1">{label}</p>
    <p className="text-2xl font-sans font-bold tracking-tighter">{value}</p>
  </div>
);

const ProductsListView = () => (
  <div className="space-y-8">
    <div className="flex justify-between items-center">
      <h3 className="text-2xl font-serif">Product Inventory</h3>
      <button className="bg-brand-ink text-white px-6 py-3 rounded-2xl text-[11px] uppercase tracking-widest font-bold flex items-center gap-3 hover:bg-brand-gold transition-colors">
        <Plus size={18}/>
        Add New Product
      </button>
    </div>

    <div className="bg-white rounded-[32px] overflow-hidden border border-brand-ink/5">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-brand-ink/5 border-b border-brand-ink/5">
            <th className="px-8 py-6 text-[10px] uppercase tracking-widest opacity-50">Product</th>
            <th className="px-8 py-6 text-[10px] uppercase tracking-widest opacity-50">Category</th>
            <th className="px-8 py-6 text-[10px] uppercase tracking-widest opacity-50">Stock</th>
            <th className="px-8 py-6 text-[10px] uppercase tracking-widest opacity-50">Price</th>
            <th className="px-8 py-6 text-[10px] uppercase tracking-widest opacity-50 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {SAMPLE_PRODUCTS.map(p => (
            <tr key={p.id} className="border-b border-brand-ink/5 hover:bg-brand-ink/[0.01] transition-colors group">
              <td className="px-8 py-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                    <img src={p.images[0]} alt="" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-sm font-semibold">{p.name}</span>
                </div>
              </td>
              <td className="px-8 py-4 text-xs opacity-60 font-medium">{p.category}</td>
              <td className="px-8 py-4">
                <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${p.stock < 50 ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'}`}>
                  {p.stock} units
                </span>
              </td>
              <td className="px-8 py-4 text-sm font-bold tracking-tight">${p.price}</td>
              <td className="px-8 py-4 text-right">
                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 hover:bg-brand-ink hover:text-white rounded-lg transition-colors"><Edit3 size={16}/></button>
                  <button className="p-2 hover:bg-red-500 hover:text-white rounded-lg transition-colors"><Trash2 size={16}/></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const OrdersListView = () => (
  <div className="flex flex-col items-center justify-center h-full opacity-30 space-y-4 py-20">
    <RefreshCw size={48} className="animate-spin-slow" />
    <p className="text-xs uppercase tracking-[0.3em] font-bold">Real-time Order Stream Connecting...</p>
  </div>
);
