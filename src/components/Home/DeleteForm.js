import { motion, AnimatePresence } from "framer-motion";
import { useModalContext } from "../../hooks/useModalContext";

import { useFirestore } from "../../hooks/useFirestore";
import useStorage from "../../hooks/useStorage";

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { y: "-100vh", opacity: 0 },
  visible: { y: "200px", opacity: 1, transition: { delay: 0.5 } },
};

function DeleteForm() {
  const { deleteDocument } = useFirestore("images");

  const { imageId, imageUrl, showDeleteModal, dispatch } = useModalContext();

  const { deleteImage } = useStorage();

  const handleSubmit = (e) => {
    e.preventDefault();

    //Delete Image in firestore
    deleteDocument(imageId);

    //Delete Image from storage
    deleteImage(imageUrl);

    //Remove the modal
    dispatch({ type: "REMOVE_DELETE" });
  };

  const handleCancel = () => {
    dispatch({ type: "REMOVE_DELETE" });
  };

  return (
    <AnimatePresence>
      {showDeleteModal && (
        <motion.div
          key="backdrop"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] z-10"
        >
          <motion.div
            variants={modalVariants}
            className="max-w-xs sm:max-w-sm md:max-w-lg mx-auto py-10 px-5 bg-white rounded-xl"
          >
            <h1 className="font-medium text-2xl">Are you sure?</h1>

            <div className="my-6">
              <p>Are you sure you want to delete this Image?</p>
            </div>

            <div className="mt-6 flex space-x-4 justify-end">
              <button
                onClick={handleCancel}
                className="text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                Cancel
              </button>

              <button
                type="submit"
                onClick={handleSubmit}
                className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default DeleteForm;
