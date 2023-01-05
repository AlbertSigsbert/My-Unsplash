import { createContext, useReducer } from "react";

export const ModalContext = createContext();

export const modalReducer = (state, action) => {
  switch (action.type) {
    case "SHOW":
      return { ...state, showModal: true };
    case "SHOW_IMAGE_MODAL":
      return {
        ...state,
        showImageModal: true,
        imageUrl: action.payload.imageUrl,
        imageLabel: action.payload.imageLabel,
      };

    case "SHOW_DELETE":
      return {
        ...state,
        showDeleteModal: true,
        imageId: action.payload.imageId,
        imageUrl: action.payload.imageUrl,
      };
    case "REMOVE":
      return { ...state, showModal: false };
    case "REMOVE_DELETE":
      return { ...state, showDeleteModal: false };
    case "REMOVE_IMAGE_MODAL":
      return { ...state, showImageModal: false };
    default:
      return state;
  }
};

export function ModalContextProvider({ children }) {
  const [state, dispatch] = useReducer(modalReducer, {
    showModal: false,
    showDeleteModal: false,
    showImageModal: false,
    imageId: null,
    imageUrl: null,
    imageLabel: null,
  });

  return (
    <ModalContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ModalContext.Provider>
  );
}
