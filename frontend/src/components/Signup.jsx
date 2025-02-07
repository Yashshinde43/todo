import React, { useState } from "react";
import { UserPlus, Mail, Lock, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://todo-1-29fz.onrender.com/api/createuser",
        {
          name,
          email,
          password,
        },
      );
      console.log(response);
      // localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (err) {
      setError("Failed to create account");
    }
  };

  const navigateToLogin = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1519681393784-d120267933ba')] bg-cover bg-center bg-fixed">
      <div className="min-h-screen backdrop-blur-sm bg-black/30 flex items-center justify-center p-6">
        <div className="max-w-md w-full space-y-8">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 mb-6">
                <UserPlus className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Create Account
              </h2>
              <p className="text-white/80 mb-8">Join Task Master today</p>
            </div>

            {error && (
              <div className="mb-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-white text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-white mb-2"
                >
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <UserPlus className="h-5 w-5 text-white/50" />
                  </div>
                  <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-12 px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-white/30 focus:ring-2 focus:ring-white/20 text-white placeholder-white/50 transition-all outline-none backdrop-blur-sm"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-white mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-white/50" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-white/30 focus:ring-2 focus:ring-white/20 text-white placeholder-white/50 transition-all outline-none backdrop-blur-sm"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-white mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-white/50" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-white/30 focus:ring-2 focus:ring-white/20 text-white placeholder-white/50 transition-all outline-none backdrop-blur-sm"
                    placeholder="Choose a password"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-3 border border-white/10 backdrop-blur-sm group"
              >
                <UserPlus className="w-5 h-5 transform group-hover:scale-110 transition-transform duration-300" />
                <span>Create Account</span>
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-white/10">
              <button
                onClick={navigateToLogin}
                className="w-full bg-white/5 hover:bg-white/10 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-3 border border-white/10 backdrop-blur-sm group"
              >
                <LogIn className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                <span>Back to Sign In</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
