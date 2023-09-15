// Import resources
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  sendPasswordResetEmail,
  verifyPasswordResetCode,
  confirmPasswordReset,
  applyActionCode,
  signOut,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  collectionGroup,
  doc,
  onSnapshot,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  increment,
  arrayUnion,
  serverTimestamp,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

// Import custom files
import { isProdEnv } from "src/config/constants";
import {
  // Dev
  FIREBASE_DEV_API_KEY,
  FIREBASE_DEV_AUTH_DOMAIN,
  FIREBASE_DEV_PROJECT_ID,
  FIREBASE_DEV_STORAGE_BUCKET,
  FIREBASE_DEV_MESSAGING_SENDER_ID,
  FIREBASE_DEV_APP_ID,
  FIREBASE_DEV_MEASUREMENT_ID,
  // Prod
  FIREBASE_PROD_API_KEY,
  FIREBASE_PROD_AUTH_DOMAIN,
  FIREBASE_PROD_PROJECT_ID,
  FIREBASE_PROD_STORAGE_BUCKET,
  FIREBASE_PROD_MESSAGING_SENDER_ID,
  FIREBASE_PROD_APP_ID,
  FIREBASE_PROD_MEASUREMENT_ID,
} from "@env";

// VARIABLES
// FIREBASE CONFIG
const finalConfig = isProdEnv
  ? {
      apiKey: FIREBASE_PROD_API_KEY,
      authDomain: FIREBASE_PROD_AUTH_DOMAIN,
      projectId: FIREBASE_PROD_PROJECT_ID,
      storageBucket: FIREBASE_PROD_STORAGE_BUCKET,
      messagingSenderId: FIREBASE_PROD_MESSAGING_SENDER_ID,
      appId: FIREBASE_PROD_APP_ID,
      measurementId: FIREBASE_PROD_MEASUREMENT_ID,
    }
  : {
      apiKey: FIREBASE_DEV_API_KEY,
      authDomain: FIREBASE_DEV_AUTH_DOMAIN,
      projectId: FIREBASE_DEV_PROJECT_ID,
      storageBucket: FIREBASE_DEV_STORAGE_BUCKET,
      messagingSenderId: FIREBASE_DEV_MESSAGING_SENDER_ID,
      appId: FIREBASE_DEV_APP_ID,
      measurementId: FIREBASE_DEV_MEASUREMENT_ID,
    };

// INITIALZE APP
// Check app initialzation
const isAppsLen = getApps().length > 0;
const app = isAppsLen ? getApp() : initializeApp(finalConfig);

// Define firebase services
const fireDB = getFirestore(app);
const fireStorage = getStorage(app);
//const fireAuth = getAuth(app);
const fireAuth = isAppsLen
  ? getAuth(app)
  : initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });

// FUNCTIONS
// HANDLE MAP DOCS
export const mapDocs = (docSnap) => {
  // If empty args, return
  if (!docSnap?.size) return [];
  return docSnap?.docs?.map((doc) => {
    return doc.data();
  }); // close return
}; // close fxn

// Export
export {
  // Services
  fireDB,
  fireAuth,
  fireStorage,
  finalConfig,
  // Auth
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  sendPasswordResetEmail,
  verifyPasswordResetCode,
  confirmPasswordReset,
  applyActionCode,
  signOut,
  // Database
  doc,
  collection,
  collectionGroup,
  onSnapshot,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  increment,
  arrayUnion,
  serverTimestamp,
  // Storage
  ref,
  uploadBytesResumable,
  getDownloadURL,
};
