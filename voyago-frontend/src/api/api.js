// src/api/api.js

import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5002/api"; // Ensure this is defined in your .env file

// Axios instance
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to fetch all places
export const fetchPlaces = async () => {
  try {
    const response = await apiClient.get("/places");
    return response.data; // Return data instead of setting state
  } catch (error) {
    console.error("Error fetching places:", error);
    throw error;
  }
};

// Function to fetch a single place by ID
export const fetchPlaceById = async (id) => {
  try {
    const response = await apiClient.get(`/places/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching place details:", error);
    throw error;
  }
};

// Function to fetch all cities
export const fetchCities = async () => {
  try {
    const response = await apiClient.get("/cities/get-cities");
    return response.data;
  } catch (error) {
    console.error("Error fetching cities:", error);
    throw error;
  }
};

export const fetchCitiesById = async () => {
    try
    {
        const response = await apiClient.get("/cities/:id");
        return response.data;
    } catch (error) 
    {
        console.error("Error Fetching CityById:", error)
    }
};