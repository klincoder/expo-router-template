// Import resources
import React, { useState } from "react";
import { View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

// Import custom files
import CustomText from "src/components/CustomText";
import CustomListItem from "src/components/CustomListItem";
import { tw } from "src/config/constants";
import { handleDayJsFormat } from "src/config/functions";

// COMPONENT
const CustomTimePicker = ({
  label,
  value,
  leftIconType,
  leftIconName,
  minTime,
  maxTime,
  onValueChange,
  sheetRef,
  snapPoints,
  styleContainer,
  ...rest
}) => {
  // Define state
  const [showTime, setShowTime] = useState(false);
  const [timeVal, setTimeVal] = useState(new Date());
  const [isSelected, setIsSelected] = useState(false);

  // Define variables
  const timeStr = isSelected
    ? handleDayJsFormat(timeVal, 4)
    : value
    ? handleDayJsFormat(value, 4)
    : "Click to pick time";

  // Debug
  //console.log("customTimePicker: ",)

  // FUNCTIONS
  // HANDLE SHOW TIME
  const handleShowTime = () => {
    setShowTime(true);
  }; // close fxn

  // HANDLE CHANGE TIME
  const handleChangeTime = (e, selectedTime) => {
    setShowTime(false);
    setIsSelected(true);
    onValueChange(selectedTime);
    setTimeVal(selectedTime);
  }; // close fxn

  // Return component
  return (
    <View style={[tw`mb-3`, styleContainer]}>
      {/** Label */}
      {label && (
        <CustomText style={tw`mb-1 mx-1 font-medium`}>{label}</CustomText>
      )}

      {/** Time picker */}
      <CustomListItem
        {...rest}
        hideDivider
        title={timeStr || "Pick time"}
        onPress={handleShowTime}
        leftIconType={leftIconType}
        leftIconName={leftIconName || "clockcircleo"}
        styleContainer={tw`mx-1 border`}
      />

      {/** MODAL */}
      {showTime && (
        <DateTimePicker
          mode="time"
          value={timeVal}
          onChange={handleChangeTime}
        />
      )}
    </View>
  ); // close return
}; // close component

// Export
export default CustomTimePicker;
