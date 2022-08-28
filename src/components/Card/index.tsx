import classNames from 'classnames';

import styles from './index.less';

export type IProps = {
  label?: string;
  icon?: React.ReactNode;
  className?: string;
  labelClass?: string;
  labelRight?: React.ReactNode;
};

const Card: React.FC<IProps> = ({
  children,
  icon,
  label,
  className,
  labelClass,
  labelRight,
}) => {
  return (
    <div className={classNames('card', className, styles.card)}>
      {label && (
        <div className={styles.cardLabel}>
          {icon}
          <span className={classNames(styles.cardTitle, labelClass)}>
            {label}
          </span>
          <div className={styles.labelRight}>{labelRight}</div>
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;
