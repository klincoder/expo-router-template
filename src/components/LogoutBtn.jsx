// Import resources
import React from "react";

// Import custom files
import routes from "src/config/routes";
import CustomButton from "src/components/CustomButton";
import CustomAlertModal from "src/components/CustomAlertModal";
import CustomText from "src/components/CustomText";
import CustomIcon from "src/components/CustomIcon";
import useAlertState from "src/hooks/useAlertState";
import useAuthState from "src/hooks/useAuthState";
import useAppSettings from "src/hooks/useAppSettings";
import { tw, alertMsg } from "src/config/constants";

// COMPONENT
function LogoutBtn({ title, styleTitle, styleIcon, styleContainer }) {
  // Define app settings
  const { router } = useAppSettings();

  // Define state
  const { user, handleLogout } = useAuthState();

  // Define alert
  const alert = useAlertState();

  // Debug
  //console.log("logoutBtn: ")

  // FUNCTIONS
  // HANDLE LOGOUT BUTTON
  const handleLogoutBtn = () => {
    // If userID
    if (user?.id) {
      alert.showAlert(alertMsg?.logoutConfirm);
    } else {
      router.push(routes.LOGIN);
    } // close if
  }; // close fxn

  // Return component
  return (
    <>
      {/** Alert modal */}
      <CustomAlertModal
        visible={alert.visible}
        hideDialog={alert.hideAlert}
        content={alert.message}
        onCancel={alert.hideAlert}
        onConfirm={async () => {
          alert.hideAlert();
          await handleLogout();
        }}
      />

      {/** BUTTON */}
      <CustomButton
        isTouchable
        onPress={handleLogoutBtn}
        styleTouchable={[styleContainer, tw`flex-row items-center`]}
      >
        {/** Icon */}
        <CustomIcon
          type="materialIcons"
          name={user?.id ? "logout" : "login"}
          style={[styleIcon, tw`p-2 rounded-full`]}
        />
        {/** Title */}
        {title && (
          <CustomText style={[styleTitle, tw`text-lg font-regular ml-2`]}>
            {title}
          </CustomText>
        )}
      </CustomButton>
    </>
  ); // close return
} // close component

// Export
export default LogoutBtn;
