import React from 'react';
import Grid from '../components/Grid';
import Header from '../components/Header';

function Home(props) {
    return (
        <section className="mx-[6%]">
            <Header/>
            <Grid/>
        </section>
    );
}

export default Home;