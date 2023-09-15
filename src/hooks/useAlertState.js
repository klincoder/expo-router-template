// Import resources
import { useState, useCallback } from "react";
import { useRecoilState } from "recoil";
import Toast from "react-native-toast-message";

// Import custom files
import { loadingDataAtom } from "src/config/atoms";

// COMPONENT
const useAlertState = () => {
  // Define state
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState();
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useRecoilState(loadingDataAtom);

  // Debug
  //console.log("Debug useAlertState: ")

  // FUNCTIONS
  // HANDLE SHOW ALERT
  const showAlert = useCallback((msg) => {
    setMessage(msg);
    setVisible(true);
  }, []); // close fxn

  // HANDLE HIDE ALERT
  const hideAlert = useCallback(() => setVisible(false), []);

  // SHOW LOADING
  const showLoading = useCallback(() => setLoading(true), []);

  // HIDE LOADING
  const hideLoading = useCallback(() => setLoading(false), []);

  // SHOW LOADING DATA
  const showLoadingData = useCallback(() => setLoadingData(true), []);

  // HIDE LOADING DATA
  const hideLoadingData = useCallback(() => setLoadingData(false), []);

  // HANDLE TOAST SUCCESS
  const success = useCallback((msg) => {
    Toast.show({
      type: "success",
      position: "top",
      text1: "Success",
      text2: msg,
      visibilityTime: 5000,
      autoHide: true,
      topOffset: 10,
      bottomOffset: 50,
    });
  }, []); // close fxn

  // HANDLE TOAST ERROR
  const error = useCallback((msg) => {
    Toast.show({
      type: "error",
      position: "top",
      text1: "Error",
      text2: msg,
      visibilityTime: 5000,
      autoHide: true,
      topOffset: 10,
      bottomOffset: 50,
    });
  }, []); // close fxn

  // HANDLE TOAST INFO
  const info = useCallback((msg) => {
    Toast.show({
      type: "info",
      position: "top",
      text1: "Info",
      text2: msg,
      visibilityTime: 5000,
      autoHide: true,
      topOffset: 10,
      bottomOffset: 50,
    });
  }, []); // close fxn

  // Return component
  return {
    // State
    visible,
    message,
    hasError,
    loading,
    loadingData,
    // Fxns
    success,
    error,
    info,
    setMessage,
    setHasError,
    showAlert,
    hideAlert,
    showLoading,
    hideLoading,
    showLoadingData,
    hideLoadingData,
  }; // close retun
}; // close component

// Export
export default useAlertState;
