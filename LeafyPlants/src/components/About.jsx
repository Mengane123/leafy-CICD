import React from "react";
import bank from "../../src/mainimg/data.jpg";
// import main from "../../public/mainimg/maintag.png";
import man from '../../src/mainimg/man.jpg';

const About = () => {
  return (
    <>
      {/* Header Image */}
      <div className="flex mt-14  justify-center w-full">
        <img className="w-[1520px] h-[550px]" src='/i22.png' alt="Main Tag"  />
      </div>

      {/* Content Section 1 */}
      <div className="flex flex-col md:flex-row items-center mx-4 md:mx-10 my-6">
        <img className="w-full md:w-1/2" src={bank} alt="Bank Image" />
        <div className="px-4 md:px-8 w-full md:w-1/2 mt-6 md:mt-0">
          <h1 className="font-bold text-3xl md:text-4xl text-center md:text-left font-serif">
            Why we started LeafyPlant
          </h1>
          <p className="my-4 font-serif text-base md:text-lg">
            "Welcome to LeafyPlants, your premier destination for top-quality
            greenery delivered right to your doorstep in Pune, Mumbai, Satara,
            and Thane! Established in January 2024, LeafyPlants is dedicated to
            bringing the beauty of nature to urban spaces across Maharashtra.
            <br /><br />
            Our platform connects you with a curated selection of exquisite
            plants sourced directly from trusted nurseries, ensuring freshness
            and quality with every order. Whether you're looking to brighten
            up your home, office, or outdoor space, LeafyPlants has the
            perfect green companion for you.
            <br /><br />
            With our hassle-free delivery service, you can enjoy the
            convenience of having lush greenery delivered straight to your
            door in Pune, Mumbai, Satara, and Thane. Join us in enhancing your
            living space with the vibrant energy of plants. Explore our
            collection today and let LeafyPlants transform your surroundings!"
          </p>
        </div>
      </div>

      {/* Content Section 2 */}
      <div className="flex flex-col-reverse md:flex-row items-center mx-4 md:mx-10 my-6">
        <div className="px-4 md:px-8 w-full md:w-1/2 mt-6 md:mt-0">
          <h1 className="font-bold text-3xl md:text-4xl text-center md:text-left font-serif">
            What we do
          </h1>
          <p className="my-4 font-serif text-base md:text-lg text-center md:text-left">
            LeafyPlants is all about making plant care simple. We search far and
            wide for the best plants, carefully chosen from trusted places, and
            deliver them right to your door. But we don't stop there. We also
            share tips and advice on how to keep your plants healthy and happy.
            So, whether you're a total beginner or a seasoned green thumb,
            LeafyPlants is here to make your plant journey enjoyable and
            stress-free.
          </p>
        </div>
        <img className="w-full md:w-1/2" src={man} alt="Man with Plants" />
      </div>
    </>
  );
};

export default About;
