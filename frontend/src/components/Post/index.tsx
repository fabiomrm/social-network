import { ButtonIconText } from '../ButtonIconText';
import { Card } from '../Card';
import { UserPhoto } from '../UserPhoto';
import { Comment } from '../../components/Comment';
import styles from './styles.module.css';
import likeIcon from '../../assets/images/like-icon.svg';
import commentIcon from '../../assets/images/comment-icon.svg';
import { PostType } from '../../types';

type Props = {
  post: PostType;
};

export const Post = ({ post }: Props) => {
  return (
    <Card className={styles.container}>
      <div className={styles.userData}>
        <UserPhoto />
        <div>
          <h2>Nome do Usuário</h2>
          <span>{String(post.createdAt)}</span>
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
      <Comment />
    </Card>
  );
};
