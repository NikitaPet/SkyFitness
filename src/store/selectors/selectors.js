/* eslint-disable implicit-arrow-linebreak */
import { createSelector } from "@reduxjs/toolkit";
import { skyFitnessQueryApiAuth } from "../../pages/services/queryApi";

const skyFitnessSelector = (store) => store.skyFitnessRedux;

const apiSelectorUserSignUp =
  skyFitnessQueryApiAuth.endpoints.postSignUp.select();

const apiSelectorUserLogIn =
  skyFitnessQueryApiAuth.endpoints.postSignInWithPassword.select();

export const loginDataErrorMSGSelector = (store) =>
  skyFitnessSelector(store)?.errorMessage ?? {};

export const signUpSelector = createSelector(
  apiSelectorUserSignUp,
  (signUpResult) => signUpResult?.data ?? []
);
export const logInSelector = createSelector(
  apiSelectorUserLogIn,
  (logInResult) => logInResult.data ?? []
);
/*
 export const minMaxTrackId = (store) => {
  const data = spotyfySelector(store)?.playlist ?? [];
  if (data.length) {
    return { min: 0, max: data.length - 1 };
  }
  return {};
};
export const playlistArrSelector = (store) =>
  spotyfySelector(store)?.playlist ?? [];

export const loginDataSelector = (store) =>
  spotyfySelector(store)?.loginData || {};

export const userLogInSelector = (store) =>
  spotyfySelector(store)?.userLogIn || false;

export const loginDataLoadingSelector = (store) =>
  spotyfySelector(store)?.loading;

export const loginDataErrorSelector = (store) => spotyfySelector(store)?.error;

export const loginDataErrorMSGSelector = (store) =>
  spotyfySelector(store)?.errorMessage;

export const AccessTokenSelector = (store) =>
  spotyfySelector(store)?.accessToken;

export const RefreshTokenSelector = (store) =>
  spotyfySelector(store)?.refreshToken;

export const GetPlayingTrackSelector = (store) =>
  spotyfySelector(store)?.playingTrack;

export const GetFilerTrackSelector = (store) =>
  spotyfySelector(store)?.filters ?? {};

export const yearFilterSelector = (store) =>
  spotyfySelector(store)?.filters['button-year'];

export const textSearchFilterSelector = (store) =>
  spotyfySelector(store)?.filters?.textSearch ?? '';

export const GetIdTokenRefIntSelector = (store) =>
  spotyfySelector(store)?.idRefTokenInt;
 */
