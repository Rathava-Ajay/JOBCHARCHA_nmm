import React, { useState } from 'react';
import { ShoppingBag, Search, Star, ShoppingCart, Check, Tag, ShieldCheck, Download, CreditCard, ArrowRight, X, Sparkles, Filter, FileText } from 'lucide-react';
import { Product, CartItem, Order, UserProfile } from '../types';
import { INITIAL_PRODUCTS } from '../data/mockData';

interface ECommerceMarketplaceSectionProps {
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
}

export const ECommerceMarketplaceSection: React.FC<ECommerceMarketplaceSectionProps> = ({ user, setUser }) => {
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Cart state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);

  // Orders State
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD-89210',
      date: '2026-08-10',
      items: [{ product: INITIAL_PRODUCTS[0], quantity: 1 }],
      totalAmount: 499,
      status: 'Delivered',
      paymentMethod: 'Razorpay',
      invoiceUrl: '#'
    }
  ]);
  const [activeTab, setActiveTab] = useState<'store' | 'orders'>('store');

  // Selected product modal
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categories = ['All', 'Books', 'Test Series', 'Video Courses', 'Class Notes'];

  const filteredProducts = products.filter((p) => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product: Product) => {
    const existing = cart.find((item) => item.product.id === product.id);
    if (existing) {
      setCart(cart.map((item) => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter((item) => item.product.id !== productId));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const total = Math.max(0, subtotal - discountAmount);

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === 'GOVPREP50' || couponCode.toUpperCase() === 'PASS50') {
      setDiscountAmount(100);
      alert('Coupon code applied! ₹100 discount added.');
    } else {
      alert('Invalid Coupon Code. Try "GOVPREP50" or "PASS50"');
    }
  };

  const handleCheckout = (paymentType: 'Razorpay' | 'Wallet') => {
    if (cart.length === 0) return;

    if (paymentType === 'Wallet') {
      if (user.walletBalance < total) {
        alert(`Insufficient Wallet Balance (₹${user.walletBalance}). Please add funds or pay via Razorpay.`);
        return;
      }
      setUser({ ...user, walletBalance: user.walletBalance - total });
    }

    const newOrder: Order = {
      id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toISOString().split('T')[0],
      items: [...cart],
      totalAmount: total,
      status: 'Processing',
      paymentMethod: paymentType,
      invoiceUrl: '#'
    };

    setOrders([newOrder, ...orders]);
    setCart([]);
    setIsCartOpen(false);
    setActiveTab('orders');
    alert(`Order Placed Successfully via ${paymentType}! Invoice generated.`);
  };

  return (
    <section className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full mb-2">
              <ShoppingBag className="w-3.5 h-3.5 text-emerald-600" />
              <span>Aspirant Marketplace & Store</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 tracking-tight">
              Exam Books, Hardcopy Tests & Video Bundles
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Handcrafted toppers notes, official guidebooks, printed OMR workbooks, and HD masterclasses.
            </p>
          </div>

          {/* Action Tabs & Cart Button */}
          <div className="flex items-center gap-3">
            <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200 text-xs font-bold">
              <button
                onClick={() => setActiveTab('store')}
                className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${activeTab === 'store' ? 'bg-slate-900 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Store Catalog
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${activeTab === 'orders' ? 'bg-slate-900 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'}`}
              >
                My Orders ({orders.length})
              </button>
            </div>

            <button
              onClick={() => setIsCartOpen(true)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-2xl text-xs font-extrabold flex items-center gap-2 cursor-pointer shadow-md transition-all active:scale-95"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})</span>
            </button>
          </div>
        </div>

        {activeTab === 'store' ? (
          <>
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Category Pills */}
              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      activeCategory === cat
                        ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search books, notes, topics..."
                  className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:border-emerald-500 shadow-2xs"
                />
              </div>
            </div>

            {/* Product Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-lg transition-all overflow-hidden flex flex-col justify-between group"
                >
                  <div>
                    {/* Image Banner */}
                    <div className="relative h-48 bg-slate-100 overflow-hidden">
                      <img
                        src={product.imageUrl}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-xs text-white text-[10px] font-extrabold px-2.5 py-1 rounded-lg">
                        {product.category}
                      </span>
                      {product.isDigital && (
                        <span className="absolute top-3 right-3 bg-indigo-600 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-lg flex items-center gap-1">
                          <Download className="w-3 h-3" /> Digital Instant
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5 space-y-2">
                      <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{product.rating}</span>
                        <span className="text-slate-400 text-[11px]">({product.reviewsCount} reviews)</span>
                      </div>

                      <h3
                        onClick={() => setSelectedProduct(product)}
                        className="font-heading font-extrabold text-sm text-slate-900 hover:text-emerald-600 cursor-pointer line-clamp-2 leading-snug"
                      >
                        {product.title}
                      </h3>

                      <p className="text-xs text-slate-500 line-clamp-2">
                        {product.description}
                      </p>
                    </div>
                  </div>

                  {/* Pricing and Action */}
                  <div className="p-5 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between">
                    <div>
                      <span className="text-lg font-black text-slate-900">₹{product.price}</span>
                      <span className="text-xs text-slate-400 line-through ml-1.5">₹{product.originalPrice}</span>
                    </div>

                    <button
                      onClick={() => addToCart(product)}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          /* ORDERS HISTORY TAB */
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6">
            <h3 className="text-xl font-heading font-extrabold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-600" /> Your Purchase History & Invoices
            </h3>

            {orders.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-xs">
                No orders placed yet. Explore the Store Catalog!
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="border border-slate-200 rounded-2xl p-5 space-y-4 bg-slate-50">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3 text-xs">
                      <div>
                        <span className="font-mono font-bold text-slate-900 text-sm">{order.id}</span>
                        <span className="text-slate-500 block">Placed on {order.date} via {order.paymentMethod}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full text-[11px]">
                          {order.status}
                        </span>
                        <button
                          onClick={() => alert(`Downloading Official Invoice PDF for ${order.id}...`)}
                          className="bg-slate-900 text-white font-bold text-[11px] px-3 py-1.5 rounded-xl cursor-pointer flex items-center gap-1"
                        >
                          <Download className="w-3 h-3" /> Invoice PDF
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center text-xs">
                          <span className="font-medium text-slate-800">{item.product.title} (x{item.quantity})</span>
                          <span className="font-bold text-slate-900">₹{item.product.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-slate-200 flex justify-between items-center font-bold text-sm text-slate-900">
                      <span>Total Paid</span>
                      <span className="text-emerald-700 font-black">₹{order.totalAmount}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>

      {/* SHOPPING CART DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/60 backdrop-blur-xs transition-opacity">
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between">
            {/* Drawer Header */}
            <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-emerald-400" />
                <h3 className="font-heading font-extrabold text-base">Your Cart ({cart.length})</h3>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50">
              {cart.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-xs">
                  Your cart is empty.
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.product.id} className="bg-white p-3.5 rounded-2xl border border-slate-200 flex gap-3 items-center">
                    <img src={item.product.imageUrl} alt={item.product.title} className="w-12 h-12 rounded-xl object-cover" />
                    <div className="flex-1 text-xs">
                      <div className="font-bold text-slate-900 line-clamp-1">{item.product.title}</div>
                      <div className="text-slate-500">₹{item.product.price} x {item.quantity}</div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-slate-400 hover:text-red-500 cursor-pointer p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}

              {/* Coupon Code Section */}
              {cart.length > 0 && (
                <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-2">
                  <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5 text-emerald-600" /> Apply Discount Coupon
                  </span>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="e.g. GOVPREP50"
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 font-mono uppercase focus:outline-none"
                    />
                    <button
                      onClick={applyCoupon}
                      className="bg-slate-900 text-white font-bold text-xs px-3 py-1.5 rounded-xl cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Checkout Actions */}
            {cart.length > 0 && (
              <div className="p-5 bg-white border-t border-slate-200 space-y-3">
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-bold">
                      <span>Discount</span>
                      <span>-₹{discountAmount}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-black text-slate-900 text-base pt-1 border-t border-slate-100">
                    <span>Total Amount</span>
                    <span className="text-emerald-700">₹{total}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => handleCheckout('Razorpay')}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs py-3 rounded-xl transition-all cursor-pointer shadow-md flex items-center justify-center gap-1"
                  >
                    <CreditCard className="w-3.5 h-3.5" /> Razorpay
                  </button>
                  <button
                    onClick={() => handleCheckout('Wallet')}
                    className="bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs py-3 rounded-xl transition-all cursor-pointer shadow-md flex items-center justify-center gap-1"
                  >
                    <span>Wallet (₹{user.walletBalance})</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* PRODUCT DETAIL MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 relative shadow-2xl space-y-4">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 bg-slate-100 p-2 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <img src={selectedProduct.imageUrl} alt={selectedProduct.title} className="w-full h-48 rounded-2xl object-cover" />

            <div className="space-y-2">
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                {selectedProduct.category}
              </span>
              <h3 className="text-xl font-heading font-extrabold text-slate-900">{selectedProduct.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{selectedProduct.description}</p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div>
                <span className="text-2xl font-black text-slate-900">₹{selectedProduct.price}</span>
                <span className="text-xs text-slate-400 line-through ml-2">₹{selectedProduct.originalPrice}</span>
              </div>
              <button
                onClick={() => {
                  addToCart(selectedProduct);
                  setSelectedProduct(null);
                }}
                className="bg-emerald-600 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl cursor-pointer"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
