import { useNavigate } from "react-router-dom";
import abs from '../abs.webp'

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative bg-gradient-to-b from-blue-900 to-blue-300 w-full min-h-[300px] md:h-[781.31px] flex flex-col py-6 px-4 md:px-[76px] box-border items-center justify-center text-center md:text-left text-2xl md:text-41xl text-black font-roboto">
      <div className="self-stretch flex-1 flex flex-col md:flex-row items-start justify-center">
        <div className="w-full md:w-2/3 flex flex-col items-center md:items-start gap-4 md:gap-6 md:mt-20">
          <div className="m-0 self-stretch relative text-[inherit] capitalize font-inherit">
            <h1 className="text-white text-center font-bold text-4xl md:text-8xl">World's 1st AI</h1>
            <p className="m-0 text-white  text-center font-bold text-4xl md:text-8xl">powered <br></br> Edu-Platform!</p>
          </div>
          <div className="self-stretch  text-center relative text-lg leading-[130%] font-inter text-white">
            Empowering learners worldwide with curated YouTube courses, personalized paths,<br></br> and collaborative community for inclusive, accessible, and transformative education.
          </div>
          <div className="self-stretch flex flex-col items-center md:flex-row  justify-between ml-20 mr-20  gap-4 md:gap-11">
            <button onClick={() => { navigate('/quiz') }} className="cursor-pointer rounded-2xl py-2 px-4 md:py-[18px] md:px-[45px] bg-white  border-2 shadow-[0px_10px_50px_rgba(255,_255,_255,_0.25)]">
              <b className="text-lg font-dm-sans text-black text-center">
                Explore
              </b>
            </button>
            <button onClick={() => { navigate('/quiz') }} className="cursor-pointer rounded-2xl py-2 px-4 md:py-[18px] md:px-[42px] bg-transparent border-2 border-black hover:text-black hover:bg-white  transition ease-in-out shadow-[0px_10px_50px_rgba(255,_255,_255,_0.25)] border-1.5px border-solid border-darkorange-200">
              <b className="text-lg font-dm-sans text-white hover:text-black text-center">
                Learn More
              </b>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Hero;
