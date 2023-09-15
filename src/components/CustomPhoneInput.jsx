// Import resources
import React from "react";
import { View } from "react-native";
import { Controller } from "react-hook-form";
import { PhoneInput } from "react-native-international-phone-number";

// Import custom files
import CustomText from "src/components/CustomText";
import CustomHelperText from "src/components/CustomHelperText";
import { appColors, tw } from "src/config/constants";

// COMPONENT
const CustomPhoneInput = ({
  isNormal,
  disableModal,
  label,
  name,
  control,
  value,
  selectedCountry,
  placeholder,
  defaultVal,
  helperText,
  errMsg,
  styleContainer,
  styleInput,
  styleInputContainer,
  onChange,
  onSelectCountry,
  ...rest
}) => {
  // Define variables
  defaultVal = defaultVal || "+233";
  disableModal = disableModal || true;

  // Debug
  //console.log("customPhoneInput: ", );

  // Return component
  return (
    <View style={tw`mb-4 mx-3`}>
      {/** Label */}
      {label && <CustomText style={tw`mb-1 font-medium`}>{label}</CustomText>}

      {/** IF IS NORMAL */}
      {isNormal ? (
        /********************
          UNCONTROLLED
        *********************/
        <>
          <PhoneInput
            {...rest}
            value={value}
            onChangePhoneNumber={onChange}
            selectedCountry={selectedCountry}
            onChangeSelectedCountry={onSelectCountry}
            placeholder={placeholder || `${label}`}
          />

          {/** Helper text */}
          <CustomHelperText visible={helperText} title={helperText} />

          {/** Error message */}
          <CustomHelperText isError visible={errMsg} title={errMsg} />
        </>
      ) : (
        /********************
          CONTROLLED 
        *********************/
        <Controller
          control={control}
          name={name}
          render={({ field, fieldState }) => (
            <>
              <PhoneInput
                {...rest}
                value={field.value}
                onChangePhoneNumber={field.onChange}
                onBlur={field.onBlur}
                selectedCountry={selectedCountry}
                onChangeSelectedCountry={onSelectCountry}
                defaultValue={defaultVal}
                modalDisabled={disableModal}
                placeholder={placeholder || `${label}`}
                cursorColor={appColors.primary}
                placeholderTextColor={appColors.gray}
                containerStyle={[
                  styleInputContainer,
                  fieldState.error && tw`border-danger mb-1`,
                ]}
                inputStyle={[
                  styleInput,
                  tw`text-base text-black font-regular -pl-24`,
                ]}
              />

              {/** Helper text */}
              <CustomHelperText visible={helperText} title={helperText} />

              {/** Error message */}
              <CustomHelperText
                isError
                visible={fieldState.error}
                title={fieldState.error?.message}
              />
            </>
          )} // close render
        /> // close controller
      )}
    </View>
  ); // close return
}; // close component

// Export
export default CustomPhoneInput;
