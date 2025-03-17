import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCities,
  createCity,
  deleteCity,
  updateCity,
} from "../../Store/Slice/adminCitySlice";

const AdminCityPanel = () => {
  const dispatch = useDispatch();
  const { cities = [], loading, error } = useSelector((state) => state.adminCity || { cities: [], loading: false, error: null });
  const [newCity, setNewCity] = useState({ name: "", description: "", imageUrl: "" });
  const [editingCity, setEditingCity] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(fetchCities());
  }, [dispatch]);

  const handleCreateCity = () => {
    if (newCity.name.trim()) {
      dispatch(createCity(newCity));
      setNewCity({ name: "", description: "", imageUrl: "" });
    }
  };

  const handleDeleteCity = (cityId) => {
    dispatch(deleteCity(cityId));
  };

  const handleEditCity = (city) => {
    setEditingCity(city);
  };

  const handleUpdateCity = () => {
    if (editingCity && editingCity.name.trim()) {
      dispatch(updateCity(editingCity));
      setEditingCity(null);
    }
  };

  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800">City Management</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search City..."
        className="w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Create or Edit City */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          {editingCity ? "Edit City" : "Add New City"}
        </h2>
        <input
          type="text"
          placeholder="City Name"
          className="w-full p-2 border rounded mb-2"
          value={editingCity ? editingCity.name : newCity.name}
          onChange={(e) =>
            editingCity
              ? setEditingCity({ ...editingCity, name: e.target.value })
              : setNewCity({ ...newCity, name: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Description"
          className="w-full p-2 border rounded mb-2"
          value={editingCity ? editingCity.description : newCity.description}
          onChange={(e) =>
            editingCity
              ? setEditingCity({ ...editingCity, description: e.target.value })
              : setNewCity({ ...newCity, description: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Image URL"
          className="w-full p-2 border rounded mb-2"
          value={editingCity ? editingCity.imageUrl : newCity.imageUrl}
          onChange={(e) =>
            editingCity
              ? setEditingCity({ ...editingCity, imageUrl: e.target.value })
              : setNewCity({ ...newCity, imageUrl: e.target.value })
          }
        />
        {editingCity ? (
          <button
            onClick={handleUpdateCity}
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            Update City
          </button>
        ) : (
          <button
            onClick={handleCreateCity}
            disabled={!newCity.name.trim()}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-300"
          >
            Create City
          </button>
        )}
      </div>

      {/* City List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p className="text-gray-500">Loading cities...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : filteredCities.length > 0 ? (
          filteredCities.map((city) => (
            <div key={city._id} className="bg-gray-100 p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition" onClick={() => handleEditCity(city)}>
              <img
                src={city.imageUrl || "https://via.placeholder.com/150"}
                alt={city.name}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="text-lg font-semibold mt-2">{city.name}</h3>
              <p className="text-sm text-gray-600">{city.description}</p>
              <div className="mt-3 flex justify-between">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditCity(city);
                  }}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteCity(city._id);
                  }}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-3">No cities found</p>
        )}
      </div>
    </div>
  );
};

export default AdminCityPanel;