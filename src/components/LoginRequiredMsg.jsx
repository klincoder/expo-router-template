// Import resources
import React from "react";
import { View } from "react-native";

// Import custom files
import routes from "src/config/routes";
import useAppSettings from "src/hooks/useAppSettings";
import CustomAlertMsg from "src/components/CustomAlertMsg";
import CustomChip from "src/components/CustomChip";
import { tw } from "src/config/constants";

// COMPONENT
const LoginRequiredMsg = ({ showGuestBtn, onPressGuest }) => {
  // Define app settings
  const { router } = useAppSettings();

  // Debug
  //console.log("loginRequiredMsg: ",)

  // Return component
  return (
    <CustomAlertMsg
      title="Not Logged In?"
      description="Login or register to keep track of your orders, delivery & more."
      actions={
        <View style={tw`flex flex-row items-center justify-between`}>
          {/** Login */}
          <CustomChip
            isSolid
            title="Login / Register"
            styleContainer={tw`mr-3`}
            onPress={() => router.push(routes.LOGIN)}
          />
          {/** Continue as guest */}
          {/* {showGuestBtn && <CustomChip title="Guest" onPress={onPressGuest} />} */}
        </View>
      }
    />
  ); // close return
}; // close component

// Export
export default LoginRequiredMsg;
