import { useState } from "react";
import { auth, createUserWithEmailAndPassword, updateProfile  } from "../firebase/config";

export const useSignUp = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

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
      console.log(res.user);

      if (!res) {
        throw new Error("Could not complete signup");
      }

      //Add username
      await updateProfile(res.user, { displayName: username });

      setIsPending(false);
      setError(null);

    } catch (err) {
      setIsPending(false);
      console.log(err.message);
      setError(err.message);
      
    }
  };

  return { signup, isPending, error };
};
