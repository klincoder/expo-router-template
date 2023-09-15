// Import resources
import React, { useState } from "react";
import { View } from "react-native";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

// Import custom files
import routes from "src/config/routes";
import useAppSettings from "src/hooks/useAppSettings";
import useAuthState from "src/hooks/useAuthState";
import useAlertState from "src/hooks/useAlertState";
import CustomKeyboardView from "src/components/CustomKeyboardView";
import CustomAlertModal from "src/components/CustomAlertModal";
import CustomInput from "src/components/CustomInput";
import CustomButton from "src/components/CustomButton";
import LoginOAuth2Btn from "src/components/LoginOAuth2Btn";
import { alertMsg, tw, emailTemp } from "src/config/constants";

// COMPONENT
const FormLogin = () => {
  // Define app settings
  const { router, routeQuery } = useAppSettings();

  // Define state
  const [hidePass, setHidePass] = useState(true);
  const { handleLogin } = useAuthState();

  // Define alert
  const alert = useAlertState();

  // Define variables
  const callbackUrl = routeQuery?.callbackUrl;
  const destUrl = callbackUrl || routes.HOME;

  // FORM CONFIG
  // Initial values
  const initialValues = {
    emailAddr: "",
    pass: "",
  };

  // Validate
  const validate = Yup.object({
    emailAddr: Yup.string()
      .required("Required")
      .email("Invalid email address")
      .max(150, "Too long"),
    pass: Yup.string().required("Required").min(8, "Too short"),
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
  //console.log("formLogin: ", );

  // HANDLE SUBMIT FORM
  const handleSubmitForm = async (values) => {
    // Define variables
    const finalEmail = formVal?.emailAddr?.trim()?.toLowerCase();
    const finalPass = formVal?.pass?.trim();

    // Debug
    //console.log("submitForm: ",);

    // Try catch
    try {
      // Login user
      const currUser = await handleLogin(finalEmail, finalPass);

      // If !currUser
      if (!currUser?.uid) {
        alert.showAlert(alertMsg?.inValidCred);
        return;
      } else {
        // Send email
        // const msgUser = { name: finalUsername, email: finalEmail }
        // await handleSendEmail(msgUser, emailTemp.login);

        // Alert succ
        reset();
        alert.success(alertMsg?.loginSucc);
        router.replace(destUrl);
      } // close if
    } catch (err) {
      alert.showAlert(alertMsg?.inValidCred);
      //console.error("submitFormErr: ", err.message);
    } // close try catch
  }; // close submit form

  // Return component
  return (
    <CustomKeyboardView>
      {/** Spinner */}
      <CustomAlertModal isSpinner visible={isSubmitting || alert.loading} />

      {/** Alert modal */}
      <CustomAlertModal
        visible={alert.visible}
        hideDialog={alert.hideAlert}
        onCancel={alert.hideAlert}
        content={alert.message}
      />

      {/** Email Address */}
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

      {/** Password */}
      <CustomInput
        control={control}
        name="pass"
        label="Password*"
        placeholder="Enter password"
        leftIconName="lock"
        rightIconType="feather"
        rightIconName={hidePass ? "eye" : "eye-off"}
        onPressRightIcon={() => setHidePass(!hidePass)}
        secureTextEntry={hidePass}
        autoCapitalize="none"
      />

      {/** Submit button */}
      <CustomButton
        isNormal
        title="Login"
        styleBtn={tw`mt-2`}
        onPress={handleSubmit(handleSubmitForm)}
        disabled={!isValid || isSubmitting || alert.loading}
      />

      {/** OTHER LINKS */}
      <View style={tw`flex items-center justify-center mt-2.5`}>
        {/** Forgot password */}
        <CustomButton
          isText
          title="Forgot Password?"
          styleTitle={tw`underline mb-1`}
          onPress={() => router.push(routes.PASS_RECOVERY)}
        />
        {/** Register */}
        <CustomButton
          isText
          title="Not a Member? Register"
          styleTitle={tw`underline`}
          onPress={() => router.push(routes.REGISTER)}
        />
      </View>

      {/** OAUTH2 BUTTONS */}
      {/* <LoginOAuth2Btn isDemo onPress={async () => {}} /> */}
    </CustomKeyboardView>
  ); // close return
}; // close component

// Export
export default FormLogin;
