import Layout from '../components/Layout';
import { load } from 'outstatic/server';
import ContentGrid from '../components/ContentGrid';
import markdownToHtml from '../lib/markdownToHtml';

export default async function Index() {
  const { allPosts } = await getData();

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-5">
        {allPosts.length > 0 && (
          <ContentGrid
            title="Posts"
            items={allPosts}
            collection="posts"
            priority
          />
        )}
      </div>
    </Layout>
  );
}

async function getData() {
  const db = await load();

  const allPosts = await db
    .find({ collection: 'posts' }, [
      'title',
      'publishedAt',
      'slug',
      'coverImage',
      'description',
      'tags',
    ])
    .sort({ publishedAt: -1 })
    .toArray();

  return {
    allPosts,
  };
}
