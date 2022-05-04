import { useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';

type Props = {
  icon?: any;
  children?: React.ReactNode;
  label: string;
  active?: boolean;
  badgeCount?: number;
  list?: string[];
  onClick?: () => void;
};

export const ButtonIconText = ({
  icon,
  label,
  children,
  active,
  badgeCount,
  list,
  onClick
}: Props) => {
  const [showList, setShowList] = useState<boolean>(false);
  const componentRef = useRef<HTMLSpanElement>(null);

  const handleMouseOver = (event: any) => {
    if (componentRef.current && !componentRef.current.contains(event.target)) {
      setShowList(true);
    } else {
      setShowList(false);
    }
  };

  useEffect(() => {}, []);

  return (
    <div className={[styles.container, active ? styles.active : null].join(' ')} onClick={onClick}>
      <img src={icon ? icon : null} alt="" />
      {children ? children : null}
      <label>{label}</label>
      <div>
        {badgeCount ? <span ref={componentRef}>{badgeCount}</span> : null}
        {list && (
          <div className={styles.badgeListItems}>
            {list?.map((item, index) => (
              <div key={`like-badge-list-item-${index}`}>{item}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
