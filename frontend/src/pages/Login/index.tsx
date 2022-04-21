import { Modal } from '../../components/Modal';
import { Button } from '../../components/Button';
import styles from './styles.module.css';
import { Input } from '../../components/Input';
import { useState } from 'react';
import { ContextualHelp } from '../../components/ContextualHelp';
import { Select } from '../../components/Select';
import { Link } from 'react-router-dom';
import { days, months, years } from '../../utils/date';
import { useForm } from 'react-hook-form';

import { useAuth } from '../../contexts/AuthContext';
import { User } from '../../types';

export const Login = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [day, setDay] = useState<string | number>('');
  const [month, setMonth] = useState<string | number>('');
  const [year, setYear] = useState<string | number>('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { register, handleSubmit } = useForm();

  const { login, signUp, error } = useAuth();

  const handleSignIn = async (data: any) => {
    setErrorMessage('');
    if (data.email && data.password) {
      await login(data);
    } else {
      setErrorMessage('Preencha suas credenciais');
    }
  };

  const handleSignUp = async (data: any) => {
    const user: User = { ...data };
    user.birthdate = `${day}/${month}/${year}`;
    setErrorMessage('');
    if (user.name && user.surname && user.email && user.password) {
      const success = await signUp(user);
      if (success) {
        setSuccessMessage('Cadastro feito com sucesso!');
        setModalOpen(false);
      } else {
        setErrorMessage('Preencha suas credenciais');
      }
    }
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const getCurrentMonthShort = () => {
    const month = new Date().toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '');

    return month.charAt(0).toUpperCase() + month.slice(1);
  };

  return (
    <div className={styles.page}>
      <div className={styles.box}>
        <div className={styles.description}>
          <h1>rede social</h1>
          <p>Conecte-se com ideias e compartilhe suas ideias</p>
        </div>
        <div className={styles.form}>
          <form onSubmit={handleSubmit(handleSignIn)}>
            <Input type="email" placeholder="Email" register={register} name="email" />
            <Input type="password" placeholder="Senha" register={register} name="password" />
            <Button fullWidth type="submit">
              Entrar
            </Button>
            {(!isModalOpen && (errorMessage || error)) ?? <div>{errorMessage || error}</div>}
          </form>
          <Link to="#">Esqueceu a senha?</Link>
          <hr />
          <Button secondary onClick={handleOpenModal}>
            Criar nova conta
          </Button>
        </div>
      </div>
      <footer>
        <p>FMRM Rede Social</p>
      </footer>
      <Modal
        title="Cadastre-se"
        subtitle="É rápido e fácil"
        visible={isModalOpen}
        onClose={handleCloseModal}
      >
        <form className={styles.modalForm} onSubmit={handleSubmit(handleSignUp)}>
          <div className={styles.modalFormName}>
            <Input type="text" placeholder="Nome" register={register} name="name" />
            <div />
            <Input type="text" placeholder="Sobrenome" register={register} name="surname" />
          </div>
          <div className={styles.modalFormEmail}>
            <Input type="email" placeholder="Email" register={register} name="email" />
            <Input type="password" placeholder="Senha" register={register} name="password" />
            <div className={styles.modalFormBirthdate}>
              <div className={styles.modalFormBirthdateLabel}>
                <label>Data de Nascimento:</label>
                <ContextualHelp>
                  Ao informar sua data de nascimento, você ajuda a garantir que a sua experiência na
                  Rede Social seja adequada à sua idade.
                </ContextualHelp>
              </div>
              <div className={styles.modalFormBirthdateSelects}>
                <Select
                  options={days}
                  defaultValue={String(new Date().getDate())}
                  onSelected={setDay}
                />
                <div />
                <Select
                  options={months}
                  defaultValue={getCurrentMonthShort()}
                  onSelected={setMonth}
                />
                <div />
                <Select options={years} onSelected={setYear} defaultValue={years[0].toString()} />
              </div>
            </div>
            {(isModalOpen && (errorMessage || error)) ?? <div>{errorMessage || error}</div>}
            <Button type="submit" secondary>
              Criar nova conta
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
