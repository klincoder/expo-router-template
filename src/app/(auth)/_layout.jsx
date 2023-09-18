// import resources
import React from "react";
import { Stack } from "expo-router";

// Import custom files

// Component
const AuthLayout = () => {
  // Define screenList
  const screenList = [
    {
      name: "login",
      options: { headerTitle: "Login" },
    },
    {
      name: "register",
      options: { headerTitle: "Register" },
    },
    {
      name: "recovery",
      options: { headerTitle: "Recovery" },
    },
    {
      name: "onboarding",
      options: { headerTitle: "Onboarding" },
    },
  ];

  // Return component
  return (
    <Stack screenOptions={{ headerShown: false }}>
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
export default AuthLayout;
