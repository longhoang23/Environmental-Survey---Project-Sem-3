import LoginForm from "./LoginForm";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
