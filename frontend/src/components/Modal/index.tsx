import styles from "./styles.module.css";
import iconClose from "../../assets/images/close-image.png";

type Props = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  visible: boolean;
  onClose: () => void;
};
export const Modal = ({
  title,
  subtitle,
  children,
  visible,
  onClose,
}: Props) => {
  return visible ? (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.boxTitle}>
          <h1>{title}</h1>
          <img src={iconClose} alt="fechar modal" onClick={onClose} />
        </div>
        {subtitle && <div>{subtitle}</div>}
        <hr />
        <div>{children}</div>
      </div>
    </div>
  ) : null;
};
