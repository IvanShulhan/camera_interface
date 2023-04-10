import classNames from 'classnames';
import './button.scss';

interface IProps {
  size?: 'md' | 'lg';
  onClick?: () => void;
  children: JSX.Element;
  condition?: boolean;
}

export const ButtonComponent: React.FC<IProps> = ({
  size, onClick, children, condition = false,
}) => (
  <button
    type="button"
    onClick={onClick}
    className={classNames(
      'button', {
        'button--is-medium': size === 'md',
        'button--is-large': size === 'lg',
        'button-is-disabled': condition,
      },
    )}
  >
    {children}
  </button>
);
