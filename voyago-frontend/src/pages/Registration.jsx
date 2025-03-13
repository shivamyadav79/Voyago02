import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Google as GoogleIcon } from "@mui/icons-material";

const ChatRegistration = () => {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({ email: "", username: "", password: "" });
    const [messageLog, setMessageLog] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Dynamic Greeting
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning!";
        if (hour < 18) return "Good afternoon!";
        return "Good evening!";
    };

    // Add messages to chat
    const addMessage = (text, sender = "bot") => {
        setMessageLog((prev) => [...prev, { text, sender }]);
    };

    // Handle user input
    const handleUserInput = (input) => {
        addMessage(input, "user");
        if (step === 0) {
            setFormData({ ...formData, email: input });
            checkEmailExists(input);
        } else if (step === 1) {
            setFormData({ ...formData, username: input });
            addMessage("Nice! Now, please set a secure password.");
            setStep(2);
        } else if (step === 2) {
            setFormData({ ...formData, password: input });
            submitForm();
        }
    };

    // Check if email already exists
    const checkEmailExists = async (email) => {
        setLoading(true);
        try {
            const res = await axios.post("http://localhost:5002/api/auth/check-email", { email });
            if (res.data.exists) {
                addMessage("This email is already in use. Try another one.");
                setLoading(false);
            } else {
                addMessage("Great! Now, choose a username.");
                setStep(1);
                setLoading(false);
            }
        } catch (error) {
            addMessage("Error checking email. Please try again.");
            setLoading(false);
        }
    };

    // Submit user data
    const submitForm = async () => {
        setLoading(true);
        try {
            const res = await axios.post("http://localhost:5002/api/auth/register", formData);
            if (res.data.success) {
                addMessage("You're all set! 🎉 Registration complete.");
            } else {
                addMessage("Something went wrong. Please try again.");
            }
        } catch (error) {
            setError("Error submitting registration.");
        }
        setLoading(false);
    };

    // Handle Google OAuth Registration
    const handleGoogleSignUp = () => {
        window.open("http://localhost:5002/api/auth/google", "_self");
    };

    useEffect(() => {
        addMessage(`${getGreeting()} Welcome to our platform!`);
        setTimeout(() => {
            addMessage("Let's get you registered. What's your email?");
        }, 1000);
    }, []);

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>

            <div className="h-80 overflow-y-auto bg-gray-100 p-4 rounded-lg">
                {messageLog.map((msg, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: msg.sender === "bot" ? -20 : 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`mb-2 p-2 rounded-lg w-fit ${
                            msg.sender === "bot" ? "bg-blue-200 text-blue-900" : "bg-green-200 text-green-900 ml-auto"
                        }`}
                    >
                        {msg.text}
                    </motion.div>
                ))}
            </div>

            {error && <p className="text-red-500 mt-2">{error}</p>}

            {step < 3 && (
                <input
                    type={step === 2 ? "password" : "text"}
                    placeholder={step === 2 ? "Enter password" : "Type here..."}
                    className="w-full p-2 mt-2 border rounded-md"
                    disabled={loading}
                    onKeyDown={(e) => e.key === "Enter" && handleUserInput(e.target.value)}
                />
            )}

            <button onClick={handleGoogleSignUp} className="mt-4 w-full flex items-center justify-center gap-2 bg-red-500 text-white p-2 rounded">
                <GoogleIcon className="w-5 h-5" /> Sign up with Google
            </button>
        </div>
    );
};

export default ChatRegistration;
