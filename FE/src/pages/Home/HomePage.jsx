const HomePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center max-w-lg p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Chào mừng đến với Environmental Survey
        </h1>
        <p className="text-lg text-gray-700 mb-4">
          Tham gia các khảo sát và cuộc thi về bảo vệ môi trường. Hãy cùng nhau
          xây dựng một thế giới xanh hơn!
        </p>
        <div className="space-x-4">
          <button className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600">
            Tham gia khảo sát
          </button>
          <button className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600">
            Tìm hiểu thêm
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
