
function Grid(props) {
    return (
        <div className="grid grid-flow-row-dense gap-8 grid-cols-3 my-8">
        <div>
            <img src="/img/airpods-pro.jpg" className="rounded-2xl" alt="AirpodsPro" />
        </div>
        <div>
            <img src="/img/airpods.jpg" className="rounded-2xl" alt="Airpods" />
        </div>
        <div>
            <img src="/img/blog1.jpg" className="rounded-2xl" alt="Blog1" />
        </div>
        <div>
            <img src="/img/blog2.jpg " className="rounded-2xl" alt="Blog2" />
        </div>
        <div>
            <img src="/img/slide1.jpg" className="rounded-2xl" alt="Slide1" />
        </div>
        <div>
            <img src="/img/slide2.jpg" className="rounded-2xl" alt="Slide2" />
        </div>
       
       
        </div>

    );
}

export default Grid;