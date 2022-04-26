import styles from './styles.module.css';

type Props = {
  icon?: any;
  children?: React.ReactNode;
  label: string;
  active?: boolean;
  badgeCount?: number;
  onClick?: () => void;
};

export const ButtonIconText = ({ icon, label, children, active, badgeCount, onClick }: Props) => {
  return (
    <div className={[styles.container, active ? styles.active : null].join(' ')} onClick={onClick}>
      <img src={icon ? icon : null} alt="" />
      {children ? children : null}
      <label>{label}</label>
      {badgeCount ? <span>{badgeCount}</span> : null}
    </div>
  );
};
