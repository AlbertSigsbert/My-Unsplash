import Grid from "./Grid";
import Header from "./Header";


function Template(props) {
    return (
        <section className="mx-[6%]">
            <Header/>
            <Grid/>
        </section>
    );
}

export default Template;