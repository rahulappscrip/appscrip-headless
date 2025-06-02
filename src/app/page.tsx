"use client";

import aipulse from "../assets/images/aipulse.webp";
import ctabg from "../assets/images/cta_bg.webp";
import ClientPagination from "../components/ClientPagination";
import Image from "next/image";
import HeroSubscribeForm from "../components/HeroSubscribeForm";
import { Suspense } from 'react';

export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  slug: string;
  
  acffields?: {
    sourceName?: string;
    sourceUrl?: string;
  };
  categories?: {
    nodes: { name: string }[];
  };
}

export default function Home() {
  // Hero Section (full width, before main)
  const heroSection = (
    <section
      className="w-full flex flex-col items-center justify-center mb-12"
      style={{ backgroundColor: "#00DBDB0F" }}
    >
      <Image
        src={typeof aipulse === "string" ? aipulse : aipulse.src}
        alt="AI Pulse by appscrip"
        width={1200}
        height={220}
        className="w-full max-w-5xl object-contain mb-6"
        style={{ minHeight: "180px" }}
        priority
      />
      <h2 className="text-xl font-semibold text-center mb-2 mt-4">
        Your trusted AI resource designed for
      </h2>
      <p className="text-center italic text-lg mb-6">
        <span className="font-normal">
          enthusiasts, <span className="font-semibold">developers</span>,
          business pros, and tech researchers.
        </span>
      </p>
      <HeroSubscribeForm />
    </section>
  );

  return (
    <>
      {heroSection}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Suspense fallback={<div className="text-center">Loading posts...</div>}>
          <ClientPagination />
        </Suspense>
        {/* CTA Section */}
        <section
          className="flex flex-col items-center justify-center mb-12 mt-12 bg-cover bg-center py-8"
          style={{
            backgroundImage: `url(${
              typeof ctabg === "string" ? ctabg : ctabg.src
            })`,
            height: '449px',
          }}
        >
          <h2 className="text-4xl font-semibold text-center text-white mb-2 mt-4">
            Need help implementing AI in your business?
          </h2>
          <p className="text-center italic text-lg mb-6 text-white">
          Book a free 30-minutes strategy call with our experts</p>
          <button className="bg-white text-black px-4 py-2 rounded-md">
          BOOK FREE CONSULTATION
          </button>
        </section>
      </main>
    </>
  );
}
