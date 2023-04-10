/* eslint-disable consistent-return */
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  useEffect, useRef, useMemo, useState,
} from 'react';
import { useDispatch } from 'react-redux';
import {
  Routes, Route, Navigate, useNavigate, useLocation,
} from 'react-router-dom';
import Webcam from 'react-webcam';

import Camera from './assets/images/camera.png';
import Gallery from './assets/images/gallery.png';
import Info from './assets/images/info.png';
import Reset from './assets/images/reset.png';
import Upload from './assets/images/upload.png';
import { ButtonComponent } from './components/button';
import { InfoComponent } from './components/info';
import { addPhoto } from './features/photosSlice';
import { CameraPage } from './pages/camera';
import { GalleryPage } from './pages/gallery';
import { PreviewPage } from './pages/preview';
import './App.scss';

export const App = () => {
  const [isVisibleInfo, setIsVisibleInfo] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const webcamRef = useRef<Webcam>(null);
  const viewRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const changeInfoVisibility = () => {
    setIsVisibleInfo(!isVisibleInfo);
  };

  const isOpenCamera = useMemo(() => (
    pathname.split('/').filter(el => Boolean(el)).length === 0
  ), [pathname]);

  useEffect(() => {
    const element = viewRef.current;

    if (!element) {
      return;
    }

    const handleResize = () => {
      const height = element.clientHeight;
      const width = 0.8 * height;

      element.style.width = `${width}px`;
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const returnToCamera = () => {
    navigate('/');
  };

  const capture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();

      const id = Date.now();

      const photo = { src: imageSrc!, id };

      dispatch(addPhoto(photo));
      navigate(`/${id}`);
    }
  };

  return (
    <div className="app">
      <div className="app__content">
        <div ref={viewRef} className="app__view">
          <Routes>
            <Route path="/" element={<CameraPage webcamRef={webcamRef} />} />
            <Route path="/:id" element={<PreviewPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
        <div className="app__controll-block">
          <div className="app__controll-part app__controll-part--is-left">
            <ButtonComponent
              onClick={() => navigate('/gallery')}
              size="md"
            >
              <img src={Gallery} alt="gallery" />
            </ButtonComponent>
          </div>
          <div className="app__controll-part app__controll-part--is-center">
            <ButtonComponent
              onClick={isOpenCamera ? capture : returnToCamera}
              size="lg"
            >
              <img src={isOpenCamera ? Camera : Reset} alt="camera" />
            </ButtonComponent>
          </div>
          <div className="app__controll-part app__controll-part--is-right">
            <ButtonComponent>
              <img src={Upload} alt="upload" />
            </ButtonComponent>
            <div className="app__controll-button-wrapper">
              <ButtonComponent
                onClick={changeInfoVisibility}
              >
                <img src={Info} alt="info" />
              </ButtonComponent>
            </div>

          </div>
        </div>
        {isVisibleInfo
          && <InfoComponent onClick={changeInfoVisibility} />}
      </div>
    </div>
  );
};
