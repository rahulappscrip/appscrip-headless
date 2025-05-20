'use client';

import type { Post } from '../app/page';
import { useState } from 'react';

// Client Pagination Component
export default function ClientPagination({ posts }: { posts: Post[] }) {
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 5;
    const totalPages = Math.ceil(posts.length / postsPerPage);
    const paginatedPosts = posts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);
  
    // Helper to strip HTML tags
    function stripHtml(html: string) {
      if (!html) return '';
      return html.replace(/<[^>]+>/g, '');
    }
  
    // Helper to limit text to a certain number of words
    function limitWords(text: string, maxWords: number) {
      const words = text.split(/\s+/);
      if (words.length <= maxWords) return text;
      return words.slice(0, maxWords).join(' ') + '...';
    }
  
    return (
      <>
        <section className="space-y-8">
          {paginatedPosts.map((post) => (
            <article key={post.id} className="border-b border-gray-200 pb-8 flex">
              <div className="flex-1">
                {post.categories?.nodes?.[0]?.name && (
                  <div
                    className="mb-2 uppercase"
                    style={{
                      fontFamily: 'Gilroy, sans-serif',
                      fontWeight: 700,
                      fontSize: '24px',
                      color: '#14b8a6', // Tailwind teal-600
                    }}
                  >
                    {post.categories.nodes[0].name}
                  </div>
                )}
                <h2
                  className="mb-2"
                  style={{
                    fontFamily: 'Gilroy, sans-serif',
                    fontWeight: 700,
                    fontSize: '32px',
                    color: '#334155', // Tailwind slate-700
                  }}
                >
                  {post.title}
                </h2>
                <div
                  className="mb-4 truncate"
                  style={{
                    fontFamily: 'Gilroy, sans-serif',
          
                    color: '#000',
                    fontSize: '20px',
                  }}
                  title={post.excerpt ? stripHtml(post.excerpt) : stripHtml(post.content)}
                >
                  {limitWords(
                    post.excerpt
                      ? stripHtml(post.excerpt)
                      : stripHtml(post.content),
                    10
                  )}
                </div>
                <div
                  className="mb-2"
                  style={{
                    fontFamily: 'Gilroy, sans-serif',
                    fontWeight: 400,
                    fontSize: '16px',
                    color: '#5B5B5B',
                  }}
                >
                  {new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
              </div>
              <div className="flex flex-col justify-end ml-8">
                <a
                  href={`/${post.slug}`}
                  className="w-8 h-8 flex items-center justify-center bg-black text-white rounded-sm hover:bg-gray-800 transition-colors"
                  aria-label={`Read more about ${post.title}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </section>
        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-8 space-x-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={`w-8 h-8 flex items-center justify-center bg-black text-white rounded-sm ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800 transition-colors'}`}
            aria-label="Previous page"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-8 h-8 flex items-center justify-center rounded-sm text-lg font-semibold ${currentPage === i + 1 ? 'bg-black text-white' : 'text-gray-500 hover:bg-gray-200'}`}
              aria-label={`Go to page ${i + 1}`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className={`w-8 h-8 flex items-center justify-center bg-black text-white rounded-sm ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800 transition-colors'}`}
            aria-label="Next page"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        {/* End Pagination Controls */}
      </>
    );
  }