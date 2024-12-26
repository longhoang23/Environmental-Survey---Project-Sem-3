import RegisterForm from "../components/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
