import {createSlice} from '@reduxjs/toolkit';
import {CITIES, NameSpace, SortOption} from '../../constants';

type AppProcess = {
  activeCity: string,
  activeSortType: string,
};

const initialState: AppProcess = {
  activeCity: CITIES[0],
  activeSortType: SortOption.Popular,
};

export const appProcess = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    changeActiveCity: (state, action) => {
      state.activeCity = action.payload;
    },
    setActiveSortType: (state, action) => {
      state.activeSortType = action.payload;
    }
  },
});

export const {changeActiveCity, setActiveSortType} = appProcess.actions;
