// Import resources
import axios from "axios";
import dayjs from "dayjs";
import dayjsUTC from "dayjs/plugin/utc";
import dayjsBetween from "dayjs/plugin/isBetween";
import dayjsRelative from "dayjs/plugin/relativeTime";
import * as Clipboard from "expo-clipboard";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Import custom files
import {
  baseUrl,
  appName,
  currencySymbol,
  jsDate,
  localKeys,
} from "src/config/constants";
import {
  collection,
  doc,
  fireDB,
  getDoc,
  getDocs,
  getDownloadURL,
  limit,
  mapDocs,
  orderBy,
  query,
  ref,
  setDoc,
  uploadBytesResumable,
  where,
} from "src/config/firebase";

/***********
  PLUGINS
************/
dayjs.extend(dayjsUTC);
dayjs.extend(dayjsBetween);
dayjs.extend(dayjsRelative);

/**************
 FUNCTIONS
****************/
// HANDLE GET DOCS
export const handleGetDocs = async (docRef) => {
  // If empty args, return
  if (!docRef) return null;
  // Define variables
  const docSnap = await getDocs(docRef);
  const docData = mapDocs(docSnap);
  return docData;
}; // close fxn

// HANDLE GET DOC
export const handleGetDoc = async (docRef) => {
  // If empty args, return
  if (!docRef) return null;
  // Define variables
  const docSnap = await getDoc(docRef);
  const docData = docSnap.exists() ? docSnap.data() : null;
  return docData;
}; // close fxn

// HANDLE SET DOC
export const handleSetDoc = async (docRef, data) => {
  // If empty args, return
  if (!docRef || !data) return null;
  return await setDoc(docRef, data, { merge: true });
}; // close fxn

// HANDLE GET DOCS CACHE
export const handleGetDocsCache = async (key, docRef) => {
  // If empty args, return
  if (!key || !docRef) return null;
  // Define variables
  let docSnap, docData;
  const todaysDate = handleDayJsFormat();
  const cacheInfo = await handleGetLocalStorage(key);
  const cacheAppName = cacheInfo?.appName;
  const cacheLastGet = cacheInfo?.lastGet;
  const cacheData = cacheInfo?.data;
  const isOldData = cacheAppName === appName && cacheData?.length > 0;
  // If isOldData
  if (isOldData) {
    // Get last updated data
    docRef = query(docRef, where("date_updated", ">", cacheLastGet));
    const newSnap = await getDocs(docRef);
    const newData = mapDocs(newSnap);
    docData = handleUpdateObjArrId(cacheData, newData);
    docData = { appName, lastGet: todaysDate, data: docData };
    await handleSetLocalStorage(key, docData);
    //console.log("fxnDocsCache 1: ", { docData, newData });
  } else {
    // Get initial data
    docSnap = await getDocs(docRef);
    docData = mapDocs(docSnap);
    docData = { appName, lastGet: todaysDate, data: docData };
    await handleSetLocalStorage(key, docData);
    //console.log("fxnDocsCache 2: ", docData);
  } // close if
  return docData?.data;
}; // close fxn

// HANDLE UPDATE OBJ ARRAY ID
export const handleUpdateObjArrId = (oldArr, newArr) => {
  // If empty args, return
  if (!oldArr || !newArr) return [];
  // Define variables
  let result = [];
  // Loop oldArr
  for (const object of oldArr) {
    // Get updated obj
    const updatedObj = newArr.find((newObj) => newObj?.id === object.id);
    // If updated object
    if (updatedObj) {
      result.push(updatedObj);
    } else {
      result.push(object);
    } // close if
  } // close loop
  // Add newly added objects
  for (const object of newArr) {
    if (!result.some((i) => i?.id === object?.id)) {
      result.push(object);
    } // close if
  } // close loop
  return result;
}; // close

