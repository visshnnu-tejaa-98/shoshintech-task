import Navbar from "./Navbar";
import Services from "./Services";

const Landing = () => {
  return (
    <div>
      <Navbar />
      <div className="w-[80%] mx-auto">
        <h1 className="text-5xl text-center text-blue-500 my-5 font-semibold">
          Our Services
        </h1>
        <Services />
      </div>
    </div>
  );
};

export default Landing;
