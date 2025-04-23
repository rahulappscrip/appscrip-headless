import { gql } from '@apollo/client';
import client from '../lib/apolloClient';

interface Post {
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
    }
  }
}

interface PostsData {
  posts: {
    nodes: Post[];
  };
}

async function getPosts(): Promise<Post[]> {
  try {
    console.log('Fetching posts from GraphQL endpoint...');
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
              slug
              featuredImage {
                node {
                  sourceUrl
                  altText
                }
              }
            }
          }
        }
      `,
    });

    if (errors) {
      console.error('GraphQL Errors:', errors);
      throw new Error(errors[0].message);
    }

    if (!data?.posts?.nodes) {
      console.error('No posts data returned');
      throw new Error('No posts found');
    }

    console.log('Successfully fetched posts:', data.posts.nodes.length);
    return data.posts.nodes;
  } catch (error) {
    console.error('Error fetching posts:', error);
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
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div 
          role="alert" 
          className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded"
        >
          Error loading posts: {error.message}
          <small className="block mt-2">Please check your WordPress GraphQL endpoint configuration.</small>
        </div>
      </main>
    );
  }

  if (posts.length === 0) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div 
          role="alert" 
          className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded"
        >
          No posts found.
          <small className="block mt-2">Make sure you have published posts in your WordPress site.</small>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Latest Blog Posts</h1>
      <section className="space-y-8">
        {posts.map((post) => (
          <article key={post.id} className="border-b border-gray-200 pb-8">
            {post.featuredImage && (
              <img
                src={post.featuredImage.node.sourceUrl}
                alt={post.featuredImage.node.altText || post.title}
                className="w-full h-64 object-cover rounded-lg mb-4"
                loading="lazy"
              />
            )}
            <header>
              <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
              <time 
                dateTime={post.date}
                className="text-sm text-gray-500"
              >
                Published on {new Date(post.date).toLocaleDateString()}
              </time>
            </header>
            <section 
              className="text-gray-600 my-4"
              dangerouslySetInnerHTML={{ __html: post.excerpt }}
            />
            <footer className="text-sm text-gray-500">
              Permalink: {post.slug}
            </footer>
          </article>
        ))}
      </section>
    </main>
  );
}
