import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore"; 


let initialState = {
   document:null,
   isPending:false,
   error:null,
   success:null
};

const firestoreReducer = (state, action) => {
   switch(action.type){
     case 'IS_PENDING':
      return {...state, isPending:true }
     default:
        return state
   }
};


export const useFirestore = (collectionName) => {
   const [response, dispatch] = useReducer(firestoreReducer, initialState);
   const [isCancelled, setIsCancelled] = useState(false);

  //collection ref
  const collectionRef = collection(db, collectionName);

  //add a document
  const addDocument = async (doc) => {
      dispatch({type:'IS_PENDING'})

      try {
         const addedDoc = await addDoc(collectionRef, doc);
         console.log("Document written with ID: ", addedDoc.id);

         if (!isCancelled) {
            dispatch({type:'ADDED_DOCUMENT'});
         }
       } catch (e) {
         console.error("Error adding document: ", e);
       }
  }

  //delete a document
  const deleteDocument = (id) => {

  }
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addDocument, deleteDocument, response };
};
