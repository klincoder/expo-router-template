// Import resources
import { useState } from "react";
import { useRecoilState } from "recoil";

// Import custom files
import routes from "src/config/routes";
import useAppSettings from "src/hooks/useAppSettings";
import useAlertState from "src/hooks/useAlertState";
import { userAtom } from "src/config/atoms";
import { alertMsg, emailTemp } from "src/config/constants";
import { handleFireAdminAction, handleSendEmail } from "src/config/functions";
import {
  collection,
  createUserWithEmailAndPassword,
  fireAuth,
  fireDB,
  query,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  where,
} from "src/config/firebase";

// COMPONENT
const useAuthState = () => {
  // Define app settings
  const { router } = useAppSettings();

  // Define state
  const [user, setUser] = useRecoilState(userAtom);

  // Define alert
  const alert = useAlertState();

  // Define variables

  // Debug
  //console.log("useAuthState: ",);

  // FUNCTIONS
  // HANDLE LOGIN
  const handleLogin = async (email, pass) => {
    // If empty arg, return
    if (!email || !pass) return;
    return await signInWithEmailAndPassword(fireAuth, email, pass).then(
      async (res) => {
        // Get currSession
        const currSession = res?.user;
        // If !currSession
        if (!currSession?.uid) {
          return null;
        } else {
          return currSession;
        } // close if
      } // close res
    ); // close return
  }; // close fxn

  // HANDLE SEND VERIFY EMAIL LINK
  const handleSendVerifyEmailLink = async (emailAddr, username) => {
    // If empty arg, return
    if (!emailAddr || !username) return;
    const verifyLink = await handleFireAdminAction("verify-email", emailAddr);
    const msgUser = {
      to: { name: username, email: emailAddr },
      link: verifyLink,
    };
    return await handleSendEmail(msgUser, emailTemp?.verify);
  }; // close fxn

  // HANDLE REGISTER
  const handleRegister = async (emailAddr, pass, username) => {
    // If empty arg, return
    if (!emailAddr || !pass || !username) return;
    return await createUserWithEmailAndPassword(fireAuth, emailAddr, pass).then(
      async (res) => {
        await updateProfile(res.user, { displayName: username });
        //await handleSendVerifyEmailLink(username, email);
        return res.user;
      } // close res
    ); // close return
  }; // close fxn

  // HANDLE SEND PASSWORD RESET LINK
  const handleSendPassResetLink = async (emailAddr, username) => {
    // If empty args, return
    if (!emailAddr || !username) return;
    // Send password reset email
    return await sendPasswordResetEmail(fireAuth, emailAddr);
    // const verifyLink = await handleFireAdminAction("reset-pass", emailAddr);
    // const msgUser = {
    //   to: { name: username, email: emailAddr },
    //   link: verifyLink,
    // };
    // return await handleSendEmail(msgUser, emailTemp?.recovery);
  }; // close fxn

  // HANDLE LOGOU
  const handleLogout = async () => {
    // Return await response
    return await signOut(fireAuth).then(() => {
      setUser(null);
      alert.success(alertMsg?.logoutSucc);
      router.replace(routes.ONBOARDING);
    }); // close return
  }; // close fxn

  // Return component
  return {
    // State
    user,
    // Fxn
    setUser,
    handleLogin,
    handleRegister,
    handleLogout,
    handleSendVerifyEmailLink,
    handleSendPassResetLink,
  }; // close return
}; // close component

// Export
export default useAuthState;
