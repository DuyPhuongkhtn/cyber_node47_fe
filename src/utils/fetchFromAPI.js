import axios from 'axios';

export const BASE_URL = 'http://localhost:8080';

// define const MAX_RETRIES = 5;
const MAX_RETRIES = 20;

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
    }
    return config;
  },
  (error) => { return error }
);

let test = 0;

axiosInstance.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    // kiểm tra lỗi 401
    if (error.response && error.response.status == 401) {
      // console.log("error.response.status: ", error, !originalRequest._retryCount)
      // nếu chưa có thuộc retryCount thì khởi tạo giá trị là 0;
      if (test < MAX_RETRIES) {
        console.log("test: ", test)
        test = test + 1;
        console.log("test");
        try {
          // gọi function extend token để lấy token mới
          const data = await extendTokenAPI();
          console.log("data: ", data)

          // gán token mới vào header của request
          originalRequest.headers["token"] = data.token;

          // retry lại request với token mới
          return axiosInstance(originalRequest);
        } catch (error) {
          console.log("error retry: ", error);
        }

      } else {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
)

// define function call API get list video từ BE

// define axios extend token
export const extendTokenAPI = async () => {
  try {
    console.log("get ")
    const {data} = await axiosInstance.post(`${BASE_URL}/auth/extend-token`, {}, {
      withCredentials: true // cho phép truyền cookie về cho BE
    });

    // console.log("get data: ", data)

    // lưu new access token mới vào local storage
    localStorage.setItem("LOGIN_USER", data.token);
    return data;
  } catch (error) {
    throw error;
  }
}

export const getVideosAPI = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/video/get-videos`)
    // console.log(result);
    return data;
  } catch (error) {
    console.log("error api get list video");
  }
}

// define function call aPI get list type video từ BE

export const getTypesAPI = async () => {
  try {
    const { data } = await axiosInstance.get(`${BASE_URL}/video/get-types`, {
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
    const { data } = await axios.get(`${BASE_URL}/video/get-videos/${typeId}`);
    return data;
  } catch (error) {
    console.log("error api get list video by type_id");
  }
}

export const getVideoById = async (videoId) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/video/get-video/${videoId}`);
    return data;
  } catch (error) {
    console.log("error api get video by id");
  }
}

export const signUpAPI = async (payload) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/auth/sign-up`, payload);
    return data;
  } catch (error) {
    throw error;
  }
}

export const loginAPI = async (payload) => {
  try {
    const { data } = await axiosInstance.post(`${BASE_URL}/auth/login`, payload, {
      withCredentials: true // setting để FE nhận được cookie cũng như là gửi cookie cho BE
    });
    console.log("get login API: ", data)
    return data;
  } catch (error) {
    throw error;
  }
}

export const loginFacebookAPI = async (payload) => {
  try {
    // payload: email, name, id
    const { data } = await axios.post(`${BASE_URL}/auth/login-facebook`, payload);
    return data;
  } catch (error) {
    throw error;
  }
}

export const forgotPassAPI = async (payload) => {
  try {
    // payload: email
    let { data } = await axios.post(`${BASE_URL}/auth/forgot-password`, payload);
    return data;
  } catch (error) {
    throw error;
  }
}

export const changePassAPI = async (payload) => {
  try {
    // payload: email, code, newPass
    let { data } = await axios.post(`${BASE_URL}/auth/change-password`, payload);
    return data;
  } catch (error) {
    throw error;
  }
}
