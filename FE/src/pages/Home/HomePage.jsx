import earth from "../../assets/earth.png";

const HomePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex items-center rounded-lg p-8 ">
        <div className="flex-shrink-0 mr-8">
          <img src={earth} alt="Earth" className="w-96 h-96 rounded-lg" />
        </div>

        <div className="text-left">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">
            Welcome to Environmental Survey
          </h1>
          <p className="text-lg text-gray-700">
            Participate in environmental surveys and competitions. Let's build a
            greener world together!
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
