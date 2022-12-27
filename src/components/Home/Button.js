import { useModalContext } from "../../hooks/useModalContext";

function Button(props) {
    const {dispatch} = useModalContext();

    return (
        <button 
        onClick={() => dispatch({type:'SHOW'})}
        className="bg-[#3DB46D] w-28 h-12 md:w-[137px] md:h-[55px] rounded-xl shadow-custom self-center md:self-start">
             <span className="font-noto text-white text-xs md:text-base font-bold">Add a photo</span>
        </button>
    );
}

export default Button;