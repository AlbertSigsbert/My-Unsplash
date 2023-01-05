import { useState, useEffect, useRef } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot, query, where, orderBy} from "firebase/firestore";

export const useCollection = (collectionName, _queryStr, _orderByStr) => {
  const [documents, setDocuments] = useState(null);
  const [errror, setError] = useState(null);

  const queryStr = useRef(_queryStr).current;
  const order = useRef(_orderByStr).current;

  useEffect(() => {
    let collectionRef = collection(db, collectionName);

    if (queryStr) {
      collectionRef = query(collectionRef, where(...queryStr));
    }
    if (order) {
      collectionRef = query(collectionRef, orderBy(...order));
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
        console.log(err);
        setError("Could not fetch data");
      }
    );

    //unsub on unmount
    return () => unsubscribe();
  }, [collectionName, queryStr, order]);

  return { documents, errror };
};
