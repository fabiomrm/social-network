import styles from './styles.module.css';

type Props = {
  options: string[] | number[];
  className?: string;
  defaultValue?: string;
  onSelected?: (item: string | number) => void;
};

export const Select = ({ options, className, onSelected, defaultValue }: Props) => {
  return (
    <select
      className={[styles.select, className].join(' ')}
      onChange={(e) => onSelected && onSelected(e.target.value)}
    >
      {options.map((item, index) => (
        <option key={`option-${item}-${index}`} value={item} defaultValue={defaultValue}>
          {item}
        </option>
      ))}
    </select>
  );
};
