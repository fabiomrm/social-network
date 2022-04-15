import { ButtonIconText } from "../ButtonIconText";
import { Card } from "../Card";
import { UserPhoto } from "../UserPhoto";
import { Comment } from "../../components/Comment";
import styles from "./styles.module.css";
import likeIcon from "../../assets/images/like-icon.svg";
import commentIcon from "../../assets/images/comment-icon.svg";

export const Post = () => {
  return (
    <Card className={styles.container}>
      <div className={styles.userData}>
        <UserPhoto />
        <div>
          <h2>Nome do Usuário</h2>
          <span>Ontem às 19:19</span>
        </div>
      </div>
      <div className={styles.textArea}>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam
          tempora impedit doloribus veritatis suscipit saepe, sint reiciendis.
          Quasi fugiat amet, necessitatibus pariatur porro dolorum aliquam
          praesentium debitis nostrum accusantium maiores!
        </p>
      </div>
      <hr />
      <div className={styles.buttonLikeCommentArea}>
        <ButtonIconText icon={likeIcon} label="Curtir" />
        <ButtonIconText icon={commentIcon} label="Comentar" />
      </div>
      <hr />
      <Comment />
    </Card>
  );
};
