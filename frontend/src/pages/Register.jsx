import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#f0f7f7] flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-md p-10 rounded-[3rem] shadow-sm">
        <h2 className="text-3xl font-black text-[#115e59] text-center mb-10">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            required
            className="w-full p-4 bg-gray-50 rounded-2xl"
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />

          <input
            type="email"
            placeholder="Email"
            required
            className="w-full p-4 bg-gray-50 rounded-2xl"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            required
            className="w-full p-4 bg-gray-50 rounded-2xl"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />

          <button className="w-full bg-[#115e59] text-white py-4 rounded-2xl font-bold">
            Register
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-[#115e59] font-bold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;