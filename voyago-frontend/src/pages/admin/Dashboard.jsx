import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAnalytics } from "../../Store/Slice/adminSlice";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { analytics, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAnalytics());
  }, [dispatch]);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-red-500">{error.message || "An error occurred"}</p>;

  const chartData = [
    { name: "Users", count: analytics?.userCount || 0 },
    { name: "Cities", count: analytics?.cityCount || 0 },
    { name: "Places", count: analytics?.placeCount || 0 },
    { name: "Reviews", count: analytics?.reviewCount || 0 },
    { name: "Messages", count: analytics?.messageCount || 0 },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {chartData.map((item) => (
          <div key={item.name} className="bg-white shadow-md rounded-lg p-4 text-center">
            <h2 className="text-lg font-semibold">{item.name}</h2>
            <p className="text-2xl font-bold text-indigo-600">{item.count}</p>
          </div>
        ))}
      </div>

      {/* Bar Chart */}
      <div className="mt-8 bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Overview Chart</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" className="text-gray-700" />
            <YAxis className="text-gray-700" />
            <Tooltip />
            <Bar dataKey="count" fill="#4F46E5" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminDashboard;
