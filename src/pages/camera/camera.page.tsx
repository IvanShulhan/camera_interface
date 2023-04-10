import React from 'react';
import SVG from 'react-inlinesvg';
import Webcam, { WebcamProps } from 'react-webcam';

import Border from '../../assets/images/border.svg';
import './camera.scss';

interface CameraInterfaceProps {
  webcamProps?: WebcamProps;
  webcamRef: React.RefObject<Webcam>;
}

export const CameraPage: React.FC<CameraInterfaceProps> = React.memo(({
  webcamProps, webcamRef,
}) => (
  <div className="camera">
    <Webcam
      className="camera__view"
      audio={false}
      mirrored
      ref={webcamRef}
      {...webcamProps}
    />
    <SVG src={Border} className="camera__border" />
    <span className="camera__text">“Who is this cutest kitty?”</span>
  </div>
));
