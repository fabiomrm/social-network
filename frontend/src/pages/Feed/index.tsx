import styles from './styles.module.css';
import { Header } from '../../components/Header';
import { PostField } from '../../components/PostField';
import { Post } from '../../components/Post';
import { useCallback, useEffect, useState } from 'react';
import { PostType } from '../../types';
import { useFetch } from '../../hooks/useFetch';

type FeedResponse = {
  posts: PostType[];
};

export const Feed = () => {
  const [initialRequest, setInitialRequest] = useState(true);
  const [posts, setPosts] = useState<PostType[]>([]);

  const { request, response, error } = useFetch<FeedResponse>();

  const updatePostList = useCallback(() => {
    request('/api/v1/post', 'GET');
  }, [request]);

  useEffect(() => {
    if (error) {
      console.log('updatePost error: ' + error);
    } else if (response) {
      setPosts(response.posts);
      console.log(response.posts);
    }
  }, [error, response]);

  useEffect(() => {
    if (initialRequest) {
      updatePostList();
    }
  }, [initialRequest, updatePostList]);

  return (
    <div>
      <Header />
      <div className={styles.feedContainer}>
        <PostField onNewPost={updatePostList} />
        {posts.map((post) => (
          <Post key={`post-item-${post.id}`} post={post} />
        ))}
      </div>
    </div>
  );
};
