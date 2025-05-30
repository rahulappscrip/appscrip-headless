"use client";
import { gql } from "@apollo/client";
import client from "../lib/apolloClient";
import aipulse from "../assets/images/aipulse.webp";
import ctabg from "../assets/images/cta_bg.webp";
import ClientPagination from "../components/ClientPagination";
import Image from "next/image";
import HeroSubscribeForm from "../components/HeroSubscribeForm";

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


interface PostsData {
  posts: {
    nodes: Post[];
  };
}

async function getPosts(): Promise<Post[]> {
  try {
    console.log("Fetching posts from GraphQL endpoint...");
    const { data, errors } = await client.query<PostsData>({
      query: gql`
        query GetPosts {
          posts {
            nodes {
              id
              title
              excerpt
              content
              date
              acffields {
                sourceName
                sourceUrl
              }
              categories(first: 1) {
                nodes {
                  name
                }
              }
            }
          }
        }
      `,
    });

    if (errors) {
      console.error("GraphQL Errors:", errors);
      throw new Error(errors[0].message);
    }

    if (!data?.posts?.nodes) {
      console.error("No posts data returned");
      throw new Error("No posts found");
    }

    console.log("Successfully fetched posts:", data.posts.nodes.length);
    return data.posts.nodes;
  } catch (error) {
    console.error("Error fetching posts:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to fetch posts: ${error.message}`);
    }
    throw error;
  }
}

export default async function Home() {
  let posts: Post[] = [];
  let error: Error | null = null;
  try {
    posts = await getPosts();
  } catch (e) {
    error = e as Error;
  }

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

  if (error) {
    return (
      <>
        {heroSection}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div
            role="alert"
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded"
          >
            Error loading posts: {error.message}
            <small className="block mt-2">
              Please check your WordPress GraphQL endpoint configuration.
            </small>
          </div>
        </main>
      </>
    );
  }

  if (posts.length === 0) {
    return (
      <>
        {heroSection}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div
            role="alert"
            className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded"
          >
            No posts found.
            <small className="block mt-2">
              Make sure you have published posts in your WordPress site.
            </small>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      {heroSection}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ClientPagination posts={posts} />
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
