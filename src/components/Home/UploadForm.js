import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useModalContext } from "../../hooks/useModalContext";
import useStorage from "../../hooks/useStorage";

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { y: "-100vh", opacity: 0 },
  visible: { y: "200px", opacity: 1, transition: { delay: 0.5 } },
};

function UploadForm() {
  const [label, setLabel] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  const { showModal, dispatch } = useModalContext();
  const { upload } = useStorage();

  const resetForm = () => {
    setLabel("");
    setImage(null);
  };

  const handleSubmit =  (e) => {
      e.preventDefault();

      //Upload image to firebase storage
      upload(image, label);

      //Reset form fields
      resetForm();

      //Remove the modal
      dispatch({ type: "REMOVE" });
  };

  const handleChange = (e) => {
    let selected = e.target.files[0];

    if (selected && selected.type.includes("image")) {
      setImage(selected);
      setError(null);
    } else {
      setImage(null);
      setError("Select an image file");
    }
  };

  const handleCancel = () => {
    resetForm();
    dispatch({ type: "REMOVE" });
  };

  return (
    <AnimatePresence>
      {showModal && (
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
            <h1 className="font-medium text-2xl">Add a new Photo</h1>

            <form onSubmit={handleSubmit}>
              <div className="my-6">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Label:
                </label>
                <input
                  type="text"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Image Label"
                  required
                  onChange={(e) => setLabel(e.target.value)}
                  value={label}
                />
              </div>

              <div className="my-6">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900"
                  htmlFor="img_file"
                >
                  Upload Image
                </label>
                <input
                  className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none"
                  aria-describedby="Image_file"
                  id="img_file"
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                />
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
                    className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                  >
                    Submit
                  </button>
            
              </div>
            </form>

            {error && (
              <div
                className="p-4 my-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
                role="alert"
              >
                <span className="font-medium">Error! </span>
                {error}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default UploadForm;
