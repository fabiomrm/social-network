import styles from './styles.module.css';
import logoIcon from '../../assets/images/logo-icon.svg';
import dropdownIcon from '../../assets/images/dropdown-icon.svg';
import { UserPhoto } from '../UserPhoto';
import { useAuth } from '../../contexts/AuthContext';

export const Header = () => {
  const { logout } = useAuth();

  return (
    <div className={styles.container}>
      <img src={logoIcon} alt="logo" />
      <div>
        <UserPhoto small />
        <span>Nome</span>
        <img
          style={{ cursor: 'pointer' }}
          src={dropdownIcon}
          alt="seta dropdown"
          onClick={logout}
        />
      </div>
    </div>
  );
};
