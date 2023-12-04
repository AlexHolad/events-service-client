import axios from "axios";

import createAuthRefreshInterceptor from "axios-auth-refresh";

import { useQuery } from "@tanstack/react-query";

// REFRESH AUTH FUNCTIONALITY
import { refreshAuth } from "./refresh-auth";

const devMode = true;

export const client = axios.create({
  baseURL: devMode ? "http://localhost:5000" : "https://events-service-api.onrender.com",
});

export const setHeaderToken = (token) => {
  client.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const removeHeaderToken = () => {
  //client.defaults.headers.common.Authorization = null;
  delete client.defaults.headers.common.Authorization;
};


createAuthRefreshInterceptor(client, refreshAuth, {
  statusCodes: [401], // default: [ 401 ]
  pauseInstanceWhileRefreshing: true,
});



export const register = async (credentials) => {
    return await client.post(`/register`, credentials)
}

export const signin = async (credentials) => {
  return await client.post(`/signin`, credentials)
}

export const refresh = async () => {
  return await client.get(`/refresh`, {
    withCredentials: true,
  })
};

export const signout = async () => {
  return await client.post(`/signout`)
}

export const fetchUserEvents = async () => {
  return await client.get(`/user/events`).then(res => res.data)
}

export const useFetchUserEvents = () =>
  useQuery({
    queryKey: ["user-events"],
    queryFn: () => client.get(`/user/events`).then(res => res.data),
    retry: false
});

// EVENTS REQUESTS

export const getEvents = async () => {
  return await client.get(`/events`);
}

export const addNewEvent = async (initialEvent, accessToken) => {
    return await client.post(`/events`, initialEvent, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
}

 export const editEvent = async (initialEvent, accessToken) => {
  console.log("Editing Event started", initialEvent);
  return await client.put(`/events`, initialEvent, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

 export const deleteEvent= async (_id, accessToken) => {
  console.log("Deleting started", typeof _id);

  return await client.delete(`/events`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      data: { _id: _id }
    });
}

 export const getEventById = async (eventId) => {
  console.log("Fetching event started");
  console.log(eventId);
  return await client.get(`/event`, {
    params: { eventId },
  });
}