// HANDLE GET USER EMAIL
export const handleGetUserEmail = async (emailAddr) => {
  // If empty args, return
  if (!emailAddr) return;
  const docRef = query(
    collection(fireDB, "users"),
    where("email_address", "==", emailAddr),
    limit(1)
  );
  const docData = await handleGetDocs(docRef);
  return docData?.[0];
}; // close fxn

// HANDLE GET APP SETTINGS
export const handleGetAppSettings = async () => {
  const docRef = collection(fireDB, "app_settings");
  return await handleGetDocsCache(localKeys?.appSettings, docRef);
}; // close fxn

// HANDLE FIREADMIN ACTION
export const handleFireAdminAction = async (action, email) => {
  // If empty args, return
  if (!action || !email) return null;
  return await axios({
    method: "POST",
    url: `${baseUrl}/api/fireadmin`,
    data: { action, email },
  }).then((res) => {
    return res?.data;
  }); // close return
}; // close fxn

// HANDLE GENERATE EMAIL TO
export const handleGenEmailTo = (toVal) => {
  // If empty args, return
  if (!toVal || typeof toVal !== "object") return [];
  // Check if toVal is an array
  const isArr = Array.isArray(toVal);
  return isArr
    ? toVal?.map((i) => {
        return { Name: i?.name, Email: i?.email };
      })
    : [{ Name: toVal?.name, Email: toVal?.email }];
}; // close fxn

// HANDLE SEND EMAIL
export const handleSendEmail = async (msg, tempID) => {
  // If empty args, return
  if (!msg || !tempID) return null;
  // Message is an array - send different emails multiple receivers at once - eg. new user alert
  // To is an array - send the same email to multiple receivers at once - eg. broadcast email
  // Generate email toArr
  const toArr = handleGenEmailTo(msg?.toArr || msg);
  const fromObj = { Name: "Klincoder", Email: "noreply@klincoder.com" };
  const isValidToArr = toArr?.length > 0;
  // iF not isValidToArr
  if (!isValidToArr) {
    return "Invalid receiver(s)";
  } else {
    // Return and await response
    return await axios({
      method: "POST",
      url: `${baseUrl}/api/email`,
      data: {
        to: toArr,
        from: fromObj,
        tempID,
        msg: {
          ...msg,
          year: handleDayJsFormat(null, 3),
          date: handleDayJsFormat(null, 2),
        },
      },
    }).then((res) => {
      return res?.data;
    }); // close return
  } // close if
}; // close fxn

// HANDLE RANDOM CODE
export const handleRandomCode = (val) => {
  val = Number(val);
  // Switch
  switch (val) {
    case 6:
      return Math.floor(Math.random() * 999999 + 1);
    case 10:
      return Math.floor(1000 + Math.random() * 9000000000);
    default:
      return Math.floor(1000 + Math.random() * 9000);
  } // close switch
}; // close fxn

// HANDLE RANDOM STRING
export const handleRandomString = (val) => {
  // Define variables
  val = Number(val || 6);
  return Math.random().toString(36).slice(2, val);
}; // close fxn

// HANDLE FIND ID
export const handleFindId = (objArr, val) => {
  // If empty args, return
  if (!objArr || !val) return;
  const result = objArr?.find((i) => i?.id === val);
  if (result) {
    return result;
  } else {
    return {};
  } // close if
}; // close fxn

// HANDLE FIND TITLE
export const handleFindTitle = (objArr, val) => {
  // If empty args, return
  if (!objArr || !val) return;
  const result = objArr?.find((i) => i?.title === val);
  if (result) {
    return result;
  } else {
    return {};
  } // close if
}; // close fxn

// HANDLE FIND SLUG
export const handleFindSlug = (objArr, val) => {
  // If empty args, return
  if (!objArr || !val) return;
  const result = objArr?.find((i) => i?.slug === val);
  if (result) {
    return result;
  } else {
    return {};
  } // close if
}; // close fxn

// HANDLE FILTER ID
export const handleFilterId = (objArr, val) => {
  // If empty args, return
  if (!objArr || !val) return;
  const result = objArr?.filter((i) => i?.id === val);
  if (result?.length > 0) {
    return result;
  } else {
    return [];
  } // close if
}; // close fxn

