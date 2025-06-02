import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export const postData = async (url, formData) => {
  try {
    const response = await fetch(apiUrl + url, {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDataFromApi = async (url) => {
  try {
    const params = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(apiUrl + url, params);
    return data;
  } catch (error) {
    return error;
  }
};

export const uploadImage = async (url, updateData) => {
  try {
    const params = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
        "Content-Type": "multipart/form-data",
      },
    };
    var response;
    await axios.put(apiUrl + url, updateData, params).then((res) => {
      response = res;
    });
    return response;
  } catch (error) {
    return error;
  }
};


export const editData = async (url, updateData) => {
  try {
    const params = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
        "Content-Type": "application/json",
      },
    };

    var response;
    await axios.put(apiUrl + url, updateData, params).then((res) => {
      response = res;
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteData = async (url) => {
  const params = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
      "Content-Type": "application/json",
    },
  }

  const {res} = await axios.delete(apiUrl + url, params)
  return res;
}