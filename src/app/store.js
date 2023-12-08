import { create } from "zustand";
import axios from "axios";

const mode = "PROD"

const baseURL = mode === "DEV" ? "http://localhost:5000": "https://events-service-api.onrender.com";
axios.defaults.withCredentials = true;

const useEventStore = create((set, get) => ({
  events: [],
  userEvents: [],
  event: {},
  date: new Date(),
  category: "все",
  searchField: "",
  accessToken: null,
  venues: [],
  eventId: "",
  // ⬇️ separate "namespace" for actions
  actions: {
    // AUTH REQUESTS

    register: async (credentials) => {
      const response = await axios.post(`${baseURL}/register`, credentials);
      const { data } = response;

      set({ accessToken: data.accessToken });
    },

    signin: async (credentials) => {
      try {
        const response = await axios.post(`${baseURL}/signin`, credentials);
        const { data } = response;
        console.log(data);
        set({ accessToken: await data.accessToken });
        // Get user Events
        console.log("fetching userEvents started");
        console.log(get().accessToken);
        try {
          const response2 = await axios.get(`${baseURL}/user/events`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${get().accessToken}`,
            },
          });
          const { data } = response2;
          console.log("UserEvents array", data);
          // The URL for the request is '/user/events'
          set({ userEvents: data });
          return response
        } catch (error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            return (error);
          }
        }
      } catch (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          return (error);
        }
      }
    },

    refresh: async () => {
      try {
        const response = await axios.get(`${baseURL}/refresh`, {
          withCredentials: true,
        });
        const { data } = response;
        set({ accessToken: await data.accessToken });
      } catch (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      }
    },

    signout: async () => {
      const response = await axios.post(`${baseURL}/signout`);
      console.log(response);
      const { data } = response;
      set({ accessToken: await data.accessToken });
    },

    // EVENTS REQUESTS

    getEvents: async () => {
      const response = await axios.get(`${baseURL}/events`);
      const { data } = response;
      set({ events: data });
    },

    addNewEvent: async (initialEvent) => {
      console.log("adding Event started");
      console.log(get().accessToken);
      console.log('Front',initialEvent);
    
      try {
        const response = await axios.post(`${baseURL}/events`, initialEvent, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${get().accessToken}`,
          },
        });
        const { data } = response;
        console.log(data);
      } catch (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      }
    },

    editEvent: async (initialEvent) => {
      console.log("Editing Event started", initialEvent);
      const response = await axios.put(`${baseURL}/events`, initialEvent, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${get().accessToken}`,
        },
      });
      if (response) {
        const response = await axios.get(`${baseURL}/user/events`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${get().accessToken}`,
          },
        });
        const { data } = response;
        set({ userEvents: data });
      }
    },

    deleteEvent: async (_id) => {
      console.log("Deleting started", typeof _id);
      try {
        await axios.delete(`${baseURL}/events`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${get().accessToken}`,
          },
          data: { _id: _id },
        });
        try {
          const response = await axios.get(`${baseURL}/user/events`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${get().accessToken}`,
            },
          });
          const { data } = response;
          console.log(data);
          // The URL for the request is '/user/events'
          set({ userEvents: data });
        } catch (error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
        }
      } catch (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      }
    },

    getUserEvents: async () => {
      console.log("fetching userEvents started");
      console.log(get().accessToken);
      try {
        const response = await axios.get(`${baseURL}/user/events`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${get().accessToken}`,
          },
        });
        const { data } = response;
        console.log(data);
        // The URL for the request is '/user/events'
        set({ userEvents: data });
      } catch (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      }
    },

    getEventById: async (eventId) => {
      console.log("Fetching event started");
      console.log(eventId);
      const response = await axios.get(`${baseURL}/event`, {
        params: { eventId },
      });
      console.log("Event gotten", response.data);
      const { data } = response;
      set({ event: data });
    },
    findEventById: (eventId) => {
      return get().events.find((event)=> event._id === eventId)
    },
    setDate: (date) => {
      set({ date });
    },
    setEvent: (event) => {
      set({ event });
    },
    setCategory: (category) => {
      set({ category });
    },
    setSearchField: (text) => {
      set({ searchField: text });
    },
    getVenues: () => {
      const events = get().events;
      let venues = [];
      events.forEach((event) => {
        if (!venues.includes(event.location)) {
          venues.push(event.location);
        }
      });
      set({venues})
    },
    setEventId: (eventId) => {
      console.log(eventId)
      set({ eventId });
    },
  },
}));

export const useEvents = () => useEventStore((state) => state.events);
export const useUserEvents = () => useEventStore((state) => state.userEvents);
export const useToken = () => useEventStore((state) => state.accessToken);
export const useEvent = () => useEventStore((state) => state.event);
export const useDate = () => useEventStore((state) => state.date);
export const useCategory = () => useEventStore((state) => state.category);
export const useSearchField = () => useEventStore((state) => state.searchField);
export const useVenues = () => useEventStore((state) => state.venues);
export const useEventId = () => useEventStore((state) => state.eventId);

// 🎉 one selector for all our actions
export const useEventActions = () => useEventStore((state) => state.actions);
