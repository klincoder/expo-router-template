// Import resources
import React, { useCallback, useRef } from "react";
import { View } from "react-native";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";

// Import custom files
import CustomText from "src/components/CustomText";
import useAppSettings from "src/hooks/useAppSettings";
import useAuthState from "src/hooks/useAuthState";
import useAlertState from "src/hooks/useAlertState";
import CustomKeyboardView from "src/components/CustomKeyboardView";
import CustomAlertModal from "src/components/CustomAlertModal";
import CustomInput from "src/components/CustomInput";
import CustomSelect from "src/components/CustomSelect";
import CustomListItem from "src/components/CustomListItem";
import CustomButton from "src/components/CustomButton";
import { alertMsg, tw } from "src/config/constants";

// COMPONENT
const BlankForm = ({ rowData }) => {
  // Define app settings
  const { router, todaysDate, snaps } = useAppSettings();

  // Define state
  const { user } = useAuthState();

  // Define ref
  const statusRef = useRef(null);

  // Define alert
  const alert = useAlertState();

  // Define variables
  const rowID = "";

  // FORM CONFIG
  // Initial values
  const initialValues = {
    fullName: rowData?.full_name || "",
  };

  // Validate
  const validate = Yup.object().shape({
    fullName: Yup.string()
      .required("Required")
      .min(3, "Too short")
      .max(60, "Too long"),
  });

  // Form state
  const {
    control,
    formState: { errors, isValid, isSubmitting },
    handleSubmit,
    trigger,
    setValue,
    watch,
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: initialValues,
    resolver: yupResolver(validate),
  }); // close form state

  // Form variables
  const formVal = watch();

  // Debug
  //console.log("blankForm: ", );

  // FUNCTIONS
  // HANDLE OPEN SHEET
  const handleToggleSheet = useCallback((action, inputName) => {
    // If empty args, return
    if (!action || !inputName) return;
    // Define variables
    const isOpen = action === "open";
    // Switch inputName
    switch (inputName) {
      case "status":
        isOpen ? statusRef.current?.present() : statusRef.current?.close();
        break;
    } // close switch
  }, []); // close fxn

  // HANDLE SUBMIT FORM
  const handleSubmitForm = async (values) => {
    // Define variables
    const fullName = formVal?.fullName?.trim();

    // Debug
    //console.log("submitForm: ", );

    // Try catch
    try {
      // If rowID
      if (rowID) {
        // Edit doc
        // Alert succ
        alert.success(alertMsg?.editSucc);
        router.back();
      } else {
        // Add doc
        // Alert succ
        alert.success(alertMsg?.createSucc);
      } // close if
    } catch (err) {
      alert.showAlert(alertMsg?.generalErr);
      //console.log("submitFormErr: ", err.message);
    } // close try catch
  }; // close fxn

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

      {/** Full name */}
      <CustomInput
        control={control}
        name="fullName"
        label="Full Name*"
        placeholder="Enter full name"
        leftIconName="user"
        autoCapitalize="words"
      />

      {/** Status */}
      <CustomSelect
        name="status"
        label="Status*"
        placeholder="Choose status"
        leftIconType="antDesign"
        leftIconName="flag"
        value={formVal?.status?.title}
        onPress={() => handleToggleSheet("open", "status")}
        errMsg={errors?.status?.message}
        sheetRef={statusRef}
        snapPoints={snaps?.small}
        sheetContent={
          <BottomSheetFlatList
            data={[{ id: "123", title: "Active" }]}
            keyExtractor={(i) => i?.id}
            renderItem={({ item }) => (
              <CustomListItem
                key={item?.id}
                title={item?.title}
                isSelected={formVal?.status?.title === item?.title}
                onPress={() => {
                  handleToggleSheet("close", "status");
                  setValue("status", item);
                  trigger("status");
                }}
              />
            )}
          />
        }
      />

      {/** Submit button */}
      <CustomButton
        isNormal
        title={rowID ? "Save Changes" : "Create"}
        onPress={handleSubmit(handleSubmitForm)}
        disabled={!isValid || isSubmitting}
      />
    </CustomKeyboardView>
  ); // close return
}; // close component

// Export
export default BlankForm;
