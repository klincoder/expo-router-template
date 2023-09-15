// Import resources
import React from "react";

// Import custom files
import CustomAlertMsg from "src/components/CustomAlertMsg";

// COMPONENT
const NoInternetMsg = () => {
  // Return component
  return (
    <CustomAlertMsg
      title="No Internet Connection"
      description="Please connect to a wifi or cellular data network to continue."
      iconType="materialIcons"
      iconName="wifi-off"
    />
  ); // close return
}; // close component

// Export
export default NoInternetMsg;
