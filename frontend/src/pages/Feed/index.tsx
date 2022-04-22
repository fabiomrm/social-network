import styles from './styles.module.css';
import { Header } from '../../components/Header';
import { PostField } from '../../components/PostField';
import { Post } from '../../components/Post';
import { useCallback, useEffect, useState } from 'react';
import { PostType } from '../../types';
import { useFetch } from '../../hooks/useFetch';

type FeedResponse = {
  posts: PostType[];
  post?: PostType;
};

export const Feed = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const { request, response, error, clear } = useFetch<FeedResponse>();

  const updatePostList = useCallback(() => {
    request('/api/v1/post', 'GET');
  }, [request]);

  const updatePost = async (post: PostType) => {
    request(`/api/v1/post/${post.id}`);
  };

  useEffect(() => {
    if (error) {
      console.log('updatePost error: ' + error);
    } else if (response) {
      if (response.posts) {
        setPosts(response.posts);
      } else if (response.post) {
        const post = posts.find((p) => p.id === response.post?.id);
        if (post) {
          const index = posts.indexOf(post);
          setPosts((prevPosts) => {
            return prevPosts.splice(index, 1, response.post as PostType);
          });
        }
      }
    }
    clear();
  }, [error, response, posts, clear]);

  useEffect(() => {
    updatePostList();
  }, [updatePostList]);

  return (
    <div>
      <Header />
      <div className={styles.feedContainer}>
        <PostField onNewPost={updatePostList} />
        {posts.map((post) => (
          <Post key={`post-item-${post.id}`} post={post} onPostUpdated={updatePost} />
        ))}
      </div>
    </div>
  );
};
