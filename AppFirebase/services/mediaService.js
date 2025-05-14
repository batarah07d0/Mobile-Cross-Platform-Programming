import { decode } from "base64-arraybuffer";
import * as FileSystem from "expo-file-system";
// Remove the uuid import and add a simple UUID generator
// import { v4 as uuidv4 } from "uuid";
import { supabase } from "../lib/supabase";

// Simple UUID generator that works in React Native
const generateUUID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

// Function to save photo with location to Supabase
export const savePhoto = async (uri, location) => {
  try {
    // Extract geolocation data if available
    const latitude = location?.coords?.latitude || null;
    const longitude = location?.coords?.longitude || null;

    // 1. Upload the image file to Supabase Storage
    const fileName = `${generateUUID()}.jpg`; // Use our custom UUID generator
    const filePath = `photos/${fileName}`;

    // Read the file as base64
    const fileInfo = await FileSystem.getInfoAsync(uri);
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // Upload to Supabase Storage
    const { data: storageData, error: storageError } = await supabase.storage
      .from("media") // your bucket name
      .upload(filePath, decode(base64), {
        contentType: "image/jpeg",
      });

    if (storageError) {
      throw new Error(`Storage error: ${storageError.message}`);
    }

    // 2. Get the public URL for the uploaded image
    const { data: publicUrlData } = supabase.storage
      .from("media")
      .getPublicUrl(filePath);

    const photo_url = publicUrlData.publicUrl;

    // 3. Insert record into the photos table
    const { data, error } = await supabase
      .from("photos")
      .insert([
        {
          photo_url,
          latitude,
          longitude,
        },
      ])
      .select();

    if (error) {
      throw new Error(`Database error: ${error.message}`);
    }

    return data[0];
  } catch (error) {
    console.error("Error saving photo:", error);
    throw error;
  }
};

// Function to get all photos with location data
export const getPhotos = async () => {
  try {
    const { data, error } = await supabase
      .from("photos")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error("Error fetching photos:", error);
    throw error;
  }
};

// Function to save location data to Supabase
export const saveLocation = async (location) => {
  try {
    if (!location || !location.coords) {
      throw new Error("Invalid location data");
    }

    const { data, error } = await supabase
      .from("locations")
      .insert([
        {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          timestamp: location.timestamp || new Date().toISOString(),
          accuracy: location.coords.accuracy,
          altitude: location.coords.altitude,
        },
      ])
      .select();

    if (error) {
      throw new Error(`Database error: ${error.message}`);
    }

    return data[0];
  } catch (error) {
    console.error("Error saving location:", error);
    throw error;
  }
};

// Function to get all locations
export const getLocations = async () => {
  try {
    const { data, error } = await supabase
      .from("locations")
      .select("*")
      .order("timestamp", { ascending: false });

    if (error) {
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error("Error fetching locations:", error);
    throw error;
  }
};
