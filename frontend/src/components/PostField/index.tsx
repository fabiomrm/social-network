import styles from "./styles.module.css";
import userIcon from "../../assets/images/user-icon.svg";
import { UserPhoto } from "../UserPhoto";
import { Card } from "../Card";
export const PostField = () => {
  return (
    <Card className={styles.container}>
      <UserPhoto />
      <input type="text" placeholder="No que você está pensando, Nome?" />
    </Card>
  );
};
