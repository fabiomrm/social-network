import styles from "./styles.module.css";

type Props = {
  className?: string;
  children: React.ReactNode;
  secondary?: boolean;
  fullWidth?: boolean;
  type?: "submit" | "reset" | "button" | undefined;
  onClick?: () => void;
};
export const Button = ({
  className,
  children,
  fullWidth,
  secondary,
  type,
  onClick,
}: Props) => {
  return (
    <button
      className={[
        styles.button,
        secondary ? styles.buttonSecondary : "",
        fullWidth ? styles.buttonFullWidth : "",
        className || "",
      ].join(" ")}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};
