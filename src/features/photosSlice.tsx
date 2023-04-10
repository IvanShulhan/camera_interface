import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// eslint-disable-next-line import/no-cycle
import { RootState } from '../app/store';

interface Photo {
  id: number;
  src: string;
}

interface PhotoState {
  photos: Photo[];
}

const initialState: PhotoState = {
  photos: JSON.parse(localStorage.getItem('photos') || '[]'),
};

const photoSlice = createSlice({
  name: 'photo',
  initialState,
  reducers: {
    addPhoto: (state, action: PayloadAction<Photo>) => {
      state.photos.push(action.payload);

      localStorage.setItem('photos', JSON.stringify(state.photos));
    },
  },
});

export const { addPhoto } = photoSlice.actions;

export const getPhotos = (state: RootState) => state.photos;

export default photoSlice.reducer;