// HANDLE FILTER STATUS
export const handleFilterStatus = (objArr, val) => {
  // If empty args, return
  if (!objArr) return;
  val = val || "active";
  const result = objArr?.filter((i) => i?.status === val);
  if (result?.length > 0) {
    return result;
  } else {
    return [];
  } // close if
}; // close fxn

// HANDLE FILTER USER ID
export const handleFilterUserId = (objArr, val) => {
  // If empty args, return
  if (!objArr || !val) return;
  const result = objArr?.filter((i) => i?.user_id === val);
  if (result?.length > 0) {
    return result;
  } else {
    return [];
  } // close if
}; // close fxn

// HANDLE FILTER SELLER ID
export const handleFilterSellerId = (objArr, val) => {
  // If empty args, return
  if (!objArr || !val) return;
  const result = objArr?.filter((i) => i?.seller_id === val);
  if (result?.length > 0) {
    return result;
  } else {
    return [];
  } // close if
}; // close fxn

// HANDLE FILTER CATEGORY & STATUS
export const handleFilterCatStatus = (objArr, category, status) => {
  // If empty args, return
  if (!objArr || !category) return;
  status = status || "active";
  const result = objArr?.filter(
    (i) => i?.category === category && i?.status === status
  );
  if (result?.length > 0) {
    return result;
  } else {
    return [];
  } // close if
}; // close fxn

// HANDLE FILTER CATEGORY SPLIT
export const handleFilterCategorySplit = (objArr, category) => {
  // If empty args, return
  if (!objArr || !category) return [];
  const result = objArr?.filter(
    (i) => i?.category?.split(", ")?.includes(category) === true
  );
  if (result?.length > 0) {
    return result;
  } else {
    return [];
  } // close if
}; // close fxn

// HANDLE SLICE STRING
export const handleSliceString = (strVal, sliceFrom, sliceTo, holder) => {
  // If empty args, reurn
  if (!strVal || !sliceTo) return;
  let result;
  holder = holder || "...";
  if (strVal?.length > sliceTo) {
    result = `${strVal?.slice(sliceFrom, sliceTo)}${holder}`;
  } else {
    result = strVal;
  } // close if
  return result;
}; // close fxn

// HANDLE SELECT BULK ITEM
export const handleSelectBulkItem = (objArr, itemID) => {
  // If empty args, return
  if (!objArr || !itemID) return null;
  // Define tempArr
  let tempArr = objArr?.map((i) => {
    if (itemID === i?.id) {
      return { ...i, isChecked: !i?.isChecked };
    } // close if
    return i;
  }); // close get item
  return tempArr;
}; // close if

// HANDLE SELECT BULK ITEM STRING
export const handleSelectBulkItemStr = (objArr) => {
  // If empty args, return null
  if (!objArr) return null;
  const allKeys = objArr?.map((i) => i?.key);
  return allKeys?.join(", ");
}; // close fxn

// HANDLE UPPERCASE FIRST LETTER
export const handleUppercaseFirst = (val) => {
  // If empty args, return ""
  if (typeof val != "string") return "";
  return val.charAt(0).toUpperCase() + val.slice(1);
}; // close fxn

// HANDLE FORMAT NUMBER
export const handleFormatNumber = (val, decimal) => {
  // Define variables
  let result;
  decimal = decimal || 0;
  if (val < 1) {
    result = 0;
  } else {
    result = parseFloat(val)
      .toFixed(decimal)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  } // close if
  return result;
}; // close fxn

