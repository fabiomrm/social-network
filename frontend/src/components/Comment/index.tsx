import { UserPhoto } from '../UserPhoto';
import styles from './styles.module.css';

export const Comment = () => {
  return (
    <div className={styles.container}>
      <UserPhoto small />
      <div>
        <h2>Nome Usuário</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, est.</p>
      </div>
    </div>
  );
};
