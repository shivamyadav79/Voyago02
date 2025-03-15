import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const VerifyEmail = () => {
  const [message, setMessage] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get("token");
      if (!token) {
        setMessage("Invalid or missing verification token.");
        return;
      }

      try {
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/verify-email`, { token });
        setMessage(data.message);

        // Redirect after 3 seconds
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } catch (error) {
        setMessage(error.response?.data?.message || "Email verification failed.");
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-lg text-center">
        <h2 className="text-xl font-semibold mb-4">{message || "Verifying email..."}</h2>
      </div>
    </div>
  );
};

export default VerifyEmail;
