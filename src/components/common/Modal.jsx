import { motion } from "framer-motion";

const Modal = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.8)] z-50 flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-lg w-full max-w-md mx-auto p-6 relative"
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
          onClick={onClose}
        >
          ✕
        </button>
        {children}
      </motion.div>
    </div>
  );
};

export default Modal;
