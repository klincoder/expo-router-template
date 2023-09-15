// Import resources
import React from "react";
import { Chip } from "@rneui/themed";

// Import custom files
import { tw } from "src/config/constants";

// COMPONENT
const CustomChip = ({
  title,
  onPress,
  isSolid,
  styleBtn,
  styleContainer,
  styleTitle,
  ...rest
}) => {
  // Debug
  //console.log("customChip: ",);

  // Return component
  return (
    <>
      {/** If isSolid */}
      {isSolid ? (
        <Chip
          {...rest}
          type="solid"
          title={title || "Title"}
          onPress={onPress}
          buttonStyle={styleBtn || tw`bg-primary border border-primary`}
          titleStyle={styleTitle || tw`text-white font-medium`}
          containerStyle={styleContainer}
        />
      ) : (
        <Chip
          {...rest}
          type="outline"
          title={title || "Title"}
          onPress={onPress}
          buttonStyle={styleBtn || tw`bg-white border border-gray`}
          titleStyle={[styleTitle || tw`text-black font-medium`]}
          containerStyle={[styleContainer]}
        />
      )}
    </>
  ); // close return
}; // close component

// Export
export default CustomChip;
