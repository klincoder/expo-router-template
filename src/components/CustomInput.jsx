// Import resources
import React from "react";
import { Input } from "@rneui/themed";
import { Controller } from "react-hook-form";

// Import custom files
import CustomText from "src/components/CustomText";
import CustomIcon from "src/components/CustomIcon";
import CustomHelperText from "src/components/CustomHelperText";
import { appColors, tw } from "src/config/constants";

// COMPONENT
const CustomInput = ({
  isNormal,
  label,
  name,
  control,
  value,
  placeholder,
  leftIconType,
  leftIconName,
  rightIconType,
  rightIconName,
  helperText,
  errMsg,
  styleContainer,
  styleInput,
  styleInputContainer,
  onChangeText,
  onPressLeftIcon,
  onPressRightIcon,
  ...rest
}) => {
  // Debug
  //console.log("customInput: ",);

  // Return component
  return (
    <>
      {/** IF IS NORMAL */}
      {isNormal ? (
        /********************
          UNCONTROLLED
        *********************/
        <Input
          {...rest}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder || `${label}`}
          containerStyle={[tw`-mb-3`, styleContainer]}
          errorStyle={(errMsg || helperText) && tw`mb-6`}
          inputStyle={tw`font-regular`}
          cursorColor={appColors.primary}
          leftIconContainerStyle={tw`pr-3`}
          disabledInputStyle={tw`opacity-50`}
          inputContainerStyle={[
            styleInputContainer,
            tw`px-2 -py-3 border rounded-lg`,
            errMsg && tw`border-danger`,
          ]}
          label={
            label && (
              <CustomText style={tw`mb-1 font-medium`}>{label}</CustomText>
            )
          }
          errorMessage={
            <>
              <CustomHelperText visible={helperText} title={helperText} />{" "}
              <CustomHelperText isError visible={errMsg} title={errMsg} />
            </>
          }
          leftIcon={
            <CustomIcon
              type={leftIconType || "antDesign"}
              name={leftIconName || "user"}
              onPress={onPressLeftIcon}
              style={tw`text-gray`}
            />
          }
          rightIcon={
            rightIconName && (
              <CustomIcon
                type={rightIconType || "antDesign"}
                name={rightIconName || "user"}
                onPress={onPressRightIcon}
                style={tw`text-gray`}
              />
            )
          }
        />
      ) : (
        /********************
          CONTROLLED 
        *********************/
        <Controller
          control={control}
          name={name}
          render={({ field, fieldState }) => (
            <Input
              {...rest}
              ref={field.ref}
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              placeholder={placeholder || `${label}`}
              containerStyle={[tw`-mb-3`, styleContainer]}
              errorStyle={(fieldState.error?.message || helperText) && tw`mb-6`}
              inputStyle={tw`w-full font-regular`}
              cursorColor={appColors.primary}
              leftIconContainerStyle={tw`pr-3`}
              disabledInputStyle={tw`opacity-50`}
              inputContainerStyle={[
                styleInputContainer,
                tw`px-2 border border-gray rounded-lg`,
                fieldState.error && tw`border-danger`,
              ]}
              label={
                label && (
                  <CustomText style={tw`mb-1 font-medium`}>{label}</CustomText>
                )
              }
              errorMessage={
                <>
                  <CustomHelperText visible={helperText} title={helperText} />{" "}
                  <CustomHelperText
                    isError
                    visible={fieldState.error}
                    title={fieldState.error?.message}
                  />
                </>
              }
              leftIcon={
                <CustomIcon
                  type={leftIconType || "antDesign"}
                  name={leftIconName || "user"}
                  onPress={onPressLeftIcon}
                  style={tw`text-gray`}
                />
              }
              rightIcon={
                rightIconName && (
                  <CustomIcon
                    type={rightIconType || "antDesign"}
                    name={rightIconName || "user"}
                    onPress={onPressRightIcon}
                    style={tw`text-gray`}
                  />
                )
              }
            /> // close input
          )} // close render
        /> // close controller
      )}
    </>
  ); // close return
}; // close component

// Export
export default CustomInput;
