"use client";

import type { Post } from "../app/page";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

// GraphQL query (as a string)
const GET_POSTS_QUERY = `
  query GetPosts {
    posts {
      nodes {
        id
        title
        excerpt
        content
        date
        slug
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
`;

// Fetcher function using the native fetch API
async function fetchPosts(): Promise<Post[]> {
  const graphqlEndpoint = 'https://wordpress-1336774-5410140.cloudwaysapps.com/graphql'; // Replace with your actual GraphQL endpoint

  const response = await fetch(graphqlEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: GET_POSTS_QUERY }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result = await response.json();

  if (result.errors) {
    console.error("GraphQL Errors:", result.errors);
    throw new Error(result.errors[0].message);
  }

  return result?.data?.posts?.nodes || [];
}

// Client Pagination Component
export default function ClientPagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  const { data: posts, isLoading, isError, error } = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    refetchInterval: 5000,
  });

  // Handle loading and error states
  if (isLoading) {
    return <div className="text-center">Loading posts...</div>;
  }

  if (isError) {
    return (
      <div
        role="alert"
        className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded"
      >
        Error loading posts: {error instanceof Error ? error.message : 'An unknown error occurred'}
        <small className="block mt-2">
          Please check your WordPress GraphQL endpoint configuration and network connection.
        </small>
      </div>
    );
  }

  // Use the fetched posts for pagination
  const totalPages = posts ? Math.ceil(posts.length / postsPerPage) : 0;
  const paginatedPosts = posts ? posts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  ) : [];

  if (!posts || posts.length === 0) {
    return (
      <div
        role="alert"
        className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded"
      >
        No posts found.
        <small className="block mt-2">
          Make sure you have published posts in your WordPress site.
        </small>
      </div>
    );
  }

  return (
    <>
      <section className="space-y-8">
        {paginatedPosts.map((post) => (
          <article
            key={post.id}
            className="flex flex-col mb-8"
          >
            {/* Date and Source */}
            <div className="flex items-center text-xs text-teal-600 mb-2">
              <span>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              {post.acffields?.sourceName && (
                <>
                  <span className="mx-2">·</span>
                  {post.acffields.sourceUrl ? (
                    <a
                      href={post.acffields.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-teal-800 transition-colors"
                    >
                      {post.acffields.sourceName}
                    </a>
                  ) : (
                    <span>{post.acffields.sourceName}</span>
                  )}
                </>
              )}
            </div>

            {/* Title */}
            <h2 className="mb-2 font-bold text-2xl text-gray-900">
              {post.title}
            </h2>

            {/* Content Container */}
            <div className="bg-gray-50 rounded-md p-6 mb-2 flex flex-col min-h-[120px]">
              <div
                className="text-base text-gray-800 flex-1"
                style={{
                  fontFamily: "Gilroy, sans-serif",
                  fontSize: "18px",
                }}
                dangerouslySetInnerHTML={{
                  __html: post.excerpt ? post.excerpt : post.content
                }}
              />
              {post.acffields?.sourceUrl && (
                <div className="flex justify-end mt-4">
                  <a
                    href={post.acffields.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-black text-white rounded-md font-semibold hover:bg-gray-800 transition-colors shadow"
                    aria-label={`Go to source: ${post.acffields.sourceName}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5 ml-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          </article>
        ))}
      </section>
      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-8 space-x-2">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className={`w-8 h-8 flex items-center justify-center bg-black text-white rounded-sm ${
            currentPage === 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-800 transition-colors"
          }`}
          aria-label="Previous page"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`w-8 h-8 flex items-center justify-center rounded-sm text-lg font-semibold ${
              currentPage === i + 1
                ? "bg-black text-white"
                : "text-gray-500 hover:bg-gray-200"
            }`}
            aria-label={`Go to page ${i + 1}`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className={`w-8 h-8 flex items-center justify-center bg-black text-white rounded-sm ${
            currentPage === totalPages
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-800 transition-colors"
          }`}
          aria-label="Next page"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
      {/* End Pagination Controls */}
    </>
  );
}