// HANDLE TEXTAREA PHONE NUMBERS
export const handleTextareaPhoneNumbers = (values) => {
  // Define variables
  const trimPhone = values?.split(/[\r?\n,]+/).map((item) => item.trim()); // Split textarea values to array and trim it
  const filterPhone = trimPhone.filter((a) => a); // Filter empty values from keywords array
  const uniquePhone = [...new Set(filterPhone)]; // Remove duplicates
  const phoneArr = uniquePhone?.map((i) => i.replace("0", "+234")); // Define phoneArr
  // Finally... replace first character with 234
  const finalPhone = uniquePhone
    ?.map((item) => item.replace("0", "+234"))
    .join(", ");
  const finalCount = uniquePhone?.length;
  const isValid = uniquePhone?.every((item) => {
    if (item?.length === 11) {
      return true;
    } else {
      return false;
    } // close if
  }); // close loop
  return { finalPhone, finalCount, isValid, phoneArr };
}; // close fxn

// GENERATE USERNAME FROM EMAIL ADDRESS
export const handleGenUsername = (val) => {
  // If data type is string
  if (typeof val === "string") {
    return val?.split("@")[0];
  } else {
    return null;
  } // close if
}; // close fxn

// HANDLE GENERATE OTP CODE
export const handleGenOtpCode = () => {
  // Define code - random 6 digit numbers
  const randomCode = handleRandomCode(6);
  return randomCode?.toString();
}; // close fxn

// HANDLE GENERATE TRANX REFERENCE
export const handleGenTranxRef = (prefix) => {
  // Define variables
  const finalPrefix = prefix || "KL";
  const randomCode = handleRandomCode(6);
  const randomStr = handleRandomString(6);
  return finalPrefix + randomStr.toUpperCase() + randomCode;
}; // close fxn

// HANDLE STATUS COLOR
export const handleStatusColor = (val) => {
  // If empty args, return
  if (!val || typeof val !== "string") return "";
  // Define variable
  let color;
  // Switch val
  switch (val) {
    case "active":
      color = `bg-success`;
      break;
    case "success":
      color = `bg-success`;
      break;
    case "approved":
      color = `bg-success`;
      break;
    case "paid":
      color = `bg-success`;
      break;
    case "complete":
      color = `bg-success`;
      break;
    case "pending":
      color = `bg-warning`;
      break;
    case "processing":
      color = `bg-black`;
      break;
    case "shipped":
      color = `bg-black`;
      break;
    // Default
    default:
      color = `bg-danger`;
      break;
  } // close switch
  color = `${color} inline-flex items-center text-xs text-white px-2.5 py-0.5 rounded-full`;
  return color;
}; // close fxn

// HANDLE SUM TRANX AMT
export const handleSumTranxAmt = (objArr) => {
  // If empty args, return
  if (!objArr || objArr != "object") return;
  const newArr = objArr?.map((i) => i?.tranx_amt);
  return newArr?.reduce((a, b) => {
    return a + b;
  }, 0);
}; // close fnx

// HANDLE REMOVE OBJ PROP - SINGLE
export const handleRemoveObjProp = (
  propKey,
  { [propKey]: propValue, ...rest }
) => rest;

// HANDLE REMOVE OBJ PROP - BULK
export const handleBulkRemoveObjProp = (obj, ...keys) => {
  return keys?.length
    ? handleBulkRemoveObjProp(handleRemoveObjProp(keys?.pop(), obj), ...keys)
    : obj;
}; // close fxn

// HANDLE IS EMPTY FORM
export const handleIsEmptyForm = (obj, propsToRemove) => {
  // if empty args, return
  if (typeof obj !== "object" || !propsToRemove) return;
  // Define variables
  let isEmpty;
  const newObj = handleBulkRemoveObjProp(obj, ...propsToRemove); // Remove propsToRemove properties
  const objVal = Object.values(newObj); // Get values from obj
  isEmpty = objVal.includes(""); // Check if any objVal is empty
  return isEmpty;
}; // close fxn

// HANDLE TITLE CASE
export const handleTitleCase = (strVal) => {
  // If !strVal return
  if (!strVal) return;
  // Convert strVal to lowercase and split each word
  const finalVal = strVal?.toLowerCase()?.split(" ");
  // Loop finalVal and capitalize each word
  for (var i = 0; i < finalVal?.length; i++) {
    finalVal[i] = finalVal[i].charAt(0).toUpperCase() + finalVal[i].slice(1);
  } // close loop
  return finalVal?.join(" ");
}; // close fxn

