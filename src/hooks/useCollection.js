import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot } from "firebase/firestore";

export const useCollection = (collectionName) => {
  const [documents, setDocuments] = useState(null);
  const [errror, setError] = useState(null);

  useEffect(() => {
    let collectionRef = collection(db, collectionName);

    const unsubscribe = onSnapshot(
      collectionRef,
      (docs) => {
        let results = [];
        docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });

        //update state
        setDocuments(results);
        setError(null);
      },
      (err) => {
        setError("Could not fetch data");
      }
    );

    //unsub on unmount
    return () => unsubscribe();
  }, [collectionName]);

  return { documents, errror };
};
