import { motion, AnimatePresence } from "framer-motion";
import { useModalContext } from "../../hooks/useModalContext";

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { y: "-100vh", opacity: 0 },
  visible: { y: "0", opacity: 1, transition: { delay: 0.5 } },
};

function ImageModal() {
  const { imageUrl, imageLabel, showImageModal, dispatch } = useModalContext();

  const handleClick = (e) => {
    if (e.target.classList.contains('backdrop')) {
        dispatch({ type: "REMOVE_IMAGE_MODAL" })
    }

    
  }
 

  return (
    <AnimatePresence>
      {showImageModal && (
        <motion.div
          key="backdrop"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={handleClick}
          className="backdrop fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] z-10"
        >
          <motion.div
            variants={modalVariants}
            className="h-[80%] w-[80%] max-w-max my-16 mx-auto p-2 bg-white"
          >
            <img src={imageUrl} alt={imageLabel} className="w-fit h-full object-contain" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ImageModal;
