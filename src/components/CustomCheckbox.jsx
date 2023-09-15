// Import resources
import React from "react";
import { View } from "react-native";

// Import custom files
import CustomText from "src/components/CustomText";
import CustomHelperText from "src/components/CustomHelperText";
import CustomChip from "src/components/CustomChip";
import { tw } from "src/config/constants";
import { handleItemIsInArr, handleItemIsInObjArr } from "src/config/functions";

// COMPONENT
const CustomCheckbox = ({
  isObjArr,
  label,
  value,
  data,
  onPress,
  errMsg,
  helperText,
  ...rest
}) => {
  // Debug
  //console.log("customCheckbox: ",)

  // Return component
  return (
    <View style={tw`mb-3`}>
      {/** Label */}
      {label && (
        <CustomText style={tw`mb-1 mx-3 font-medium`}>{label}</CustomText>
      )}

      {/** Data */}
      <View style={tw`flex flex-row flex-wrap mx-2`}>
        {/** If isObjArr */}
        {isObjArr
          ? data?.map((item, index) => (
              <CustomChip
                key={`${label}${index + 1}`}
                title={item?.title || "Title"}
                isSolid={handleItemIsInObjArr(value, item?.id)}
                onPress={() => onPress(item)}
                styleContainer={tw`m-1`}
              />
            ))
          : data?.map((item, index) => (
              <CustomChip
                key={`${label}${index + 1}`}
                title={item || "Title"}
                isSolid={handleItemIsInArr(value, item)}
                onPress={() => onPress(item)}
                styleContainer={tw`m-1`}
              />
            ))}
      </View>

      {/** Helper text */}
      <CustomHelperText visible={helperText} title={helperText} />

      {/** Error message */}
      <CustomHelperText isError visible={errMsg} title={errMsg} />
    </View>
  ); // close return
}; // close component

// Export
export default CustomCheckbox;
