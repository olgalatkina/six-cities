import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../constants';
import {fetchFavoritesAction, changeFavoriteStatusAction} from '../api-actions';
import {OffersType} from '../../types/offers';

type FavoritesData = {
  favorites: OffersType,
  isLoading: boolean,
}

const initialState: FavoritesData = {
  favorites: [],
  isLoading: false,
};

export const favoritesData = createSlice({
  name: NameSpace.Favorites,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavoritesAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
        state.favorites = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchFavoritesAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(changeFavoriteStatusAction.pending, (state) => {
      })
      .addCase(changeFavoriteStatusAction.fulfilled, (state, action) => {
        const updatedOffer = action.payload;
        const index = state.offers.findIndex((offer) => offer.id === updatedOffer.id);
        state.offers[index].isFavorite = !state.offers[index].isFavorite;
      })
      .addCase(changeFavoriteStatusAction.rejected, (state) => {
      });
  }
});
