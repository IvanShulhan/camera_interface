import { useState, useEffect } from 'react';
import Slider from 'react-slick';

import { useAppSelector } from '../../app/hooks';
import { LoaderComponent } from '../../components/loader';
import { getPhotos } from '../../features/photosSlice';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './gallery.scss';

export const GalleryPage = () => {
  const [isLoad, setIsLoad] = useState(false);
  const { photos } = useAppSelector(getPhotos);

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

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
    <div className="gallery">
      {isLoad && <LoaderComponent />}
      {!photos.length && !isLoad && (
        <span className="gallery__warn-text">
          &quot;You don&apos;t have photos yet&quot;
        </span>
      )}

      <Slider {...settings}>
        {photos.map((photo) => (
          <div className="gallery-item" key={photo.id}>
            <img src={photo.src} alt="" />
          </div>
        ))}
      </Slider>
    </div>
  );
};
