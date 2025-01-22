import React, { useEffect, useState } from "react";
import { useNavigate , Link } from "react-router-dom";
import axios from "axios";


function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/");
        }
    }, []);

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://geminiai-1-wzve.onrender.com/user/register", {
                username,
                email,
                password,
            });

            // Assuming successful response
            if (response.data.success) {
                localStorage.setItem("token", response.data.token);
                navigate("/");  
            } else {
                alert(response.data.message || "Registration failed.");
            }
        } catch (error) {
            console.error("Registration error:", error);
            alert("An error occurred during registration.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#0E0E0E]">
            <div className="bg-[#0E0E0E] p-8 rounded-lg shadow-lg w-full max-w-md border border-white">
                <h2 className="text-2xl font-bold text-white text-center mb-6">
                    Register
                </h2>
                <form onSubmit={handleRegister} className="flex flex-col">
                    <label htmlFor="username" className="text-white mb-2">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                        className="bg-[#0E0E0E] text-white p-3 rounded-md mb-4 border border-white focus:outline-none focus:ring-2 focus:ring-white"
                    />
                    <label htmlFor="email" className="text-white mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="bg-[#0E0E0E] text-white p-3 rounded-md mb-4 border border-white focus:outline-none focus:ring-2 focus:ring-white"
                    />
                    <label htmlFor="password" className="text-white mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="bg-[#0E0E0E] text-white p-3 rounded-md mb-6 border border-white focus:outline-none focus:ring-2 focus:ring-white"
                    />
                    <button
                        type="submit"
                        className="bg-white text-[#0E0E0E] p-3 rounded-md font-semibold transition duration-300 hover:bg-[#E0E0E0]"
                    >
                        Register
                    </button>
                </form>
                <p className="text-white mt-6 text-center">
                    Don't have an account?{" "}
                    <Link
                        to="/login"
                        className="text-white hover:underline transition duration-300"
                    >
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Register;
