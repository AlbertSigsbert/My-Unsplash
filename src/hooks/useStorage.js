import { useState, useEffect } from "react";
import { storage } from "../firebase/config";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { useUploadContext } from "./useUploadContext";
import { useFirestore } from "./useFirestore";
import { v4 as uuidv4 } from 'uuid';



const useStorage = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const {dispatch} = useUploadContext();
  const {addDocument} = useFirestore('images');

  const upload = (file,label) => {
   
    try {
      const randomId = uuidv4();
      const storageRef = ref(storage, `images/${randomId}-${file.name}`);
      // const storageRef = ref(storage, file.name);
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


          //Upload image to Firestore
          const uploadDoc = {label, url};

          addDocument(uploadDoc);

         
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

  const deleteImage = async (url) => {
    const imgRef = ref(storage, url);

    // Delete the file
    await deleteObject(imgRef);
  }

  useEffect(() => {
    return () => setIsCancelled(true);
 },[]);

  return { upload, deleteImage };
};

export default useStorage;
