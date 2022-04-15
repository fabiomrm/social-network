import styles from "./styles.module.css";

type Props = {
  icon: any;
  label: string;
};

export const ButtonIconText = ({ icon, label }: Props) => {
  return (
    <div className={styles.container}>
      <img src={icon} alt="" />
      <label>{label}</label>
    </div>
  );
};
