import React from 'react';
import { ShoppingCart, User, Store, Shield, Package, LogOut, LogIn } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ currentPage, onPageChange, onLoginClick }) => {
  const { items } = useCart();
  const { user, userRole, isAuthenticated, switchRole, logout } = useAuth();
  
  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const navItems = [
    { id: 'home', label: 'Home', icon: Store },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'cart', label: 'Cart', icon: ShoppingCart, badge: cartItemCount },
  ];

  const roleItems = [
    { id: 'vendor', label: 'Vendor', icon: Store, role: 'vendor' },
    { id: 'admin', label: 'Admin', icon: Shield, role: 'admin' },
  ];

  return (
    <nav className='bg-yellow-200'>
    <nav className="bg-yellow shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Store className="h-8 w-8 text-green-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">ShopHere</span>
          </div>

          <div className="flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onPageChange(item.id)}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentPage === item.id
                      ? 'bg-blue-100 text-green-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                  {item.badge && item.badge > 0 && (
                    <span className="bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-700" />
                  <div className="text-sm">
                    <div className="font-medium text-gray-900">{user.name}</div>
                    <div className="text-gray-500 capitalize">{userRole}</div>
                  </div>
                </div>
                
                {/* Role Switcher - Only for demo purposes */}
                <select
                  value={userRole}
                  onChange={(e) => switchRole(e.target.value)}
                  className="text-sm border rounded px-2 py-1"
                >
                  <option value="customer">Customer</option>
                  <option value="vendor">Vendor</option>
                  <option value="admin">Admin</option>
                </select>
                
                <button
                  onClick={logout}
                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="flex items-center space-x-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <LogIn className="h-4 w-4" />
                <span>Login</span>
              </button>
            )}

            {isAuthenticated && userRole !== 'customer' && (
              <div className="flex space-x-2">
                {roleItems.map((item) => {
                  const Icon = item.icon;
                  if (item.role !== userRole) return null;
                  return (
                    <button
                      key={item.id}
                      onClick={() => onPageChange(item.id)}
                      className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        currentPage === item.id
                          ? 'bg-green-100 text-green-700'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
    </nav>
  );
};

export default Navbar;