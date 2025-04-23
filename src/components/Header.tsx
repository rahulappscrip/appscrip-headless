'use client';

import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/assets/images/appscrip-logo.webp';
import { useState } from 'react';

const navigationItems = [
  {
    id: 'products',
    label: 'Products',
    path: 'https://appscrip.com/ios-android-clone-scripts/',
    hasDropdown: true,
    items: [
      { title: 'Super App', description: 'Launch your own All-In-One Super App like Grab and Gojek', path: 'https://appscrip.com/products/super-app/' },
      { title: 'Delivery Marketplace', description: 'Kickstart your on-demand delivery business', path: 'https://appscrip.com/products/delivery-marketplace/' },
      { title: 'Healthcare Platforms', description: 'Launch your own doctor appointment booking app', path: 'https://appscrip.com/products/healthcare-platforms/' },
      { title: 'E-Commerce Marketplace', description: 'Launch your own e-commerce platform', path: 'https://appscrip.com/products/ecommerce-marketplace/' },
      { title: 'Social Media', description: 'Launch your own social media app', path: 'https://appscrip.com/products/social-media/' },
      { title: 'Transportation Management', description: 'Digitally transform your logistics', path: 'https://appscrip.com/products/transportation-management/' }
    ]
  },
  {
    id: 'success-stories',
    label: 'Success Stories',
    path: 'https://appscrip.com/success-stories/',
  },
  {
    id: 'about',
    label: 'About',
    path: 'https://appscrip.com/about/',
    hasDropdown: true,
    items: [
      { title: 'About Us', description: 'Learn about our company', path: 'https://appscrip.com/about/' },
      { title: 'Careers', description: 'Join our team', path: 'https://appscrip.com/careers/' },
      { title: 'Blog', description: 'Read our latest updates', path: 'https://appscrip.com/blog/' },
      { title: 'News', description: 'Company announcements', path: 'https://appscrip.com/appscrip-news/' }
    ]
  },
  {
    id: 'product-videos',
    label: 'Product Videos',
    path: 'https://appscrip.com/demo-video/',
  },
  {
    id: 'app-studio',
    label: 'App Studio',
    path: 'https://appscrip.com/app-source-code/',
  },
  {
    id: 'blog',
    label: 'Blog',
    path: 'https://appscrip.com/blog/',
  }
];

export default function Header() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div role="banner" className="bg-[#32439B] text-white py-2">
        <p className="text-center">
          Now You Can Launch Your App With Easy Monthly Payment Options!
          <Link 
            href="/pricing" 
            className="ml-2 bg-[#FF4E78] px-3 py-1 rounded text-sm"
            aria-label="Learn more about our monthly payment options"
          >
            LEARN MORE
          </Link>
        </p>
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4" aria-label="Main navigation">
        <div className="flex items-center justify-between">
          <Link 
            href="/" 
            className="flex-shrink-0"
            aria-label="Appscrip - Return to homepage"
          >
            <Image
              src={Logo}
              alt="Appscrip Logo"
              width={180}
              height={45}
              className="h-10 w-auto"
              priority
            />
          </Link>

          <ul className="hidden md:flex items-center space-x-6" role="list">
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
                  aria-label={`${item.label}${item.hasDropdown ? ' - Click to view more options' : ''}`}
                  aria-expanded={item.hasDropdown ? activeDropdown === item.id : undefined}
                  aria-haspopup={item.hasDropdown ? 'true' : undefined}
                >
                  {item.label}
                  {item.hasDropdown && (
                    <svg 
                      className="ml-1 w-4 h-4" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>

                {item.hasDropdown && activeDropdown === item.id && (
                  <div 
                    className="absolute top-full left-0 w-[600px] bg-white shadow-lg rounded-lg mt-2 p-6 grid grid-cols-2 gap-6"
                    role="menu"
                    aria-label={`${item.label} submenu`}
                  >
                    {item.items?.map((subItem) => (
                      <Link
                        key={subItem.path}
                        href={subItem.path}
                        className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                        role="menuitem"
                        aria-label={`${subItem.title} - ${subItem.description}`}
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
              href="tel:+919902019342" 
              className="bg-[#32439B] text-white p-2 rounded-full"
              aria-label="Call us at +91 99020 19342"
            >
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </Link>
            <Link
              href="https://appscrip.com/contact-us/"
              className="bg-[#2F9B47] hover:bg-[#268A3E] text-white px-6 py-2 rounded-full text-sm font-medium transition-colors"
              aria-label="Contact us - Get in touch with our team"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
} 