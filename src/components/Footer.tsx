'use client';

import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/assets/images/appscrip-logo.webp';

const footerLinks = {
  company: [
    { label: 'About Us', href: 'https://www.appscrip.com/about-us' },
    { label: 'Careers', href: 'https://www.appscrip.com/careers' },
    { label: 'Blog', href: 'https://www.appscrip.com/blog' },
    { label: 'News', href: 'https://www.appscrip.com/news' },
  ],
  products: [
    { label: 'Super App', href: 'https://www.appscrip.com/products/super-app' },
    { label: 'Delivery Marketplace', href: 'https://www.appscrip.com/products/delivery' },
    { label: 'Healthcare Platforms', href: 'https://www.appscrip.com/products/healthcare' },
    { label: 'E-Commerce Marketplace', href: 'https://www.appscrip.com/products/ecommerce' },
  ],
  solutions: [
    { label: 'Social Media', href: 'https://www.appscrip.com/solutions/social-media' },
    { label: 'Transportation Management', href: 'https://www.appscrip.com/solutions/transportation' },
    { label: 'App Studio', href: 'https://www.appscrip.com/solutions/app-studio' },
    { label: 'Product Videos', href: 'https://www.appscrip.com/solutions/product-videos' },
  ],
  companyLinks: [
    { label: 'Contact Us', href: 'https://www.appscrip.com/contact' },
    { label: 'Privacy Policy', href: 'https://www.appscrip.com/privacy-policy' },
    { label: 'Terms of Service', href: 'https://www.appscrip.com/terms-of-service' },
    { label: 'Success Stories', href: 'https://www.appscrip.com/success-stories' },
  ],
};

const socialLinks = [
  { label: 'Facebook', href: 'https://www.facebook.com/appscrip', icon: 'facebook' },
  { label: 'Twitter', href: 'https://twitter.com/appscrip', icon: 'twitter' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/appscrip', icon: 'linkedin' },
  { label: 'Instagram', href: 'https://www.instagram.com/appscrip', icon: 'instagram' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link href="https://www.appscrip.com" className="block mb-4">
              <Image
                src={Logo}
                alt="Appscrip Logo"
                width={180}
                height={45}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-gray-400 mb-4">
              Empowering businesses with innovative mobile solutions and digital transformation services.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={`Follow us on ${social.label}`}
                >
                  <span className="sr-only">{social.label}</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    {/* Add appropriate SVG path based on social.icon */}
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Products</h2>
            <ul className="space-y-2">
              {footerLinks.products.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Solutions</h2>
            <ul className="space-y-2">
              {footerLinks.solutions.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Company</h2>
            <ul className="space-y-2">
              {footerLinks.companyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Appscrip. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="https://www.appscrip.com/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="https://www.appscrip.com/terms-of-service"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 