// HANDLE IS POSTIVE NUMBER
export const handleIsPositiveNum = (val) => {
  // Define variables
  val = val || 0;
  if (Math?.sign(val) !== -1) {
    return true;
  } else {
    return false;
  } // close if
}; // close fxn

// HANDLE JAVASCRIPT DATE ADD DAYS
export const handleJsDateAddDays = (dateVal, days) => {
  // If empty args, return
  if (!dateVal || typeof days !== "number") return null;
  let result = new Date(dateVal);
  return result.setDate(result.getDate() + days);
}; // close fxn

// HANDLE DAYJS DIFFERENCE
export const handleDayJsDiff = (date1, date2, unit) => {
  // If empty args, return
  if (!date1 || !date2) return 0;
  date1 = dayjs(date1);
  date2 = dayjs(date2);
  unit = unit || "day";
  return date2?.diff(date1, unit);
}; // close fxn

// HANDLE DAYJS FROM X
export const handleDayJsFromX = (dateVal, showSuffix) => {
  // If empty args, return
  if (!dateVal) return;
  showSuffix = showSuffix || false;
  return dayjs().from(dateVal, showSuffix);
}; // close fxn

// HANDLE DAYJS FROM NOW
export const handleDayJsFromNow = (dateVal, showSuffix) => {
  // If empty args, return
  if (!dateVal) return;
  showSuffix = showSuffix || false;
  return dayjs(date).fromNow(showSuffix);
}; // close fxn

// HANDLE DAYJS BETWEEN
export const handleDayJsBetween = (date1, date2, date3, unit) => {
  // If empty args, return
  if (!date1 || !date2 || !date3) return;
  unit = unit || "day";
  return dayjs(date1).isBetween(date2, date3, unit);
}; // close fxn

// HANDLE DAYJS ENDOF
export const handleDayJsStartOf = (unit) => {
  // Define variables
  unit = unit || "day";
  const result = dayjs().startOf(unit);
  return handleDayJsFormat(result);
}; // close fxn

// HANDLE DAYJS STARTOF
export const handleDayJsEndOf = (unit) => {
  // Define variables
  unit = unit || "day";
  const result = dayjs().endOf(unit);
  return handleDayJsFormat(result);
}; // close fxn

// HANDLE DAYSJS ADD
export const handleDayJsAdd = (dateVal, units) => {
  // If empty args, return
  if (!dateVal) return null;
  units = units || "days";
  const result = dayjs().add(dateVal, units);
  return handleDayJsFormat(result);
}; // close fxn

// HANDLE DAYSJS SUBTRACT
export const handleDayJsSubtract = (dateVal, units) => {
  // If empty args, return
  if (!dateVal) return null;
  units = units || "days";
  const result = dayjs().subtract(dateVal, units);
  return handleDayJsFormat(result);
}; // close fxn

// HANDLE DAYSJS IS SAME
export const handleDayJsSame = (date1, date2, units) => {
  // If empty args, return
  if (!date1 || !date2) return null;
  units = units || "day";
  return dayjs(date1).isSame(date2, units);
}; // close fxn

// HANDLE DAYSJS IS AFTER
export const handleDayJsAfter = (date1, date2, units) => {
  date1 = date1 || handleDayJsFormat();
  date2 = date2 || handleDayJsFormat();
  units = units || "millisecond";
  return dayjs(date1).isAfter(date2, units);
}; // close fxn

// HANDLE DAYJS FORMAT
export const handleDayJsFormat = (dateVal, caseVal, formatVal) => {
  // Define variables
  dateVal = dateVal || undefined;
  formatVal = formatVal || "YYYY";
  // Switch caseVal
  switch (caseVal) {
    case 1:
      return dayjs.utc(dateVal).format("MMM D, YYYY");
    case 2:
      return dayjs.utc(dateVal).format("MMM D, YYYY h:mm A");
    case 3:
      return dayjs.utc(dateVal).format(formatVal);
    default:
      return dayjs.utc(dateVal).format();
  } // close switch
}; // close fxn

