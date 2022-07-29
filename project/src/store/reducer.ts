import {createReducer} from '@reduxjs/toolkit';
import {setActiveTab, getOffers, getReviews, getUser, setActiveOption} from './action';
import {CITIES, SortOption} from '../constants';
import {offers} from '../mocks/offers';
import {reviews} from '../mocks/reviews';
import {user} from '../mocks/user';


const initialState = {
  activeTab: CITIES[0],
  activeOption: SortOption.Popular,
  offers: offers,
  reviews: reviews,
  user: user,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setActiveTab, (state, action) => {
      state.activeTab = action.payload.city;
    })
    .addCase(setActiveOption, (state, action) => {
      state.activeOption = action.payload.option;
    })
    .addCase(getOffers, (state, action) => {
      state.offers = action.payload.offers;
    })
    .addCase(getReviews, (state, action) => {
      state.reviews = action.payload.reviews;
    })
    .addCase(getUser, (state, action) => {
      state.user = action.payload.user;
    });
});

export {reducer};