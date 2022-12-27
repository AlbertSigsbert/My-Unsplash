import Grid from "./Grid";
import Header from "./Header";
import UploadForm from "./UploadForm";
import { ModalContextProvider } from "../../context/ModalContext";

function Template(props) {
  return (
    <section className="mx-[6%]">
      <ModalContextProvider>
        <Header />
        <UploadForm />
        <Grid />
      </ModalContextProvider>
    </section>
  );
}

export default Template;
