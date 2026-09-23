import PostView from '@/app/(private)/urd/post/_components/view';
import { getPostBySlug } from '@/lib/api/post.api';
import axios from 'axios';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

async function loadPost(slug: string) {
  try {
    return await getPostBySlug(slug);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) notFound();

    throw error;
  }
}

async function SinglePostPage(props: Props) {
  const { slug } = await props.params;
  const response = await loadPost(slug);

  if (!response.data) notFound();

  return <PostView post={response.data} />;
}

export default SinglePostPage;