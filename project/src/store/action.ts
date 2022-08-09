import {createAction} from '@reduxjs/toolkit';
import {AppRoute} from '../constants';

// export const changeActiveCity = createAction<string>('changeActiveCity');
// export const setActiveSortType = createAction<string>('setActiveSortType');

// export const loadOffers = createAction<OffersType>('loadOffers');
// export const setDataLoadedStatus = createAction<boolean>('setDataLoadedStatus');

// export const loadActiveOffer = createAction<OfferType>('loadOffer');
// export const setOfferLoadedStatus = createAction<boolean>('setOfferLoadedStatus');
// export const loadReviews = createAction<ReviewsType>('loadReviews');
// export const loadNeighbourhood = createAction<OffersType>('loadNeighbourhood');

// export const requireAuthorization = createAction<AuthorizationStatus>('requireAuthorization');
// export const setUser = createAction<UserType | null>('setUser');

// export const loadFavorites = createAction<OffersType>('loadFavorites');
// export const changeFavoriteStatus = createAction<OfferType>('changeFavoriteStatus');

export const redirectToRoute = createAction<AppRoute>('redirectToRoute');