// HANDLE ITEM IS IN OBJECT ARRAY
export const handleItemIsInObjArr = (objArr, id) => {
  // If empty args, return
  if (!objArr || !id) return false;
  const checkIItem = objArr?.filter((i) => i?.id === id);
  return checkIItem?.length > 0;
}; // close fxn

// HANDLE ITEM IS IN ARRAY
export const handleItemIsInArr = (arr, val) => {
  // If empty args, return
  if (!arr || !val) return false;
  return arr?.includes(val);
}; // close fxn

// HANDLE ADD ITEM TO OBJECT ARRAY
export const handleAddItemToObjArr = (objArr, id, currItem) => {
  // If empty args, return
  if (!objArr || !id || !currItem) return [];
  // Check if item in objArr
  const objArrLen = objArr?.length;
  const isInObjArr = handleItemIsInObjArr(objArr, id);
  const newArr = isInObjArr
    ? objArr?.filter((i) => i?.id !== id)
    : [...objArr, currItem];
  // If objArrLen
  if (objArrLen > 0) {
    if (isInObjArr) {
      return newArr;
    } else {
      return newArr;
    } // close if
  } else {
    return newArr;
  } // close if
}; // close fxn

// HANDLE ADD ITEM TO ARRAY
export const handleAddItemToArr = (arr, currItem) => {
  // If empty args, return
  if (!arr || !currItem) return [];
  // Check if item in array
  const arrLen = arr?.length;
  const isInArr = handleItemIsInArr(arr, currItem);
  const newArr = isInArr
    ? arr?.filter((i) => i !== currItem)
    : [...arr, currItem];
  // If arrLen
  if (arrLen > 0) {
    if (isInArr) {
      return newArr;
    } else {
      return newArr;
    } // close if
  } else {
    return newArr;
  } // close if
}; // close fxn

// HANDLE GET SAVED ITEM
export const handleGetSavedItem = (objArr, id) => {
  // If empty args, return
  if (!objArr || !id) return;
  const getData = objArr?.filter((i) => i?.data?.id === id);
  const data = getData?.[0];
  const len = getData?.length;
  const isSaved = len > 0;
  const isActive = data?.status === "active";
  const isValid = isSaved && isActive;
  return { data, len, isSaved, isActive, isValid };
}; // close fxn

export const handleSplitByChar = (strVal, splitChar) => {
  // If empty args, return
  if (!strVal || !splitChar) return;
  const result = strVal?.split(splitChar);
  const first = result[0];
  const last = result[1];
  return { first, last };
}; // close fxn

// HANDLE IS SUPER ADMIN
export const handleIsSuperAdmin = (username) => {
  // If empty args, return
  if (!username) return;
  return username?.toLowerCase() === "klincoder";
}; // close fxn

// HANDLE GENERATE ARRAY
export const handleGenArr = (x) => {
  let arr = "";
  return [...Array(x).keys()].map(() => arr);
}; // close fxn

// HANDLE GENERATE OBJECT ARRAY
export const handleGenObjArr = (x) => {
  // If empty args, return
  if (!x) return;
  let obj = {};
  return [...Array(x).keys()].map(() => obj);
}; // close fxn

// HANDLE FORMAT NUMBER TO K,M,B
export function handleFormatNumberKMB(num, precision = 2) {
  // If empty args, return
  if (!num || typeof num !== "number") return;
  // Define variables
  const suffixArr = [
    { suffix: "T", threshold: 1e12 },
    { suffix: "B", threshold: 1e9 },
    { suffix: "M", threshold: 1e6 },
    { suffix: "K", threshold: 1e3 },
    { suffix: "", threshold: 1 },
  ];
  const selected = suffixArr.find((i) => Math.abs(num) >= i.threshold);
  if (selected) {
    return (num / selected.threshold).toFixed(precision) + selected.suffix;
  } // close if
  return num;
} // close fxn

