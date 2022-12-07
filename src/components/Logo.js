function Logo(props) {
  return (
    <>
      <div className="flex space-x-8 w-[138px] h-[26px]">
        <div className="relative">
          <div className="absolute top-[3.91px] left-[7.53px] bg-[#333] rounded-sm w-[7px] h-[7px]"></div>
          <div className="absolute top-4 bg-[#333] rounded-sm w-[22px] h-[7px]"></div>
        </div>

        <div className="relative font-noto font-extrabold text-sm leading-5 text-[#333]">
          My Unsplash
          <div className="absolute top-4 font-medium text-[9px] leading-3">
            devchallenges.io
          </div>
        </div>
      </div>
    </>
  );
}

export default Logo;
