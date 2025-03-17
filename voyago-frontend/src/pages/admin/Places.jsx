import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlaces, createPlace, updatePlace, deletePlace } from "../../Store/Slice/adminPlaceSlice";

const AdminPlacesPanel = () => {
    const dispatch = useDispatch();
    const { places, loading, error } = useSelector((state) => state.adminPlaces);
    
    const [searchQuery, setSearchQuery] = useState("");
    const [newPlace, setNewPlace] = useState({
        name: "",
        city: "",
        type: "",
        description: "",
        rating: 0,
        images: "",
        location: { address: "", coordinates: [0, 0] },
        famous: ""
    });

    const [editingPlace, setEditingPlace] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        dispatch(fetchPlaces());
    }, [dispatch]);

    const handleCreate = async () => {
        if (!newPlace.name.trim() || !newPlace.city.trim() || !newPlace.type.trim() ||
            !newPlace.description.trim() || !newPlace.location.address.trim() || !newPlace.famous.trim()) {
            alert("All fields are required!");
            return;
        }

        const placeData = {
            ...newPlace,
            city: newPlace.city.trim(),
            images: newPlace.images ? newPlace.images.split(",") : [],
            rating: Number(newPlace.rating) || 0
        };

        await dispatch(createPlace(placeData));
        dispatch(fetchPlaces()); // ✅ Refresh places without full reload

        setNewPlace({
            name: "",
            city: "",
            type: "",
            description: "",
            rating: 0,
            images: "",
            location: { address: "", coordinates: [0, 0] },
            famous: ""
        });
    };

    const handleUpdate = async () => {
        if (!editingPlace || !editingPlace._id) return;
    
        setIsUpdating(true);
    
        const updatedData = {
            ...editingPlace,
            city: editingPlace.city.trim(),
            images: Array.isArray(editingPlace.images) ? editingPlace.images : editingPlace.images.split(","),
            rating: Number(editingPlace.rating) || 0
        };
    
        try {
            const resultAction = await dispatch(updatePlace({ id: editingPlace._id, updatedData }));
    
            if (updatePlace.fulfilled.match(resultAction)) {
                await dispatch(fetchPlaces()); // ✅ Ensure fresh data is fetched after update
            }
        } catch (error) {
            console.error("Update failed:", error);
        }
    
        setEditingPlace(null);
        setIsUpdating(false);
    };
    

    const handleDelete = async (id) => {
        dispatch(deletePlace(id));
        dispatch(fetchPlaces()); // ✅ Refresh list after deletion
    };

    const filteredPlaces = places?.filter((place) =>
        place?.name?.toLowerCase()?.includes(searchQuery.toLowerCase())
    ) || [];

    return (
        <div className="p-6 bg-white min-h-screen">
            <h2 className="text-2xl font-bold mb-4">Admin Places Panel</h2>

            <input
                type="text"
                placeholder="Search places..."
                className="p-2 border rounded w-full mb-4"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            <div className="grid grid-cols-2 gap-4 mb-6">
                <input type="text" placeholder="Name" className="p-2 border rounded" value={newPlace.name} onChange={(e) => setNewPlace({ ...newPlace, name: e.target.value })} />
                <input type="text" placeholder="City ID" className="p-2 border rounded" value={newPlace.city} onChange={(e) => setNewPlace({ ...newPlace, city: e.target.value })} />
                <input type="text" placeholder="Type" className="p-2 border rounded" value={newPlace.type} onChange={(e) => setNewPlace({ ...newPlace, type: e.target.value })} />
                <input type="text" placeholder="Address" className="p-2 border rounded" value={newPlace.location.address} onChange={(e) => setNewPlace({ ...newPlace, location: { ...newPlace.location, address: e.target.value } })} />
                <input type="text" placeholder="Images (comma separated URLs)" className="p-2 border rounded" value={newPlace.images} onChange={(e) => setNewPlace({ ...newPlace, images: e.target.value })} />
                <input type="text" placeholder="Description" className="p-2 border rounded" value={newPlace.description} onChange={(e) => setNewPlace({ ...newPlace, description: e.target.value })} />
                <input type="number" placeholder="Rating" className="p-2 border rounded" value={newPlace.rating} onChange={(e) => setNewPlace({ ...newPlace, rating: e.target.value })} />
                <input type="text" placeholder="Famous" className="p-2 border rounded" value={newPlace.famous} onChange={(e) => setNewPlace({ ...newPlace, famous: e.target.value })} />
            </div>

            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleCreate}>Add Place</button>

            {loading ? <p>Loading...</p> : error ? <p className="text-red-500">{error}</p> : (
                <table className="w-full mt-4 border">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-2 border">Name</th>
                            <th className="p-2 border">City</th>
                            <th className="p-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPlaces.map((place) => (
                            <tr key={place._id} className="border">
                                <td className="p-2 border">{place.name}</td>
                                <td className="p-2 border">{place.city?.name || "N/A"}</td>
                                <td className="p-2 border">
                                    <button className="bg-yellow-500 text-white px-2 py-1 rounded mr-2" onClick={() => setEditingPlace(place)}>Edit</button>
                                    <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDelete(place._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {editingPlace && (
                <div className="mt-6 p-4 border rounded bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Edit Place</h3>
                    <input type="text" placeholder="Name" className="p-2 border rounded w-full mb-2" value={editingPlace.name} onChange={(e) => setEditingPlace({ ...editingPlace, name: e.target.value })} />
                    <input type="text" placeholder="City ID" className="p-2 border rounded w-full mb-2" value={editingPlace.city} onChange={(e) => setEditingPlace({ ...editingPlace, city: e.target.value })} />
                    <input type="text" placeholder="Type" className="p-2 border rounded w-full mb-2" value={editingPlace.type} onChange={(e) => setEditingPlace({ ...editingPlace, type: e.target.value })} />
                    <input type="text" placeholder="Address" className="p-2 border rounded w-full mb-2" value={editingPlace.location.address} onChange={(e) => setEditingPlace({ ...editingPlace, location: { ...editingPlace.location, address: e.target.value } })} />
                    <input type="text" placeholder="Images (comma separated URLs)" className="p-2 border rounded w-full mb-2" value={editingPlace.images} onChange={(e) => setEditingPlace({ ...editingPlace, images: e.target.value })} />
                    <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleUpdate} disabled={isUpdating}>
                        {isUpdating ? "Updating..." : "Update"}
                    </button>
                </div>
            )}
        </div>
    );
};

export default AdminPlacesPanel;
