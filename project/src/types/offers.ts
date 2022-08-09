import {Type} from '../constants';

type LocationType = {
  latitude: number,
  longitude: number,
  zoom: number,
}

type CityType = {
  location: LocationType,
  name: string,
}

type HostType = {
  avatarUrl: string,
  id: number,
  isPro: boolean,
  name: string,
}

type OfferType = {
  bedrooms: number,
  city: CityType,
  description: string,
  goods: string[],
  host: HostType,
  id: number,
  images: string[],
  isFavorite: boolean,
  isPremium: boolean,
  location: LocationType,
  maxAdults: number,
  previewImage: string,
  price: number,
  rating: number,
  title: string,
  type: keyof typeof Type,
}

type OffersType = OfferType[];

type FavoriteDataType = {
  id: number,
  status: number,
}

export type {OffersType, OfferType, CityType, LocationType, HostType, FavoriteDataType};
