import { motion } from "framer-motion";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useModalContext } from "../../hooks/useModalContext";
import { useCollection } from "../../hooks/useCollection";
import zoomInIcon from "../../assets/zoom-in.png";
import { useSearchContext } from "../../hooks/useSearchContext";


function Grid(props) {

  const { user } = useAuthContext();
  const { dispatch } = useModalContext();
  const { searchQuery } = useSearchContext();

  const {
    documents: images,
    error,
    message,
  } = useCollection(
    "images",
    ["uid", "==", user.uid],
    ["createdAt", "desc"],
    searchQuery
  );


  return (
    <>
      {error && (
        <div
          className="p-4 my-4 font-semibold font-montserrat  text-red-700 bg-red-200 rounded-lg"
          role="alert"
        >
          <span className="font-bold text-ld">Error! </span>
          {error}
        </div>
      )}

      {message && (
        <div className="p-4 my-4  text-white font-semibold font-montserrat text-center bg-blue-300 rounded-lg">
          <span className="font-bold text-lg">Message! </span>
          {message}
        </div>
      )}

      {images && (
        <motion.div
          layout
          transition={{ duration: 0.3 }}
          className="columns-3xs xl:columns-xs 2xl:columns-md min-[1537px]:columns-3 gap-8  my-8"
        >
          {images.map((img) => (
            <motion.div
              key={img.id}
              className="relative h-fit max-w-full mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.img
                src={img.url}
                className="rounded-2xl object-cover h-auto max-w-full"
                alt={img.label}
              />
              <div className="absolute inset-0 w-full h-auto rounded-2xl overflow-hidden bg-[rgba(0,0,0,0.4)] bg-gradient-to-b from-gray-800 opacity-0 hover:cursor-pointer hover:opacity-100  hover:transition hover:duration-500 hover:ease-in">
                <div className="flex flex-col justify-between p-4 h-full font-montserrat">
                  <div className="flex justify-between">
                    <a
                      href="/#"
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch({
                          type: "SHOW_IMAGE_MODAL",
                          payload: { imageLabel: img.label, imageUrl: img.url },
                        });
                      }}
                    >
                      <img src={zoomInIcon} className="w-6 text" alt="ZoomIn" />
                    </a>
                    <button
                      onClick={() =>
                        dispatch({
                          type: "SHOW_DELETE",
                          payload: { imageId: img.id, imageUrl: img.url },
                        })
                      }
                      className="text-red-600 text-sm tracking-wide font-semibold border border-red-600 rounded-[38px] py-1 px-2"
                    >
                      delete
                    </button>
                  </div>
                  <p className="text-white capitalize font-medium text-sm leading-5">
                    {img.label}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </>
  );
}

export default Grid;
