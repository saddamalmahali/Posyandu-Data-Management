import config from "@/@core/config";
import { api } from "@/lib/api";
import axios from "axios";

export const isAdminAuthenticated = async () => {
  const url = `${config.urlServer}/api/auth`;
  const token = localStorage.getItem("tokenAuth");

  if (token) {
    const headers = {
      Authorization: token,
    };

    try {
      const response = await axios.post(url, {}, { headers });

      return response.status === 200;
    } catch (error) {
      localStorage.removeItem("tokenAuth");
      localStorage.removeItem("id_admin");
      console.error(error);

      return false;
    }
  } else {
    localStorage.removeItem("tokenAuth");
    localStorage.removeItem("id_admin");
    console.error("Auth Token tidak tersedia");

    return false;
  }
};

export const isUserAuthenticated = async () => {
  const token = localStorage.getItem("tokenAuth");

  if (!token) {
    localStorage.removeItem("tokenAuth");
    console.error("Auth Token tidak tersedia");

    return false;
  }

  try {
    const response = await api.post('/user/auth');

    return response.status === 200;
  } catch (error) {
    localStorage.removeItem("tokenAuth");
    console.error(error);

    return false;
  }
};

export const requireAdminLogin = async (to, from, next) => {
  if (!(await isAdminAuthenticated())) {
    next("/login"); 
  } else {
    next(); 
  }
};

export const requireAdmin = async (to, from, next) => {
  if (await isAdminAuthenticated()) {
    next("/admin/dashboard");
  } else {
    next(); 
  }
};

export const requireUserLogin = async (to, from, next) => {
  if (!(await isUserAuthenticated())) {
    next("/login"); 
  } else {
    next(); 
  }
};
