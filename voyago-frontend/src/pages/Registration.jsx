import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../Store/Slice/authSlice.js";
import { Link, useNavigate } from "react-router-dom";
import * as z from "zod";
import { useEffect } from "react";

// Validation Schema
const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Register = () => {
  const dispatch = useDispatch();
  const { loading, user, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = (data) => {
    dispatch(registerUser(data));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Register</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              {...register("name")}
              placeholder="Full Name"
              className="w-full p-2 border rounded"
              required
              aria-invalid={errors.name ? "true" : "false"}
            />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          </div>

          <div>
            <input
              {...register("email")}
              placeholder="Email"
              className="w-full p-2 border rounded"
              required
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>

          <div>
            <input
              {...register("password")}
              type="password"
              placeholder="Password"
              className="w-full p-2 border rounded"
              required
              aria-invalid={errors.password ? "true" : "false"}
            />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full p-2 bg-blue-500 text-white rounded"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center mt-4">
          Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
