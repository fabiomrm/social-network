import styles from "./styles.module.css";
import { Header } from "../../components/Header";
import { PostField } from "../../components/PostField";
import { Post } from "../../components/Post";

export const Feed = () => {
  return (
    <div>
      <Header />
      <div className={styles.feedContainer}>
        <PostField />
        <Post />
      </div>
    </div>
  );
};
