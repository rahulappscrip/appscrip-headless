'use client';

import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/assets/images/appscrip-logo.webp';
import { useState } from 'react';

const navigationItems = [
  {
    id: 'products',
    label: 'Products',
    path: '/products',
    hasDropdown: true,
    items: [
      { title: 'Super App', description: 'Launch your own All-In-One Super App like Grab and Gojek', path: '/products/super-app' },
      { title: 'Delivery Marketplace', description: 'Kickstart your on-demand delivery business', path: '/products/delivery' },
      { title: 'Healthcare Platforms', description: 'Launch your own doctor appointment booking app', path: '/products/healthcare' },
      { title: 'E-Commerce Marketplace', description: 'Launch your own e-commerce platform', path: '/products/ecommerce' },
      { title: 'Social Media', description: 'Launch your own social media app', path: '/products/social-media' },
      { title: 'Transportation Management', description: 'Digitally transform your logistics', path: '/products/transportation' }
    ]
  },
  {
    id: 'success-stories',
    label: 'Success Stories',
    path: '/success-stories',
  },
  {
    id: 'about',
    label: 'About',
    path: '/about',
    hasDropdown: true,
    items: [
      { title: 'About Us', description: 'Learn about our company', path: '/about-us' },
      { title: 'Careers', description: 'Join our team', path: '/careers' },
      { title: 'Blog', description: 'Read our latest updates', path: '/blog' },
      { title: 'News', description: 'Company announcements', path: '/news' }
    ]
  },
  {
    id: 'product-videos',
    label: 'Product Videos',
    path: '/product-videos',
  },
  {
    id: 'app-studio',
    label: 'App Studio',
    path: '/app-studio',
  },
  {
    id: 'blog',
    label: 'Blog',
    path: '/blog',
  }
];

export default function Header() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div role="banner" className="bg-[#32439B] text-white py-2">
        <p className="text-center">
          Now You Can Launch Your App With Easy Monthly Payment Options!
          <Link href="/pricing" className="ml-2 bg-[#FF4E78] px-3 py-1 rounded text-sm">
            LEARN MORE
          </Link>
        </p>
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex-shrink-0">
            <Image
              src={Logo}
              alt="Appscrip Logo"
              width={180}
              height={45}
              className="h-10 w-auto"
              priority
            />
          </Link>

          <ul className="hidden md:flex items-center space-x-6">
            {navigationItems.map((item) => (
              <li
                key={item.id}
                className="relative"
                onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.id)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.path}
                  className="text-gray-700 hover:text-[#32439B] px-2 py-2 text-sm font-medium inline-flex items-center"
                >
                  {item.label}
                  {item.hasDropdown && (
                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>

                {item.hasDropdown && activeDropdown === item.id && (
                  <div className="absolute top-full left-0 w-[600px] bg-white shadow-lg rounded-lg mt-2 p-6 grid grid-cols-2 gap-6">
                    {item.items?.map((subItem) => (
                      <Link
                        key={subItem.path}
                        href={subItem.path}
                        className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div>
                          <h3 className="font-medium text-gray-900">{subItem.title}</h3>
                          <p className="text-sm text-gray-500">{subItem.description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>

          <div className="flex items-center space-x-4">
            <Link 
              href="tel:+1234567890" 
              className="bg-[#32439B] text-white p-2 rounded-full"
              aria-label="Contact phone number"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="bg-[#2F9B47] hover:bg-[#268A3E] text-white px-6 py-2 rounded-full text-sm font-medium transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
} 