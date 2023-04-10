import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAppSelector } from '../../app/hooks';
import { LoaderComponent } from '../../components/loader';
import { getPhotos } from '../../features/photosSlice';
import './preview.scss';

export const PreviewPage = () => {
  const [isLoad, setIsLoad] = useState(false);
  const { id } = useParams();
  const { photos } = useAppSelector(getPhotos);

  const photoSrc = useMemo(() => {
    return id ? photos.find((item) => item.id === +id)?.src : '';
  }, [photos, id]);

  useEffect(() => {
    setIsLoad(true);

    const timerId = setTimeout(() => {
      setIsLoad(false);
    }, 3500);

    return () => {
      clearTimeout(timerId);
    };
  }, []);

  return (
    <div className="preview">
      <img className="preview__image" src={photoSrc} alt="your face" />
      {isLoad && <LoaderComponent />}
    </div>
  );
};
