import { useState, useEffect, useRef } from "react";
import { db } from "../firebase/config";
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";

export const useCollection = (
  collectionName,
  _queryStr,
  _orderByStr,
  searchQuery
) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const queryStr = useRef(_queryStr).current;
  const order = useRef(_orderByStr).current;

  useEffect(() => {
    let collectionRef = collection(db, collectionName);

    if (queryStr) {
      collectionRef = query(collectionRef, where(...queryStr));
    }
    if (searchQuery !== "") {
      collectionRef = query(collectionRef, where("label", "==", searchQuery));
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
        if (results && results.length > 0) {
          setDocuments(results);
          setError(null);
          setMessage(null);
        }
         
        else{
          setDocuments(null);
          setError(null);
          setMessage("No Images found");

          if (searchQuery !== '') {
            const refresh = () => window.location.reload(true);
            setTimeout(() => {
              setMessage(null);
              refresh();
            }, 2000)
          }

        


        }
       
      },
      (err) => {
        console.log(err);
        setError("Could not fetch data");
      }
    );

    //unsub on unmount
    return () => unsubscribe();
  }, [collectionName, queryStr, searchQuery, order]);

  return { documents, error, message };
};
