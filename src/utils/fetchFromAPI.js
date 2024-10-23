import axios from 'axios';

export const BASE_URL = 'http://localhost:8080';

const options = {
  params: {
    maxResults: 50,
  },
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
    // 'token': localStorage.getItem("LOGIN_USER")
  },
};



export const fetchFromAPI = async (url) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`, options);

  return data;
};

// thêm interceptor
// b1: tạo axiosInstance
export const axiosInstance = axios.create({
  baseURL: `${BASE_URL}`
});

axiosInstance.interceptors.request.use(
  (config) => {
    // check flag requireAuth
    // nếu requireAuth =true => truyền token vào header request
    // ngược lại => bình thường
    if (config.requireAuth) {
      // lấy access token từ local storage
      let accessToken = localStorage.getItem("LOGIN_USER");
      if (accessToken) {
        config.headers["token"] = accessToken;
      }
      return config;
    }
  },
  () => {}
);

axiosInstance.interceptors.response.use()

// define function call API get list video từ BE

export const getVideosAPI = async () => {
  try {
    const {data} = await axios.get(`${BASE_URL}/video/get-videos`)
    // console.log(result);
    return data;
  } catch (error) {
    console.log("error api get list video");
  }
}

// define function call aPI get list type video từ BE

export const getTypesAPI = async () => {
  try {
    const {data} = await axiosInstance.get(`${BASE_URL}/video/get-types`, {
      requireAuth: true
    });
    return data;
  } catch (error) {
    throw error
  }
}

// define function call API get list video by type_id từ BE
export const getVideosTypeIdAPI = async (typeId) => {
  try {
    const {data} = await axios.get(`${BASE_URL}/video/get-videos/${typeId}`);
    return data;
  } catch(error) {
    console.log("error api get list video by type_id");
  }
}

export const getVideoById = async (videoId) => {
  try {
    const {data} = await axios.get(`${BASE_URL}/video/get-video/${videoId}`);
    return data;
  } catch (error) {
    console.log("error api get video by id");
  }
}

export const signUpAPI = async (payload) => {
  try{
    const {data} = await axios.post(`${BASE_URL}/auth/sign-up`, payload);
    return data;
  } catch (error) {
    throw error;
  }
}

export const loginAPI = async (payload) => {
  try {
    const {data} = await axios.post(`${BASE_URL}/auth/login`, payload);
    return data;
  } catch (error) {
    throw error;
  }
}

export const loginFacebookAPI = async (payload) => {
  try{
    // payload: email, name, id
    const {data} = await axios.post(`${BASE_URL}/auth/login-facebook`, payload);
    return data;
  } catch(error) {
    throw error;
  }
}

export const forgotPassAPI = async (payload) => {
  try {
    // payload: email
    let {data} = await axios.post(`${BASE_URL}/auth/forgot-password`, payload);
    return data;
  } catch (error) {
    throw error;
  }
}

export const changePassAPI = async (payload) => {
  try {
    // payload: email, code, newPass
    let {data} = await axios.post(`${BASE_URL}/auth/change-password`, payload);
    return data;
  } catch (error) {
    throw error;
  }
}
