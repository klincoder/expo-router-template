// Import resources
import React from "react";
import { View } from "react-native";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

// Import custom files
import routes from "src/config/routes";
import CustomKeyboardView from "src/components/CustomKeyboardView";
import useAppSettings from "src/hooks/useAppSettings";
import useAuthState from "src/hooks/useAuthState";
import useAlertState from "src/hooks/useAlertState";
import CustomAlertModal from "src/components/CustomAlertModal";
import CustomButton from "src/components/CustomButton";
import CustomInput from "src/components/CustomInput";
import { tw, alertMsg } from "src/config/constants";
import { handleGetUserEmail } from "src/config/functions";

// COMPONENT
const FormPasswordRecovery = () => {
  // Define app settings
  const { router } = useAppSettings();

  // Define state
  const { handleSendPassResetLink } = useAuthState();

  // Define alert
  const alert = useAlertState();

  // FORM CONFIG
  // Initial values
  const initialValues = {
    emailAddr: "",
  };

  // Validate
  const validate = Yup.object({
    emailAddr: Yup.string()
      .required("Required")
      .email("Invalid email address")
      .max(150, "Too long"),
  });

  // Form state
  const {
    control,
    formState: { isValid, isSubmitting },
    handleSubmit,
    watch,
    reset,
  } = useForm({
    mode: "all",
    defaultValues: initialValues,
    resolver: yupResolver(validate),
  }); // close form state

  // Form variables
  const formVal = watch();

  // Debug
  //console.log("Debug formPasswordRecovery: ",)

  // FUNCTIONS
  // HANDLE SUBMIT FORM
  const handleSubmitForm = async (values) => {
    // Define variables
    const finalEmail = formVal?.emailAddr?.trim()?.toLowerCase();
    const userInfo = await handleGetUserEmail(finalEmail);
    const finalUsername = userInfo?.username;

    // Debug
    //console.log("submitForm: ", values);

    // Try catch
    try {
      // Send recovery link
      await handleSendPassResetLink(finalEmail, finalUsername);

      // Alert succ
      reset();
      alert.showAlert(alertMsg?.passRecoverySucc);
    } catch (err) {
      alert.showAlert(alertMsg?.generalErr);
      //console.log("submitFormErr: ", err.message);
    } // close try catch
  }; // close submit form

  // Return component
  return (
    <CustomKeyboardView>
      {/** Spinner */}
      <CustomAlertModal isSpinner visible={alert.loading || isSubmitting} />

      {/** Alert modal */}
      <CustomAlertModal
        visible={alert.visible}
        hideDialog={alert.hideAlert}
        onCancel={alert.hideAlert}
        content={alert.message}
      />

      {/** Email address */}
      <CustomInput
        control={control}
        name="emailAddr"
        label="Email Address*"
        placeholder="Enter email address"
        leftIconType="feather"
        leftIconName="mail"
        autoCapitalize="none"
        keyboardType="email-address"
      />

      {/** Submit button */}
      <CustomButton
        isNormal
        title="Send Recovery Link"
        styleBtn={tw`mt-2`}
        onPress={handleSubmit(handleSubmitForm)}
        disabled={!isValid || isSubmitting || alert?.loading}
      />

      {/** OTHER LINKS */}
      <View style={tw`flex items-center mt-2.5 mb-1`}>
        {/** Login */}
        <CustomButton
          isText
          title="Back to Login"
          onPress={() => router.push(routes.LOGIN)}
        />
      </View>
    </CustomKeyboardView>
  ); // close return
}; // close component

// Export
export default FormPasswordRecovery;
