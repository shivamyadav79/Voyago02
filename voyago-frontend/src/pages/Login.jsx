import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../Store/Slice/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const dispatch = useDispatch();
  const { loading, user, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/google`;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register("email")}
            placeholder="Email"
            className="w-full p-2 border rounded"
          />
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full p-2 bg-blue-500 text-white rounded"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <button
          onClick={handleGoogleLogin}
          className="w-full p-2 bg-red-500 text-white rounded mt-4"
        >
          Login with Google
        </button>

        <p className="text-center mt-4">
          Forgot password?{" "}
          <Link to="/forgot-password" className="text-blue-500">
            Reset
          </Link>
        </p>
        <p className="text-center mt-4">
          New user?{" "}
          <Link to="/register" className="text-blue-500">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
