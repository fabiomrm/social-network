import { FieldValues, UseFormRegister } from 'react-hook-form';
import styles from './styles.module.css';

type Props = {
  placeholder?: string;
  type?: string;
  className?: string;
  register?: UseFormRegister<FieldValues>;
  name?: string;
};
export const Input = ({ className, placeholder, type, register, name }: Props) => {
  const registerProps = register && name ? { ...register(name) } : {};
  return (
    <input
      {...registerProps}
      className={[styles.input, className || ''].join(' ')}
      placeholder={placeholder}
      type={type}
    />
  );
};
