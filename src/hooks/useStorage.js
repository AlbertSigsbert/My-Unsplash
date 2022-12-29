import { useState, useEffect } from "react";
import { storage } from "../firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useUploadContext } from "./useUploadContext";


const useStorage = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const {dispatch} = useUploadContext();

  const upload = (file) => {
   
    try {
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
           dispatch({type:'SET_PROGRESS', payload:percentage});
        },
        (err) => {
          dispatch({type:'SET_ERROR', payload:err})
        },
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          dispatch({type:'SET_URL', payload:url});
        }
      );

      if (!isCancelled) {
        dispatch({type:'SET_ERROR', payload:null});
      }
    } catch (err) {
      if (!isCancelled) {
        console.log(err.message);
        dispatch({type:'SET_ERROR', payload:err.message});
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
 },[]);

  return { upload };
};

export default useStorage;
