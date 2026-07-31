import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";

const AccountDrawer = ({ isOpen, onClose }) => {
  const [accountView, setAccountView] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // Dynamic API Base URL fallback
  const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5012";

  useEffect(() => {
    if (!isOpen) {
      setAccountView("login");
      // Clear out inputs when closed
      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
    }
  }, [isOpen]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${baseUrl}/api/Auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      if (!response.ok) {
        const errorMsg = await response.text();
        throw new Error(errorMsg || "Invalid login credentials.");
      }

      const data = await response.json();
      
      localStorage.setItem("authToken", data.token);
      
      alert("Welcome back! Login successful.");
      onClose();
    } catch (error) {
      alert("Login Error: " + error.message);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${baseUrl}/api/Auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password
          // Note: If you want to store firstName and lastName, update your backend User model later!
        })
      });

      if (!response.ok) {
        const errorMsg = await response.text();
        throw new Error(errorMsg || "Registration failed.");
      }

      const message = await response.text();
      alert(message); // Displays "User successfully registered!"
      
      // Switch back to the login layout so they can log in immediately
      setAccountView("login"); 
    } catch (error) {
      alert("Registration Error: " + error.message);
    }
  };

  return (
    <div
      className={`fixed right-0 top-0 h-full w-full sm:w-[300px] bg-white shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between px-6 py-4 border-b border-pink-500">
        <h2 className="font-bold text-lg text-gray-800 dancing-script">
          {accountView === "login" ? "Login" : "Register"}
        </h2>
        <button onClick={onClose} className="text-gray-800 hover:text-pink-500 transition-colors">
          <IoClose className="text-2xl text-gray-400 hover:text-pink-500" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {accountView === "login" ? (
          <form onSubmit={handleLoginSubmit} className="p-6 flex flex-col space-y-5">
            <input
              placeholder="Email"
              type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              style={{ fontFamily: 'Playfair Display' }}
              className="w-full px-4 py-3 border border-gray-500 rounded-xl focus:outline-pink-500 text-sm text-gray-800 placeholder-gray-500"
            />
            <input
              placeholder="Password"
              type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
              style={{ fontFamily: 'Playfair Display' }}
              className="w-full px-4 py-3 border border-gray-500 rounded-xl focus:outline-pink-500 text-sm text-gray-800 placeholder-gray-500"
            />
            <motion.button whileHover={{ y: -4 }}
              type="submit" style={{ fontFamily: 'Playfair Display' }}
              className="w-full bg-pink-500 shadow-2xl text-white dancing-script font-medium py-3 rounded-full hover:bg-pink-600 transition-colors text-sm">
              Sign In
            </motion.button>
            <div className="text-center pt-2"
              style={{ fontFamily: 'Playfair Display' }}>
              <button type="button" onClick={() => setAccountView("register")} className="text-sm text-gray-600 hover:text-black underline transition-colors">
                New customer? Create your account
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit} className="p-6 flex flex-col space-y-5">
            <input
              style={{ fontFamily: 'Playfair Display' }}
              type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-3 py-3 border border-gray-500 rounded-xl focus:outline-pink-500 text-sm text-gray-800 placeholder-gray-500"
            />
            <input
              style={{ fontFamily: 'Playfair Display' }}
              type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-500 rounded-xl focus:outline-pink-500 text-sm text-gray-800 placeholder-gray-500"
            />
            <input
              style={{ fontFamily: 'Playfair Display' }}
              placeholder="Email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-500 rounded-xl focus:outline-pink-500 text-sm text-gray-800 placeholder-gray-500"
            />
            <input
              style={{ fontFamily: 'Playfair Display' }}
              placeholder="Password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-500 rounded-xl focus:outline-pink-500 text-sm text-gray-800 placeholder-gray-500"
            />
            <motion.button whileHover={{ y: -4 }}
              type="submit" style={{ fontFamily: 'Playfair Display' }}
              className="w-full bg-pink-500 dancing-script shadow-2xl text-white font-medium py-3 rounded-full hover:bg-pink-600 transition-colors text-sm">
              Register
            </motion.button>
            <div className="text-center pt-2">
              <button style={{ fontFamily: 'Playfair Display' }}
                type="button" onClick={() => setAccountView("login")} className="text-sm text-gray-600 hover:text-black underline transition-colors">
                Already have an account? Login here
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AccountDrawer;