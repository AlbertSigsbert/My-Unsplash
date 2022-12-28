import { UploadContext } from "../context/UploadContext";
import { useContext } from "react";

export const useUploadContext = () => {
  const context = useContext(UploadContext);

  if (!context) {
    throw Error("useUploadContext must be used inside UploadContextProvider");
  }
  
  return context;
};
