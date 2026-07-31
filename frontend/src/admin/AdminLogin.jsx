import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  const handleLogin = (e) => {
    e.preventDefault();


    // Temporary static login
    if (
      formData.email === "admin@gmail.com" &&
      formData.password === "admin123"
    ) {

      localStorage.setItem("adminLoggedIn", true);

      navigate("/admin/dashboard");

    } else {

      alert("Invalid admin credentials");

    }

  };


  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">


      <div className="bg-white shadow-xl rounded-xl p-8 w-[400px]">

        <h1 className="text-3xl font-bold text-center text-pink-500 dancing-script">
          Scriblia Admin
        </h1>


        <h2 className="text-xl font-semibold text-center mt-5">
          Login
        </h2>


        <form 
          onSubmit={handleLogin}
          className="mt-6 space-y-4"
        >

          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />


          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />


          <button
            className="w-full bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600"
          >
            Login
          </button>


        </form>

      </div>


    </div>
  );
};


export default AdminLogin;