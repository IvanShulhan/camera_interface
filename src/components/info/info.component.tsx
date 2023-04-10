/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import './info.scss';

interface IProps {
  onClick: () => void;
}

export const InfoComponent: React.FC<IProps> = React.memo(({ onClick }) => (
  <div className="info">
    <div className="info__content">
      <div className="info__text-block">
        <p className="info__text">
          &quot;This service does not collect or store any user metadata.
        </p>
        <p className="info__text">
          We do not track or monitor user activity, nor do we collect
          any information about user behavior or preferences.&quot;
        </p>
      </div>

      <button
        type="button"
        onClick={onClick}
        className="info__button"
      >
        GOT IT!
      </button>
    </div>
    <span className="info__mask" onClick={onClick} />
  </div>
));
