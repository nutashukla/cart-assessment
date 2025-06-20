'use client';

import Link from 'next/link';
import { ShoppingCart, Search } from 'lucide-react';
import { Button } from './ui/button';
import { useCart } from '../context/CartContext';

const Navbar = ({ search, setSearch }) => {
  const { cart } = useCart();
  const totalCount = cart?.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
      <Link href="/" className="text-xl font-medium cursor-pointer">
        Home
      </Link>

      <div className="relative w-full max-w-md">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-md border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
      </div>

      <Link href="/cart" className="relative">
        <Button variant="outline" size="icon">
          <ShoppingCart className="h-5 w-5" />
        </Button>
        {totalCount > 0 && (
          <span
            className="absolute -top-1 -right-1 inline-flex items-center justify-center rounded-full bg-red-900 text-white text-xs w-5 h-5"
            aria-label={`${totalCount} items in cart`}
          >
            {totalCount}
          </span>
        )}
      </Link>
    </nav>
  );
};

export default Navbar;
