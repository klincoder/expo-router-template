// Import resources
import { atom } from "recoil";

/*************
  USER
**************/
// USER ATOM
export const userAtom = atom({
  key: "userAtom",
  default: null,
});

/**************
  OTHERS
***************/
// BLANK ATOM
export const blankAtom = atom({
  key: "blankAtom",
  default: [],
});

// LOADING DATA ATOM
export const loadingDataAtom = atom({
  key: "loadingDataAtom",
  default: true,
});

// APP SETTINGS ATOM
export const appSettingsAtom = atom({
  key: "appSettingsAtom",
  default: [],
});

// APP ONBOARDING ATOM
export const appOnboardingAtom = atom({
  key: "appOnboardingAtom",
  default: [],
});

// INTERNET CONN ATOM
export const internetConnAtom = atom({
  key: "internetConnAtom",
  default: true,
});

// NETWORK DATA ATOM
export const networkDataAtom = atom({
  key: "networkDataAtom",
  default: null,
});

// CART ATOM
export const cartAtom = atom({
  key: "cartAtom",
  default: [],
});
