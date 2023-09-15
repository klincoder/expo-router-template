// import resources
import React from "react";
import { Stack } from "expo-router";

// Import custom files
import { globalScreenOptions } from "src/config/constants";

// COMPONENT
const BlankLayout = () => {
  // Define variables
  const screenList = [
    {
      name: "index",
      options: { headerTitle: "Blank" },
    },
    {
      name: "[slug]",
      options: { headerTitle: "BlankDetails" },
    },
  ];

  // Return component
  return (
    <Stack initialRouteName="index" screenOptions={globalScreenOptions}>
      {/** Loop data */}
      {screenList?.map((item, index) => (
        <Stack.Screen
          key={`stack-${index + 1}`}
          name={item?.name}
          options={item?.options}
        />
      ))}
    </Stack>
  ); // close return
}; // closoe component

// Export
export default BlankLayout;
