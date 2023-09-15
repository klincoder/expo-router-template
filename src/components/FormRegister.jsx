// Import resources
import React, { useState } from "react";
import { View } from "react-native";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

// Import custom files
import routes from "src/config/routes";
import TestBtn from "src/components/TestBtn";
import CustomKeyboardView from "src/components/CustomKeyboardView";
import CustomText from "src/components/CustomText";
import useAppSettings from "src/hooks/useAppSettings";
import useAuthState from "src/hooks/useAuthState";
import useAlertState from "src/hooks/useAlertState";
import CustomAlertModal from "src/components/CustomAlertModal";
import CustomButton from "src/components/CustomButton";
import CustomInput from "src/components/CustomInput";
import CustomPhoneInput from "src/components/CustomPhoneInput";
import { fireDB, doc } from "src/config/firebase";
import {
  tw,
  alertMsg,
  baseUrl,
  appImages,
  appRegex,
} from "src/config/constants";
import {
  handleSendEmail,
  handleHashVal,
  handleGenUsername,
  handleTitleCase,
  handleSetDoc,
} from "src/config/functions";

// COMPONENT
const FormRegister = () => {
  // Define app settings
  const { router, siteInfo, todaysDate, routeQuery } = useAppSettings();

  // Define state
  const [hidePass, setHidePass] = useState(true);
  const [countryPhone, setCountryPhone] = useState(undefined);
  const { handleRegister } = useAuthState();

  // Define alert
  const alert = useAlertState();

  // Define params
  // const routeQuery = useGlobalSearchParams();

  // Define variables
  const callbackUrl = routeQuery?.callbackUrl;
  const destUrl = callbackUrl || routes.HOME;

  // FORM CONFIG
  // Initial values
  const initialValues = {
    fullName: "",
    emailAddr: "",
    phoneNum: "",
    pass: "",
  };

  // Validate
  const validate = Yup.object().shape({
    fullName: Yup.string()
      .required("Required")
      .min(1, "Too short")
      .max(60, "Too long"),
    emailAddr: Yup.string()
      .required("Required")
      .email("Invalid email address")
      .max(150, "Too long"),
    phoneNum: Yup.string().max(18, "Too long"),
    pass: Yup.string()
      .required("Required")
      .min(8, "Too short")
      .max(60, "Too long"),
  });

  // Form state
  const {
    control,
    formState: { isValid, isSubmitting },
    handleSubmit,
    reset,
    watch,
  } = useForm({
    mode: "all",
    defaultValues: initialValues,
    resolver: yupResolver(validate),
  }); // close form state

  // Form variables
  const formVal = watch();
  const dialCode = countryPhone?.callingCode;
  const phoneVal = formVal?.phoneNum?.trim()?.replace(appRegex.noSpace, "");

  // Debug
  //console.log("formRegister: ",);

  // FUNCTIONS
  // HANDLE SUBMIT FORM
  const handleSubmitForm = async (values) => {
    // Define variables
    const finalName = handleTitleCase(formVal?.fullName);
    const finalEmail = formVal?.emailAddr?.trim()?.toLowerCase();
    const finalPhone = `${dialCode} ${phoneVal}`;
    const finalPass = formVal?.pass?.trim();
    const finalUsername = handleGenUsername(finalEmail);

    // Debug
    //console.log("submitForm: ",);

    // Try catch
    try {
      // Create user
      const regRes = await handleRegister(finalEmail, finalPass, finalUsername);
      const regUserID = regRes?.uid;

      // If regUserID
      if (!regUserID) {
        alert.showAlert(alertMsg?.inValidCred);
        return;
      } else {
        // Hash pass
        const hashPass = await handleHashVal("hash", finalPass);
        const hashPassVal = hashPass?.data || null;

        // Add user to db
        const userRef = doc(fireDB, "users", regUserID);
        await handleSetDoc(userRef, {
          id: regUserID,
          role: "cms",
          full_name: finalName,
          email_address: finalEmail,
          phone_number: finalPhone,
          password: hashPassVal,
          username: finalUsername,
          avatar: appImages?.general,
          reg_method: "app",
          alerts: { app: true, email: true, sms: true },
          date_created: todaysDate,
          date_updated: todaysDate,
          status: "active",
          // Project specific
        });

        // Login user
        const loginRes = await handleLogin(finalEmail, finalPass);
        const loginResID = loginRes?.uid;

        // If loginUser
        if (!loginResID) {
          alert.showAlert(alertMsg?.generalErr);
          return;
        } else {
          // Send email
          const msgUser = { name: finalUsername, email: finalEmail };
          const msgAdmin = {
            name: siteInfo?.adminName,
            email: siteInfo?.adminEmail,
            newUser: finalUsername,
          };
          // await Promise.all([
          //   handleSendEmail(msgUser, emailTemp?.welcome),
          //   handleSendEmail(msgAdmin, emailTemp?.newUser,),
          // ]);

          // Alert succ
          reset();
          alert?.success(alertMsg?.registerSucc);
          router.push(destUrl);
        } // close if
      } // close if
    } catch (err) {
      alert.showAlert(alertMsg?.generalErr);
      //console.log("submitFormErr: ", err?.message);
    } // close try catch
  }; // close fxn

  // Return component
  return (
    <CustomKeyboardView>
      {/** Spinner */}
      <CustomAlertModal isSpinner visible={alert.loading || isSubmitting} />

      {/** Alert modal */}
      <CustomAlertModal
        visible={alert.visible}
        hideDialog={alert.hideAlert}
        content={alert.message}
        onCancel={alert.hideAlert}
      />

      {/** Full name */}
      <CustomInput
        control={control}
        name="fullName"
        label="Full Name*"
        placeholder="Enter full name"
        leftIconName="user"
        autoCapitalize="words"
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

      {/** Phone number */}
      <CustomPhoneInput
        control={control}
        name="phoneNum"
        label="Phone Number"
        placeholder="Enter phone number"
        selectedCountry={countryPhone}
        onSelectCountry={(val) => setCountryPhone(val)}
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
        title="Create Account"
        styleBtn={tw`mt-2`}
        onPress={handleSubmit(handleSubmitForm)}
        disabled={!isValid || isSubmitting}
      />

      {/** OTHER LINKS */}
      <View style={tw`flex items-center mt-6`}>
        {/** Login */}
        <CustomButton
          isText
          title="Already a member? Login"
          styleTitle={tw`mb-1 underline`}
          onPress={() => router.push(routes.LOGIN)}
        />
      </View>

      {/** Terms */}
      <CustomText
        style={tw`text-sm text-center text-gray/90 font-regular mb-2`}
      >
        By clicking on the create account button, I agree to the{" "}
        <CustomButton isUrl title="privacy" href={`${baseUrl}/privacy`} /> and{" "}
        <CustomButton isUrl title="terms" href={`${baseUrl}/terms`} /> policy.
      </CustomText>

      {/** TEST BUTTON */}
      {/* <TestBtn /> */}
    </CustomKeyboardView>
  ); // close return
}; // close component

// Export
export default FormRegister;
