// Import resources
import { Dimensions } from "react-native";
import { createTheme } from "@rneui/themed";
import { create as createStyle } from "twrnc";
import * as Application from "expo-application";

// Import custom files
import routes from "src/config/routes";
import logo from "src/assets/logo.png";
import logoIcon from "src/assets/icon.png";
import avatar from "src/assets/avatar.png";
import visa from "src/assets/images/visa.png";
import mastercard from "src/assets/images/mastercard.png";
import verve from "src/assets/images/verve.png";
import mtnMomo from "src/assets/images/mtn-momo.jpg";
import bankTransfer from "src/assets/images/bank-transfer.jpg";
import {
  BASEURL_DEV,
  BASEURL_PROD,
  PAYSTACK_DEV_PUBLIC_KEY,
  PAYSTACK_DEV_SECRET_KEY,
  PAYSTACK_PROD_PUBLIC_KEY,
  PAYSTACK_PROD_SECRET_KEY,
} from "@env";

/**************************
  CONSTANTS
****************************/
// APP NAME
export const appName = "KlinCoder";

// CUSTOM TAILWIND STYLES
export const tw = createStyle(require("../../tailwind.config.js"));

// IS PROD ENVIRONMENT
export const isProdEnv = process.env.NODE_ENV === "production";

// CURRENCY SYMBOL
export const currencySymbol = { ng: "₦", gh: "₵", usd: "$", btc: "₿" };

// JAVASCRIPT DATE
export const jsDate = new Date();

// BASE URL
export const baseUrl = isProdEnv ? BASEURL_PROD : BASEURL_DEV;

// GLOBAL SCREEN OPTIONS
export const globalScreenOptions = {
  headerTintColor: "black",
  headerBackTitleVisible: false,
  headerShadowVisible: false,
  headerTitleStyle: tw`text-black font-medium`,
  headerStyle: tw`bg-white`,
};

// APP COLORS
export const appColors = {
  primary: "#313BAC",
  secondary: "#11143C",
  accent: "#F9F871",
  gray: "#9CA3AF",
};

// APP THEME
export const appTheme = createTheme({
  mode: "light",
  lightColors: {
    primary: tw`text-primary`,
    background: tw`bg-white`,
  },
  darkColors: {
    primary: tw`text-black`,
  },
  components: {
    DialogLoading: {
      loadingStyle: tw`text-primary p-0 m-0 rounded-full`,
    },
    Chip: {
      buttonStyle: tw`border-black`,
    },
    Text: {
      h1Style: {
        fontFamily: tw`font-medium`,
      },
      h2Style: {
        fontFamily: tw`font-medium`,
      },
      h3Style: {
        fontFamily: tw`font-medium`,
      },
      h4Style: {
        fontFamily: tw`font-medium`,
      },
    },
  },
});

// APP IMAGES
export const appImages = {
  general: "https://placehold.co/600x400.png",
  logo,
  logoIcon,
  avatar,
};

// APP REGEX
export const appRegex = {
  phone: /^(?:\d{11})$/,
  numberDecimal: /^\d*(\.\d+)?$/,
  fiveDecimalPlaces: /^\d*(\.\d{1,5})?$/,
  digitsOnly: /^[0-9]+$/,
  cannotStartWithZero: /^(?:[1-9]\d*|0)$/,
  noSpace: /\s/g,
};

// ALERT MESSAGE
export const alertMsg = {
  // Success
  generalSucc: "Action successful 👍",
  // Error
  generalErr: "internal error. Please contact support 😔",
};

// EMAIL TEMPLATES
export const emailTemp = {
  otp: 4468134,
  verify: 4469644,
  recovery: 4470092,
  profile: 4471756,
  welcome: 4471793,
  login: 4471814,
  newUser: 4471824,
};

// SCREEN INFO
export const screenInfo = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height,
  scale: Dimensions.get("window").scale,
  fontScale: Dimensions.get("window").fontScale,
};

// PAYSTACK CONNECTION
export const paystackConn = isProdEnv
  ? {
      public: PAYSTACK_PROD_PUBLIC_KEY,
      secret: PAYSTACK_PROD_SECRET_KEY,
    }
  : {
      public: PAYSTACK_DEV_PUBLIC_KEY,
      secret: PAYSTACK_DEV_SECRET_KEY,
    };

// LOCAL STORAGE KEYS
export const localKeys = {
  cart: "cart",
  appSettings: "appSettings",
};

// ACTION SETTINGS
export const actionSettings = {
  url: `${baseUrl}/login`,
  // iOS: {
  //   bundleId: "com.example.klincoder",
  // },
  // android: {
  //   packageName: "com.example.klincoder",
  //   installApp: true,
  //   minimumVersion: "12",
  // },
  //handleCodeInApp: false,
  //dynamicLinkDomain: 'custom.page.link'
};

/*****************
  DATA
******************/
// ACCOUNT LIST
export const accountList = [
  {
    title: "Settings",
    leftIconType: "materialCommunityIcons",
    leftIconName: "cog-outline",
    isLink: true,
    link: routes.SETTINGS,
  },
  {
    title: "Get Help",
    leftIconType: "fontAwesome",
    leftIconName: "support",
    isLink: true,
    link: routes.SUPPORT,
  },
  {
    title: `Version (${Application.nativeApplicationVersion})`,
    slug: "app-version",
    leftIconType: "octIcons",
    leftIconName: "versions",
  },
];

// PAYMENT METHOD LIST
export const paymentMethodList = [
  {
    title: "Debit/Credit Card",
    slug: "card",
    description: "Pay online with multiple options.",
    image: appImages?.creditCard,
  },
  {
    title: "Manual Bank Transfer",
    slug: "bank-transfer",
    description: "Pay manually with your bank app or USSD.",
    image: appImages?.creditCard,
  },
];

// GENDER LIST
export const genderList = ["Male", "Female", "Prefer not to say"];

// PAYMENT LOGOS
export const paymentLogos = [visa, mastercard, verve, mtnMomo, bankTransfer];
