import { useEffect } from "react";
import { useUploadContext } from "../../hooks/useUploadContext";

function ProgressBar() {
  const { progress, url, dispatch } = useUploadContext();

  useEffect(() => {
    if(url){
        dispatch({type:'SET_PROGRESS', payload:0});
        // dispatch({type:'SET_URL', payload:null});
    }
  }, [url,dispatch]);

  if (progress <= 0 ) {
    return;
  }
  return (
    <div
      style={{ width: `${Math.round(progress)}%` }}
      className="h-1.5 bg-green-600 rounded-lg w-full"
    ></div>
  );
}

export default ProgressBar;
