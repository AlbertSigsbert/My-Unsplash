import { useEffect } from "react";
import { motion } from "framer-motion";
import { useUploadContext } from "../../hooks/useUploadContext";

function ProgressBar() {
  const { progress, url, dispatch } = useUploadContext();

  useEffect(() => {
    if (url) {
      dispatch({ type: "SET_PROGRESS", payload: 0 });
      // dispatch({type:'SET_URL', payload:null});
    }
  }, [url, dispatch]);

  if (progress <= 0) {
    return;
  }
  return (
    <motion.div

      initial={{ width: 0 }}
      animate={{ width: `${Math.round(progress)}%` }}
      className="relative h-1.5 bg-green-600 rounded-lg w-full"
    >
      <p className="absolute inset-0 text-center text-white font-semibold" style={{ left: `${Math.round(progress)}% / 2 `}}>{Math.round(progress)}%</p>
    </motion.div>

   
  );
}

export default ProgressBar;
