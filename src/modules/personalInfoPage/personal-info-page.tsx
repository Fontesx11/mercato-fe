'use client';

import { Award, CreditCard, Gift, Package, Shield, User } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function PersonalInfoPage() {
  const [activeMenuItem, setActiveMenuItem] = useState(0);

  // Data structures
  const menuItems = [
    { icon: User, label: 'Personal info', active: true },
    { icon: Shield, label: 'Login and security', active: false },
    { icon: CreditCard, label: 'My payments', active: false },
    { icon: Gift, label: 'My voucher', active: false },
    { icon: Award, label: 'My points', active: false },
    { icon: Package, label: 'My orders', active: false },
  ];

  const navigationItems = ['Início', 'Produtos', 'Blog', 'Programa', 'Contato', 'Mais'];

  const footerSections = [
    {
      title: 'Sweetdeli',
      items: [
        'Contato',
        'sac@mercadoonline.com',
        '+55 81 92345-0394',
        '123 Rua, Pernambuco, Brasil',
      ],
    },
    {
      title: 'Outros sites',
      items: [
        'Contato',
        'sac@mercadoonline.com',
        '+55 81 92345-0394',
        '123 Rua, Pernambuco, Brasil',
      ],
    },
    {
      title: 'Sobre a',
      items: [
        'Contato',
        'sac@mercadoonline.com',
        '+55 81 92345-0394',
        '123 Rua, Pernambuco, Brasil',
      ],
    },
    {
      title: 'Get the app',
      items: [
        'Contato',
        'sac@mercadoonline.com',
        '+55 81 92345-0394',
        '123 Rua, Pernambuco, Brasil',
      ],
    },
  ];

  const formFields = ['Display name', 'First name', 'Phone', 'Email'];

  return (
    <div className="bg-yellow-100 min-h-screen">
      {/* Header Section */}

      {/* Main Content Section */}
      <main className="container mx-auto px-4 py-8 flex gap-6">
        {/* Sidebar Menu */}
        <Card className="w-fit flex-shrink-0 bg-yellow-100 shadow-lg h-fit">
          <CardContent className="p-6">
            <nav className="space-y-2">
              {menuItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={index}
                    onClick={() => setActiveMenuItem(index)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer transition-colors ${
                      item.active
                        ? 'bg-yellow-200 text-gray-900 font-medium'
                        : 'text-gray-600 hover:bg-yellow-200 hover:text-gray-900'
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="text-sm">{item.label}</span>
                  </div>
                );
              })}
            </nav>
          </CardContent>
        </Card>

        {/* Main Form Content */}
        <Card className="flex-1 bg-yellow-100 shadow-lg">
          <CardContent className="p-8">
            {/* Form Header */}
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-semibold text-gray-900">Personal Information</h1>
              <a href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View profile
              </a>
            </div>

            {/* Account Info Section */}
            <h2 className="text-lg font-medium text-gray-900 mb-6">Account info</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {formFields.map((label) => (
                <div key={label}>
                  <Label className="block text-sm font-medium text-gray-700 mb-2">{label}</Label>
                  <Input
                    className="w-full px-4 py-3 bg-yellow-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={label}
                  />
                </div>
              ))}
            </div>

            {/* Address Field */}
            <div className="mb-8">
              <Label className="block text-sm font-medium text-gray-700 mb-2">Your address</Label>
              <Input className="w-full px-4 py-3 bg-yellow-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>

            {/* Social Section */}
            <h2 className="text-lg font-medium text-gray-900 mb-6">Social</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">Website</Label>
                <Input
                  className="w-full px-4 py-3 bg-yellow-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your site URL"
                />
              </div>
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">Twitter</Label>
                <Input
                  className="w-full px-4 py-3 bg-yellow-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="@twitter username"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4">
              <Button className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium">
                Update profile
              </Button>
              <Button
                variant="ghost"
                className="px-6 py-3 text-gray-600 hover:text-gray-900 transition-colors font-medium"
              >
                Clear all
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer Section */}
    </div>
  );
}
