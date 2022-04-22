import { Comment as CommentType, User } from '../../types';
import { formatName } from '../../utils/name';
import { UserPhoto } from '../UserPhoto';
import styles from './styles.module.css';

type Props = {
  user: User;
  comment: CommentType;
};
export const Comment = ({ comment, user }: Props) => {
  return (
    <div className={styles.container}>
      <UserPhoto small />
      <div>
        <h2>{user && formatName(user)}</h2>
        <p>{comment && comment.text}</p>
      </div>
    </div>
  );
};
