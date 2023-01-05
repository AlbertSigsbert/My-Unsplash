import { useState, useEffect, useRef } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot, query, where } from "firebase/firestore";

export const useCollection = (collectionName, _queryStr) => {
  const [documents, setDocuments] = useState(null);
  const [errror, setError] = useState(null);

  const queryStr = useRef(_queryStr).current;

  useEffect(() => {
    let collectionRef = collection(db, collectionName);

    if (queryStr) {
      collectionRef = query(collectionRef, where(...queryStr));
    }

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
  }, [collectionName, queryStr]);

  return { documents, errror };
};
