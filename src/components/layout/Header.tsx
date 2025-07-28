import { Badge } from '@/components/ui/badge';
import Logo from '@/logo.svg?react';
import { Search, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import UserProfileDropdown from '../UserProfileDropdown';

export default function Header() {
  return (
    <header className="bg-teal-400 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="bg-orange-100 px-4 py-2 rounded-lg flex items-center space-x-2">
            <Logo className="w-10 h-10" />
            <div>
              <div className="font-bold text-teal-800">Mercato</div>
              <div className="text-xs text-orange-600 font-semibold">ONLINE</div>
            </div>
          </div>
          <nav className="hidden md:flex space-x-6 text-teal-800">
            <Link to="/home" className="hover:text-teal-900">
              Home
            </Link>
            <Link to="/" className="hover:text-teal-900">
              Discover
            </Link>
            <Link to="/" className="hover:text-teal-900">
              Blog
            </Link>
            <Link to="/" className="hover:text-teal-900">
              About Us
            </Link>
            <Link to="/" className="hover:text-teal-900">
              Contact
            </Link>
            <Link to="/" className="hover:text-teal-900">
              Games
            </Link>
            <Link to="/sales" className="hover:text-teal-900">
              <b>Sell</b>
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <Search className="w-5 h-5 text-teal-800" />
          <div className="relative">
            <Link to="/cart">
              <ShoppingCart className="h-6 w-6" />
              <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs h-5 w-5 rounded-full flex items-center justify-center p-0">
                2
              </Badge>
            </Link>
          </div>
          <UserProfileDropdown />
        </div>
      </div>
    </header>
  );
}
