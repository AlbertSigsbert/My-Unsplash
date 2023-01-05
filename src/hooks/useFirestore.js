import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, serverTimestamp, deleteDoc, doc } from "firebase/firestore";
import { useAuthContext } from "./useAuthContext";



let initialState = {
   document:null,
   isPending:false,
   error:null,
   success:null
};

const firestoreReducer = (state, action) => {
   switch(action.type){
     case 'IS_PENDING':
      return {isPending:true, document:null, success:false, error:null }
     case 'ADDED_DOCUMENT':
      return {isPending:false, document:action.payload, success:true, error:null }
     case 'DELETED_DOCUMENT':
      return {isPending:false, document:null, success:true, error:null }
     case 'ERROR':
      return {isPending:false, document:null, success:false, error:action.payload }
     default:
        return state
   }
};


export const useFirestore = (collectionName) => {
   const [response, dispatch] = useReducer(firestoreReducer, initialState);
   const [isCancelled, setIsCancelled] = useState(false);
   const {user} = useAuthContext();

  //collection ref
  const collectionRef = collection(db, collectionName);

  //add a document
  const addDocument = async (doc) => {
      dispatch({type:'IS_PENDING'})

      try {
         const createdAt = serverTimestamp();

         const addedDoc = await addDoc(collectionRef, {...doc, createdAt, uid: user.uid});
         // console.log("Document written with ID: ", addedDoc.id);

         if (!isCancelled) {
            dispatch({type:'ADDED_DOCUMENT', payload: addedDoc});
         }
       } catch (e) {
        if(!isCancelled){
          dispatch({type:'ERROR', payload: e.message});
        }
       }
  }

  //delete a document
  const deleteDocument = async (id) => {

   dispatch({type:'IS_PENDING'})

   try {
      const docRef = doc(db,collectionName,id);
     
     await deleteDoc(docRef);

      if (!isCancelled) {
          dispatch({type:'DELETED_DOCUMENT'});
      }
    } catch (e) {
     if(!isCancelled){
       dispatch({type:'ERROR', payload:'Could not delete Image'});
     }
    }

  }

  
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addDocument, deleteDocument, response };
};
