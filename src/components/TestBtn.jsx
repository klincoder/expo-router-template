// Import resources
import React from "react";
import { View } from "react-native";

// Import custom files
import CustomText from "src/components/CustomText";
import useAppSettings from "src/hooks/useAppSettings";
import useAuthState from "src/hooks/useAuthState";
import CustomButton from "src/components/CustomButton";
import useAlertState from "src/hooks/useAlertState";
import CustomAlertModal from "src/components/CustomAlertModal";
import { handleGetAppSettings } from "src/config/functions";

// COMPONENT
const TestBtn = () => {
  // Define app settings
  const { router } = useAppSettings();

  // Define state
  const { user } = useAuthState();

  // Define alert
  const alert = useAlertState();

  // Define variables
  const msgUser = {
    role: "user",
    toName: "testUsername",
    toEmail: "klincoder92@gmail.com",
  };

  // Debug
  //console.log("testBtn: ", );

  // Return component
  return (
    <View>
      {/** Spinner */}
      <CustomAlertModal isSpinner visible={alert.loading} />

      {/** Button */}
      <CustomButton
        isNormal
        title="Test Button"
        onPress={async () => {
          // Try catch
          try {
            alert.showLoading();

            // Get data
            //const res = await handleSendEmail(userEmailMsg, apiRoutes.welcome);
            const res = await handleGetAppSettings();

            // Debug
            console.log("testFxn: ", res);
            alert.hideLoading();
          } catch (err) {
            alert.hideLoading();
            console.log("testFxnErr: ", err.message);
          } // close try catch
        }}
      />
    </View>
  ); // close return
}; // close component

// Export
export default TestBtn;
