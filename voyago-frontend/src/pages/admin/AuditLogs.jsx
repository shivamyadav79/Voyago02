import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Audit = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve auth token
        const response = await axios.get('/api/admin/audit-logs', {
          headers: { Authorization: `Bearer ${token}`, "Cache-Control": "no-cache" },
        });
        setLogs(response.data);
      } catch (err) {
        setError('Failed to fetch audit logs.');
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Audit Logs</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Timestamp</th>
            <th className="border p-2">Action</th>
            <th className="border p-2">Performed By</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log._id} className="border-b">
              <td className="border p-2">{new Date(log.timestamp).toLocaleString()}</td>
              <td className="border p-2">{log.action}</td>
              <td className="border p-2">{log.performedBy?.username || 'Unknown'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Audit;
