// import resources
import { Redirect, useRootNavigationState } from "expo-router";

// Import custom files
import routes from "src/config/routes";

// COMPONENT
const StartScreen = () => {
  // Define state
  const rootNavState = useRootNavigationState();

  // Define variables
  const isRootNavKey = rootNavState?.key !== undefined;

  // Debug
  //console.log("startScreen: ",);

  // If root nav
  if (!isRootNavKey) return null;

  // Return component
  return <Redirect href={routes.HOME} />;
}; // closoe component

// Export
export default StartScreen;
