// Import resources
import { useRef } from "react";
import { useRecoilValue } from "recoil";
import {
  useRouter,
  useNavigation,
  usePathname,
  useGlobalSearchParams,
} from "expo-router";

// Import custom files
import { appSettingsAtom, networkDataAtom } from "src/config/atoms";
import { handleDayJsFormat, handleFindId } from "src/config/functions";

// COMPONENT
const useAppSettings = () => {
  // Define state
  const appSettings = useRecoilValue(appSettingsAtom);
  const networkState = useRecoilValue(networkDataAtom);

  // Define ref
  const isMounted = useRef(false);

  // Define navigaion
  const router = useRouter();
  const navigation = useNavigation();
  const currPath = usePathname();
  const routeQuery = useGlobalSearchParams();

  // Define settings
  const general = handleFindId(appSettings, "general");
  const links = handleFindId(appSettings, "links");
  const bank = handleFindId(appSettings, "bank");
  const slides = handleFindId(appSettings, "slides");

  // Define date
  const todaysDate = handleDayJsFormat();
  const todaysDate1 = handleDayJsFormat(todaysDate, 1);
  const todaysDate2 = handleDayJsFormat(todaysDate, 2);

  // Define snaps
  const snaps = {
    full: ["75%"],
    half: ["50%"],
    small: ["35%"],
  };

  // Define site info
  const siteInfo = {
    // General
    logo: general?.app_logo,
    name: general?.app_name,
    email: general?.support_email,
    phone: general?.support_phone,
    noReply: general?.support_email_reply,
    copyrightName: general?.copyright_name,
    adminName: general?.admin_name,
    adminEmail: general?.admin_email,
    workingHours: general?.working_hours,
    location: general?.location,
    vat: general?.vat || 0,
    // Links
    android: links?.android,
    ios: links?.ios,
    github: links?.github,
    instagram: links?.instagram,
    tiktok: links?.tiktok,
    // Slides
    home_carousel: slides?.app_home_carousel,
  };

  // Define network info
  const networkInfo = {
    bssID: networkState?.details?.bssid,
    frequency: networkState?.details?.frequency,
    ipAddress: networkState?.details?.ipAddress,
    isConnExpensive: networkState?.details?.isConnectionExpensive,
    strength: networkState?.details?.strength,
    subnet: networkState?.details?.subnet,
    isConnected: networkState?.isConnected,
    isReachable: networkState?.isInternetReachable,
    isWifiEnabled: networkState?.isWifiEnabled,
    type: networkState?.type,
  };

  // Debug
  //console.log("appSettings: ",);

  // Return component
  return {
    appSettings,
    isMounted,
    router,
    navigation,
    currPath,
    snaps,
    siteInfo,
    todaysDate,
    todaysDate1,
    todaysDate2,
    networkInfo,
    routeQuery,
  }; // close return
}; // close component

// Export
export default useAppSettings;
