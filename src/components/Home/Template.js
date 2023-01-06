//Context Providers
import { ModalContextProvider } from "../../context/ModalContext";
import { UploadContextProvider } from "../../context/UploadContext";
import { SearchContextProvider } from "../../context/SearchContext";


//Page components
import Grid from "./Grid";
import Header from "./Header";
import UploadForm from "./UploadForm";
import ProgressBar from "./ProgressBar";
import DeleteForm from "./DeleteForm";
import ImageModal from "./ImageModal";

/*
   Search
   Autologout
   SE0 - Title, Social preview
*/
function Template(props) {
  return (
    <section className="mx-[6%]">
      <SearchContextProvider>
      <ModalContextProvider>
        <UploadContextProvider>
          <Header />
          <ProgressBar />
          <UploadForm />
          <DeleteForm/>
          <ImageModal/>
          <Grid />
        </UploadContextProvider>
      </ModalContextProvider>
      </SearchContextProvider>
    </section>
  );
}

export default Template;
