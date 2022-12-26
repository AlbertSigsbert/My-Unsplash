import { useState, useEffect } from "react";
import { auth, signOut } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {

  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const { dispatch } = useAuthContext();

  const logout = async () => {
    setError(null);
    setIsPending(true);

    try {
      //Sign out user
      await signOut(auth);

      //Dispatch a logout action
      dispatch({ type: "LOGOUT" });

     if (!isCancelled) {
      setIsPending(false);
      setError(null);
     }

    } 
    catch(err) {

      if (!isCancelled) {
      console.log(err.message);
      setError(err.message);
      setIsPending(false);
      }
    }
  };
  
  useEffect(() => {
     return () => setIsCancelled(true);
  },[]);
  
  return { logout, isPending, error };
};
