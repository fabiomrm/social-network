import styles from './styles.module.css';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const Card = ({ children, className }: Props) => {
  return <div className={[styles.container, className || ''].join(' ')}>{children}</div>;
};
