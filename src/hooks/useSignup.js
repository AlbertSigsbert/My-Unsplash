import { useState, useEffect } from "react";
import { auth, createUserWithEmailAndPassword, updateProfile  } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useSignUp = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (username, email, password, passwordConfirm) => {
    setError(null);
    setIsPending(true);

    try {
      //Validate passwords
      if (password !== passwordConfirm) {
        return setError("Passwords do not match");
      }

      //Signup user
      const res = await createUserWithEmailAndPassword(auth, email, password);
    

      if (!res) {
        throw new Error("Could not complete signup");
      }

      //Add username
      await updateProfile(res.user, { displayName: username });

      //Dispatch a login action
      dispatch({type:'LOGIN', payload:res.user});

      if(!isCancelled){
        setIsPending(false);
        setError(null);
      }

    } catch (err) {
      if(!isCancelled){
        console.log(err.message);
        setError(err.message);
        setIsPending(false);

      }
      
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
 },[]);

  return { signup, isPending, error };
};
