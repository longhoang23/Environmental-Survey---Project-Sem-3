import { useState } from "react";
import axios from "axios";

const RegisterForm = () => {
  const apiUrl = import.meta.env.VITE_PUBLIC_URL;

  const [register, setRegister] = useState({
    firstName: "",
    lastName: "",
    rollOrEmpNo: "",
    classId: "",
    sectionId: "",
    specification: "",
    admissionDate: "",
    joinDate: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    rollOrEmpNo: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({}); // Reset errors before validation

    // (Optional) Add your own local validation if needed:
    // const newErrors = {};
    // if (!register.firstName) newErrors.firstName = "Please enter your First Name.";
    // if (!register.lastName) newErrors.lastName = "Please enter your Last Name.";
    // if (!register.rollOrEmpNo) newErrors.rollOrEmpNo = "Please provide a valid Roll Number or Employee Number.";
    // if (Object.keys(newErrors).length > 0) {
    //   setErrors(newErrors);
    //   setLoading(false);
    //   return;
    // }

    try {
      const response = await axios.post(`${apiUrl}/User/register`, register);
      alert("Registration successful: " + response.data);
    } catch (error) {
      console.error("Error during registration:", error);
      setErrors((prev) => ({
        ...prev,
        general: "An error occurred while registering. Please try again later.",
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleBlur = (field) => {
    let errorMessage = "";

    if (field === "firstName" && !register.firstName) {
      errorMessage = "Please enter your First Name.";
    } else if (field === "lastName" && !register.lastName) {
      errorMessage = "Please enter your Last Name.";
    } else if (field === "rollOrEmpNo" && !register.rollOrEmpNo) {
      errorMessage = "Please provide a valid Roll Number or Employee Number.";
    }

    if (errorMessage) {
      setErrors((prev) => ({ ...prev, [field]: errorMessage }));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto p-4 border rounded-md shadow-md"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

      {errors.general && (
        <div className="text-red-500 mb-4">{errors.general}</div>
      )}

      <div className="mb-4">
        <label htmlFor="firstName" className="block text-sm font-medium">
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          value={register.firstName}
          onChange={(e) =>
            setRegister({ ...register, firstName: e.target.value })
          }
          onBlur={() => handleBlur("firstName")}
          className="w-full p-2 border rounded-md mt-1"
          required
        />
        {errors.firstName && (
          <p className="text-red-500 text-sm">{errors.firstName}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="lastName" className="block text-sm font-medium">
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          value={register.lastName}
          onChange={(e) =>
            setRegister({ ...register, lastName: e.target.value })
          }
          onBlur={() => handleBlur("lastName")}
          className="w-full p-2 border rounded-md mt-1"
          required
        />
        {errors.lastName && (
          <p className="text-red-500 text-sm">{errors.lastName}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="rollOrEmpNo" className="block text-sm font-medium">
          Roll Number or Employee Number
        </label>
        <input
          type="text"
          id="rollOrEmpNo"
          value={register.rollOrEmpNo}
          onChange={(e) =>
            setRegister({ ...register, rollOrEmpNo: e.target.value })
          }
          onBlur={() => handleBlur("rollOrEmpNo")}
          className="w-full p-2 border rounded-md mt-1"
          required
        />
        {errors.rollOrEmpNo && (
          <p className="text-red-500 text-sm">{errors.rollOrEmpNo}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="classId" className="block text-sm font-medium">
          Class
        </label>
        <input
          type="text"
          id="classId"
          value={register.classId}
          onChange={(e) =>
            setRegister({ ...register, classId: e.target.value })
          }
          className="w-full p-2 border rounded-md mt-1"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="sectionId" className="block text-sm font-medium">
          Section
        </label>
        <input
          type="text"
          id="sectionId"
          value={register.sectionId}
          onChange={(e) =>
            setRegister({ ...register, sectionId: e.target.value })
          }
          className="w-full p-2 border rounded-md mt-1"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="specification" className="block text-sm font-medium">
          Specification
        </label>
        <input
          type="text"
          id="specification"
          value={register.specification}
          onChange={(e) =>
            setRegister({ ...register, specification: e.target.value })
          }
          className="w-full p-2 border rounded-md mt-1"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="admissionDate" className="block text-sm font-medium">
          Admission Date
        </label>
        <input
          type="date"
          id="admissionDate"
          value={register.admissionDate}
          onChange={(e) =>
            setRegister({ ...register, admissionDate: e.target.value })
          }
          className="w-full p-2 border rounded-md mt-1"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="joinDate" className="block text-sm font-medium">
          Join Date
        </label>
        <input
          type="date"
          id="joinDate"
          value={register.joinDate}
          onChange={(e) =>
            setRegister({ ...register, joinDate: e.target.value })
          }
          className="w-full p-2 border rounded-md mt-1"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md mt-4"
        disabled={loading}
      >
        {loading ? "Loading..." : "Register"}
      </button>
    </form>
  );
};

export default RegisterForm;