// HANDLE PAGINATE ARRAY
export const handlePaginateArr = (objArr, currPage, perPageVal) => {
  // If empty args, return
  if (!objArr || typeof objArr !== "object") return;
  // Define variables
  const page = currPage || 1;
  const perPage = perPageVal || 12;
  const offset = (page - 1) * perPage;
  const objArrLen = objArr?.length;
  const paginatedItems = objArr?.slice(offset).slice(0, perPageVal);
  const totalPages = Math.ceil(objArrLen / perPage);
  return {
    page: page,
    perPage: perPage,
    prevPage: page - 1 ? page - 1 : null,
    nextPage: totalPages > page ? page + 1 : null,
    totalItems: objArrLen,
    totalPages: totalPages,
    data: paginatedItems,
  }; // close return
}; // close fxn

// HANDLE DUPLICATE ID
export const handleDuplicateId = (objArr) => {
  // If empty args, return
  if (typeof objArr !== "object") return;
  return [...new Map(objArr?.map((i) => [i?.id, i])).values()];
}; // close fxn

// HANDLE DUPLICATE NAME
export const handleDuplicateName = (objArr) => {
  // If empty args, return
  if (typeof objArr !== "object") return;
  return [...new Map(objArr?.map((i) => [i?.name, i])).values()];
}; // close fxn

// HANDLE GENERATE SLUG
export const handleGenSlug = (val) => {
  // If empty args, return
  if (!val) return "";
  val = val
    ?.trim()
    ?.toLowerCase()
    ?.replace(/[^a-zA-Z0-9 ]/g, "");
  val = val?.replace(/ /g, "-");
  return val;
}; // close fxn

// HANDLE HASH VAL
export const handleHashVal = async (action, rawVal, hashedVal) => {
  // If empty args, return
  if (!action || !rawVal) return null;
  return await axios({
    method: "POST",
    url: `${baseUrl}/api/hash`,
    data: { action, rawVal, hashedVal },
  }).then((res) => {
    return res?.data;
  }); // close return
}; // close fxn

// HANDLE IS EMAIL
export const handleIsEmail = (val) => {
  // If empty args return
  if (!val) return false;
  const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return pattern.test(val);
}; // close fxn

// HANDLE SUM CART SUBTOTAL
export const handleSumCartSubTotal = (objArr) => {
  // If empty args, return
  if (!objArr || objArr != "object") return;
  const newArr = objArr?.map((i) => i?.subTotal);
  return newArr?.reduce((a, b) => {
    return a + b;
  }, 0);
}; // close fxn

// HANDLE COPY TO CLIPBOARD
export const handleCopy2Cliip = async (val) => {
  // If empty args, return
  if (!val) return;
  return await Clipboard.setStringAsync(val);
}; // close fxn

// HANDLE PICK FILE
export const handlePickFile = async (
  currFiles,
  allowBulk,
  mediaType,
  editMedia
) => {
  // If empty args, return
  if (!currFiles) return;
  // Define variables
  mediaType = mediaType?.toLowerCase() || "image";
  allowBulk = allowBulk || false;
  const isAll = mediaType === "all";
  const isVideo = mediaType === "video";
  const isEditMedia = editMedia ? true : false;
  const finalMediaType = isAll
    ? ImagePicker.MediaTypeOptions.All
    : isVideo
    ? ImagePicker.MediaTypeOptions.Videos
    : ImagePicker.MediaTypeOptions.Images;
  // No permissions request is necessary for launching the image library
  // Try catch
  try {
    return await ImagePicker.launchImageLibraryAsync({
      mediaTypes: finalMediaType,
      allowsEditing: isEditMedia,
      allowsMultipleSelection: allowBulk,
      aspect: [4, 3],
      quality: 1,
    }).then((res) => {
      // Define variables
      const resData = res?.assets;
      const currFilesLen = currFiles?.length;
      const isSelected = res?.canceled === false;
      const isCurrFiles = currFilesLen > 0;
      const rawFiles = isCurrFiles ? [...currFiles, ...resData] : resData; // merge object arrays
      const files = [...new Set(rawFiles)]; // remove duplicates
      //console.log("Debug fxn 1: ", files);
      // If isSelected
      if (isSelected) {
        return files;
      } else {
        return files;
      } // close if
    }); // close return
  } catch (err) {
    //console.log("Debug handlePickFile: ", err.message);
  } // close try catch
}; // close fxn

