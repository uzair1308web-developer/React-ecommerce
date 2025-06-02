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
    // const token = localStorage.getItem("accesstoken")
    // console.log(token)
    const params = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(apiUrl + url, params);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
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
      console.log(res);
      response = res;
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const uploadImages = async (url, formData) => {
  try {
    const params = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
        "Content-Type": "multipart/form-data",
      },
    };
    var response;
    
    await axios.post(apiUrl + url, formData, params).then((res) => {
      response = res;
    });

    return response;
  } catch (error) {
    console.log(error);
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

    let response;
    await axios.put(apiUrl + url, updateData, params).then((res) => {
      console.log(res);
      response = res;
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteImages = async (url) => {
  try {
    const params = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
        "Content-Type": "application/json",
      },
    };

    const { res } = await axios.delete(apiUrl + url, params);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deleteData = async (url) => {
  try {
    const params = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
        "Content-Type": "application/json",
      },
    };

    var response;
    await axios.delete(apiUrl + url, params).then((res) => {
      console.log(res);
      response = res;
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};


