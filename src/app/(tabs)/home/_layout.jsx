// import resources
import React from "react";
import { Stack } from "expo-router";

// Import custom files
import { tw, globalScreenOptions } from "src/config/constants";

// Component
const HomeLayout = () => {
  // Define screenList
  const screenList = [
    {
      name: "index",
      options: { headerTitle: "Home" },
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
export default HomeLayout;