// HANDLE REMOVE FILE
export const handleRemoveFile = (objArr, id) => {
  // If empty args, return
  if (!objArr || !id) return [];
  return objArr?.filter((i) => i?.assetId !== id);
}; // close fxn

// HANDLE UPLOAD FILE
export const handleUploadFile = async (files, username) => {
  // If empty args, return
  if (!files || !username) return;
  // Define variables
  let linksArr = [];
  // Upload files in a loop and get array of links
  await Promise.all(
    files?.map(async (item) => {
      // Define item variables
      const itemFile = item?.uri;
      // Create blob file
      const blobFile = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => resolve(xhr.response);
        xhr.onerror = () => reject(new TypeError("Network request failed"));
        xhr.responseType = "blob";
        xhr.open("GET", itemFile, true);
        xhr.send(null);
      });
      // Create file name
      const randomCode = handleRandomCode(4);
      const fileExt = "." + itemFile?.split(".").pop();
      const fileName = `file-${randomCode}${fileExt}`;
      // Create storage ref
      const storageRef = ref(fireStorage, `/${username}/${fileName}`);
      const uploadTask = await uploadBytesResumable(storageRef, blobFile);
      const url = await getDownloadURL(uploadTask.ref);
      linksArr.push(url);
    }) // close loop
  ); // close promise all
  //console.log("Debug uploadFile 3: ", linksArr);
  return linksArr;
}; // close fxn

// HANDLE GET LOCAL STORAGE
export const handleGetLocalStorage = async (key, type) => {
  // If empty args, return
  if (!key || typeof key !== "string") return null;
  type = type || "object";
  const result = await AsyncStorage.getItem(key);
  if (type === "object") {
    return result !== null ? JSON.parse(result) : null;
  } else {
    return result !== null ? result : null;
  } // close if
}; // close fxn

// HANDLE SET LOCAL STORAGE
export const handleSetLocalStorage = async (key, val, type) => {
  // If empty args, return
  if (!key || !val || typeof key !== "string") return null;
  type = type || "object";
  if (type === "object") {
    const jsonVal = JSON.stringify(val);
    await AsyncStorage.setItem(key, jsonVal);
  } else {
    await AsyncStorage.setItem(key, val);
  } // close if
}; // close fxn

// HANDLE REMOVE LOCAL STORAGE
export const handleRemoveLocalStorage = async (key) => {
  // If empty args, return
  if (!key || typeof key !== "string") return null;
  return await AsyncStorage.removeItem(key);
}; // close fxn

// HANDLE SORT STEP
export const handleSortStep = (objArr) => {
  // If empty args, return
  if (!objArr) return [];
  let tempArr = [...objArr];
  return tempArr?.sort((a, b) => (a?.step > b?.step ? 1 : -1));
}; // close fxn

// HANDLE SORT DATE CREATED
export const handleSortDateCreated = (objArr, type) => {
  // If empty args, return
  if (!objArr) return [];
  type = type || "desc";
  let tempArr = [...objArr];
  const isAsc = type === "asc";
  return tempArr?.sort((obj1, obj2) => {
    const date1 = new Date(obj1?.date_created);
    const date2 = new Date(obj2?.date_created);
    const result = isAsc
      ? Number(date1) - Number(date2)
      : Number(date2) - Number(date1);
    return result;
  }); // close loop
}; // close fxn

/****************
  PROJECT FXNS
*****************/
