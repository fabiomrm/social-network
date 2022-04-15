import styles from "./styles.module.css";
import logoIcon from "../../assets/images/logo-icon.svg";
import dropdownIcon from "../../assets/images/dropdown-icon.svg";
import { UserPhoto } from "../UserPhoto";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <img src={logoIcon} alt="logo" />
      <div>
        <UserPhoto small />
        <span>Nome</span>
        <img
          style={{ cursor: "pointer" }}
          src={dropdownIcon}
          alt="seta dropdown"
          onClick={() => navigate("/")}
        />
      </div>
    </div>
  );
};
