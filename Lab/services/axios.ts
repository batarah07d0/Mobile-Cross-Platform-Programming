import axios from "axios";

const ENV = process.env.EXPO_PUBLIC_API_URL;

// Simpan post yang diupdate dalam memory
const localPostsCache = new Map();

// Add error handling for the axios instance
const api = axios.create({
  baseURL: ENV,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export const getUsers = () => {
  return api.get("/users");
};

export const getPosts = () => {
  return api.get("/posts").then((response) => {
    // Gabungkan data dari server dengan data lokal yang sudah diupdate
    const posts = response.data.map((post) => {
      // Jika post ini sudah diupdate di lokal, gunakan versi yang sudah diupdate
      if (localPostsCache.has(post.id)) {
        return localPostsCache.get(post.id);
      }
      return post;
    });

    return {
      ...response,
      data: posts,
    };
  });
};

export const getPostById = (id) => {
  if (localPostsCache.has(id)) {
    // Return post dari cache lokal jika ada
    return Promise.resolve({
      data: localPostsCache.get(id),
      status: 200,
    });
  }
  return api.get(`/posts/${id}`);
};

export const updatePost = (id, data) => {
  return api.put(`/posts/${id}`, data).then((response) => {
    // Simpan post yang diupdate ke cache lokal
    localPostsCache.set(id, data);
    return response;
  });
};

export const postData = (data) => {
  return api.post("/posts", data);
};
