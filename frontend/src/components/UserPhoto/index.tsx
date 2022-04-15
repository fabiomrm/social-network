import styles from "./styles.module.css";
import userPhoto from "../../assets/images/user-icon.svg";

type Props = {
  small?: boolean;
};

export const UserPhoto = ({ small }: Props) => {
  return (
    <img
      className={small ? styles.userPhotoSmall : styles.userPhoto}
      src={userPhoto}
      alt=""
    />
  );
};
