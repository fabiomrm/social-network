import styles from './styles.module.css';
import { UserPhoto } from '../UserPhoto';
import { Card } from '../Card';
import { useEffect, useState } from 'react';
import { useFetch } from '../../hooks/useFetch';

type Props = {
  onNewPost: () => void;
};

export const PostField = ({ onNewPost }: Props) => {
  const [text, setText] = useState('');

  const { request, response, error } = useFetch();
  const savePost = () => {
    if (text.trim().length > 0) {
      request('/api/v1/post', 'POST', { text });
    }
  };

  useEffect(() => {
    if (error) {
      console.log('Ocorreu um erro: ', error);
    } else {
      console.log('Post criado: ', response);
    }
  }, [response, error]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      savePost();
    }
  };

  return (
    <Card className={styles.container}>
      <UserPhoto />
      <input
        type="text"
        placeholder="No que você está pensando, Nome?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </Card>
  );
};
