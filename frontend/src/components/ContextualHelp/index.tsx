import styles from './styles.module.css';

import questionIcon from '../../assets/images/question-image.png';
import { useEffect, useRef, useState } from 'react';

type Props = {
  children: React.ReactNode;
};
export const ContextualHelp = ({ children }: Props) => {
  const [ishelpVisible, setIsHelpVisbile] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);

  const handleCLickOutside = (event: any) => {
    if (componentRef.current && !componentRef.current.contains(event.target)) {
      setIsHelpVisbile(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleCLickOutside);
    return () => {
      document.removeEventListener('mousedown', handleCLickOutside);
    };
  }, []);
  return (
    <div ref={componentRef} className={styles.container}>
      <img src={questionIcon} onClick={() => setIsHelpVisbile(true)} />
      {ishelpVisible && <div>{children}</div>}
    </div>
  );
};
