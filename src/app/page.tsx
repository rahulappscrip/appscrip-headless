"use client";
import { gql } from "@apollo/client";
import client from "../lib/apolloClient";
import aipulse from "../assets/images/aipulse.webp";
import ctabg from "../assets/images/cta_bg.webp";
import ClientPagination from "../components/ClientPagination";
import TopAIVoices from "../components/TopAIVoices";
import Image from "next/image";

export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  slug: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
  categories?: {
    nodes: {
      name: string;
    }[];
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

  if (error) {
    return (
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
    );
  }

  if (posts.length === 0) {
    return (
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
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center mb-12">
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
        <form className="flex flex-col items-center w-full max-w-xl mx-auto mb-2">
          <div className="flex w-full">
            <input
              type="email"
              placeholder="enter your email address"
              className="flex-grow rounded-l-md border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-gray-50 text-gray-800"
              required
            />
            <button
              type="submit"
              className="rounded-r-md bg-black text-white px-8 py-3 font-semibold hover:bg-gray-800 transition-colors"
            >
              Subscribe
            </button>
          </div>
          <label className="flex items-center mt-3 text-gray-500 text-sm">
            <input type="checkbox" className="mr-2" />
            Stay ahead of AI trends with our weekly updates to your inbox
          </label>
        </form>
      </section>
      {/* End Hero Section */}
      <ClientPagination posts={posts} />
      <TopAIVoices />
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
  );
}
