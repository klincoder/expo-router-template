// import resources
import React, { useCallback, useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useFonts } from "expo-font";
import { SplashScreen, useRootNavigationState, useSegments } from "expo-router";

// Import custom files
import routes from "src/config/routes";
import NoInternetMsg from "src/components/NoInternetMsg";
import useAppSettings from "src/hooks/useAppSettings";
import useAuthState from "src/hooks/useAuthState";
import { appImages, localKeys } from "src/config/constants";
import { handleGetLocalStorage, handleSliceString } from "src/config/functions";
import {
  appSettingsAtom,
  cartAtom,
  internetConnAtom,
  networkDataAtom,
} from "src/config/atoms";
import {
  doc,
  fireAuth,
  fireDB,
  onAuthStateChanged,
  onSnapshot,
} from "src/config/firebase";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

// COMPONENT
const CustomProviders = ({ children }) => {
  // Define app settings
  const { router } = useAppSettings();

  // Define state
  const { user, setUser } = useAuthState();
  const [appIsReady, setAppIsReady] = useState(false);
  const [internetConn, setInternetConn] = useRecoilState(internetConnAtom);
  const setNetworkData = useSetRecoilState(networkDataAtom);
  const setAppSettings = useSetRecoilState(appSettingsAtom);
  const setCart = useSetRecoilState(cartAtom);

  // Define segments
  const segments = useSegments();
  const rootNavState = useRootNavigationState();

  // Define fonts
  const [loaded, error] = useFonts({
    "Montserrat-Regular": require("src/assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-Medium": require("src/assets/fonts/Montserrat-Medium.ttf"),
    "Montserrat-Light": require("src/assets/fonts/Montserrat-Light.ttf"),
    "Montserrat-Thin": require("src/assets/fonts/Montserrat-Thin.ttf"),
  });

  // Define variables
  const userID = user?.id;
  const isAuthSeg = segments?.[0] === "(auth)";
  const isRootNavKey = rootNavState?.key !== undefined;

  // Debug
  // console.log("customProviders: ",);

  // FUNCTIONS
  // HANDLE STARTUP DATA
  // const handleStartUpData = async () => {
  //   // Try catch
  //   try {
  //     const getAppSettings = await handleGetAppSettings();
  //     const getCart = await handleGetLocalStorage(localKeys?.cart);
  //     // Send all request
  //     const allReq = await Promise.all([getAppSettings, getCart]);
  //     // Get all result
  //     const allRes = {
  //       appSettings: allReq?.[0],
  //       cart: allReq?.[1],
  //     }; // close return
  //     // Set state
  //     setAppSettings(allRes?.appSettings);
  //     setCart(allRes?.cart);
  //   } catch (err) {
  //     //console.log("customProvidersErr: ", err.message);
  //   } // close try catch
  // }; // close fxn

  // SIDE EFFECTS
  // LISTEN TO AUTH STATE
  // useEffect(() => {
  //   // If empty args, return
  //   if (!internetConn) return;
  //   // On mount
  //   const unsubscribe = onAuthStateChanged(fireAuth, (res) => {
  //     // If res
  //     if (!res?.uid) {
  //       setUser(null);
  //     } else {
  //       // Define docRef
  //       const docRef = doc(fireDB, "users", res?.uid);
  //       onSnapshot(docRef, (snapshot) => {
  //         // Define variables
  //         const dbUser = snapshot.data();
  //         const dbUsername = dbUser?.username;
  //         const dbUsernameFormat = handleSliceString(dbUsername, 0, 12);
  //         const userData = {
  //           id: dbUser?.id,
  //           name: dbUser?.full_name,
  //           email: dbUser?.email_address,
  //           phone: dbUser?.phone_number,
  //           username: dbUser?.username,
  //           alerts: dbUser?.alerts,
  //           avatar: dbUser?.avatar || appImages?.avatarLink,
  //           usernameFormat: dbUsernameFormat || "guest",
  //           status: dbUser?.status,
  //           emailVerified: res?.emailVerified,
  //           lastLogin: res?.metadata?.lastSignInTime,
  //           // Project specific
  //         };
  //         // Set user
  //         setUser(userData);
  //       }); // close snapshot
  //     } // close if
  //   }); // close unsubscribe
  //   // Clean up
  //   return () => {
  //     unsubscribe();
  //   }; // close return
  // }, [internetConn, setUser]);

  // SIDE EFFECTS
  // HANDLE PROTECTED ROUTES
  // useEffect(() => {
  //   // If empty args, return
  //   if (isRootNavKey) {
  //     // If user
  //     if (userID) {
  //       router.replace(routes.HOME);
  //     } else {
  //       router.replace(routes.ONBOARDING);
  //     } // close if
  //   } // close if
  // }, [isRootNavKey, userID]);

  // SIDE EFFECTS
  // GET START UP DATA
  useEffect(() => {
    // If empty args, return
    if (!internetConn) return;
    // IIFE
    (async () => {
      // Try catch
      try {
        // Get data
        //await handleStartUpData();

        // Debug
        //console.log("customProviders: ",);

        // Set timeout
        setTimeout(() => {
          setAppIsReady(true);
        }, 8000);
      } catch (err) {
        //console.log("customProvidersErr: ", err.message);
      } // close try catch
    })(); // close fxn
    // Clean up
    // return () => {}; // close return -
  }, [internetConn, userID]);

  // SIDE EFFECTS
  // LISTEN TO NETWORK STATUS
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      const status = state.isConnected && state.isInternetReachable;
      setInternetConn(status);
      setNetworkData(state);
    }); // close fxn
    return () => {
      unsubscribe();
    }; // close return
  }, []);

  // HIDE SPLASH SCREEN
  if (!appIsReady || !loaded) {
    return null;
  } else {
    SplashScreen.hideAsync();
  } // close if

  // Return component
  return <>{internetConn ? <>{children}</> : <NoInternetMsg />}</>; // close return
}; // close component

// Export
export default CustomProviders;
