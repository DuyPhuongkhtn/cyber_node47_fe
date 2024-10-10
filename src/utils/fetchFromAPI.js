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
    const {data} = await axios.get(`${BASE_URL}/video/get-types`);
    return data;
  } catch (error) {
    console.log("error api get list type videos");
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
