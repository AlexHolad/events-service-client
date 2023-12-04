import { client, setHeaderToken, removeHeaderToken } from "./api";
import { Navigate } from "react-router-dom";
import { useEventStore } from "./store";



export const fetchNewToken = async () => {
  try {
    const token = await client
      .get("http://localhost:5000/refresh")
      .then(res => res.data.accessToken);
    return token;
  } catch (error) {
    console.log("Fetching token", error)
    return null;
  }
};

export const refreshAuth = async (failedRequest) => {
  const newToken = await fetchNewToken();

  if (newToken) {
    failedRequest.response.config.headers.Authorization = "Bearer " + newToken;
    setHeaderToken(newToken);
    console.log(newToken)
    // you can set your token in storage too
    useEventStore.setState({accessToken: newToken})
    localStorage.setItem('accessToken', newToken);
    return Promise.resolve(newToken);
  } else {
    // you can redirect to login page here
    console.log('deleteng token from localStorage and zustand store and redirect to SingIn page')
    useEventStore.setState({accessToken: ''})
    localStorage.removeItem('accessToken');
    removeHeaderToken()
    // Navigate('/signin')
    return Promise.reject();
  }
};