import { ButtonIconText } from '../ButtonIconText';
import { Card } from '../Card';
import { UserPhoto } from '../UserPhoto';
import { Comment } from '../../components/Comment';
import styles from './styles.module.css';
import likeIcon from '../../assets/images/like-icon.svg';
import commentIcon from '../../assets/images/comment-icon.svg';
import { PostType } from '../../types';
import { formatDate } from '../../utils/date';
import { formatName } from '../../utils/name';
import React, { useEffect, useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { useForm } from 'react-hook-form';

type Props = {
  post: PostType;
  onPostUpdated: (post: PostType) => void;
};

export const Post = ({ post, onPostUpdated }: Props) => {
  const [commentText, setCommentText] = useState('');
  const { request, response, error, clear } = useFetch();

  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    if (error) {
      clear();
      console.log(error);
    } else if (response) {
      clear();
      onPostUpdated(post);
    }
  }, [response, error, onPostUpdated, post, clear]);

  const handleSubmitComment = (data: any) => {
    data.postId = post.id;
    request('/api/v1/comment', 'POST', data);
    setValue('text', '');
  };

  return (
    <Card className={styles.container}>
      <div className={styles.userData}>
        <UserPhoto />
        <div>
          <h2>{post.user && formatName(post.user)}</h2>
          <span>{formatDate(post.createdAt)}</span>
        </div>
      </div>
      <div className={styles.textArea}>
        <p>{post.text}</p>
      </div>
      <hr />
      <div className={styles.buttonLikeCommentArea}>
        <ButtonIconText icon={likeIcon} label="Curtir" />
        <ButtonIconText icon={commentIcon} label="Comentar" />
      </div>
      <hr />
      {post.comments.map((comment) => (
        <Comment key={`comment-${comment.id}`} comment={comment} user={post.user} />
      ))}
      <div>
        <form onSubmit={handleSubmit(handleSubmitComment)} className={styles.commentContainer}>
          <UserPhoto />
          <input type="text" placeholder="Digite um comentário" {...register('text')} />
        </form>
      </div>
    </Card>
  );
};
