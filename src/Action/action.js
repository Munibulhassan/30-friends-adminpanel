import axios from "axios";
import { Toast } from "bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { baseURL } from "./config.js";
///introduction

export const getIntroduction = async (status, page) => {
  try {
    const header = {
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("AccessToken")),
      },
    };
    const response = await axios.get(
      `${baseURL}/introductions/admin/all?status=${status}`,
      {},
      header
    );

    return response.data;
  } catch (err) {
    return err.message;
  }
};

///icebreakers
export const createicebreakers = async (data) => {
  try {
    const header = {
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("AccessToken")),
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(
      `${baseURL}/icebreakers`,
      JSON.stringify(data),
      header
    );

    if (response?.data?._id) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return err.message;
  }
};
export const getIcebreakers = async (status, page) => {
  try {
    const header = {
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("AccessToken")),
      },
    };
    const response = await axios.get(
      `${baseURL}/icebreakers/admin/all?page=${page}&limit=10&status=${status}`,
      {},
      header
    );

    return response.data;
  } catch (err) {
    return err.message;
  }
};

export const updateIcebreakers = async (id, payload) => {
  try {
    const header = {
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("AccessToken")),
      },
    };
    const response = await axios.patch(
      `${baseURL}/icebreakers/${id}`,
      payload,
      header
    );
    if (response.data) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return err.message;
  }
};

export const createbulkiceabreaker = async (data) => {
  try {
    const header = {
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("AccessToken")),
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(
      `${baseURL}/icebreakers/fileUpload`,
      JSON.stringify(data),
      header
    );

    if (response?.data?._id) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return err.message;
  }
};
///USers
export const getAlluser = async (status, page) => {
  try {
    const header = {
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("AccessToken")),
      },
    };
    const response = await axios.get(
      `${baseURL}/users/admin/all?status=${status}&page=${page}&limit=10`,
      {},
      header
    );

    return response.data;
  } catch (err) {
    return err.message;
  }
};
export const updateUserStatus = async (data) => {
  try {
    const header = {
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("AccessToken")),
        "Content-Type": "application/json",
      },
    };
    const response = await axios.patch(
      `${baseURL}/users/admin/update`,
      JSON.stringify(data),
      header
    );
    if (response?.data?.data) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return err.message;
  }
};
///introduction
export const updateintroduction = async (id, data) => {
  try {
    const header = {
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("AccessToken")),
        "Content-Type": "application/json",
      },
    };
    const response = await axios.patch(
      `${baseURL}/introductions/${id}`,
      JSON.stringify(data),
      header
    );
    if (response?.data?._id) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return err.message;
  }
};
export const createintroduction = async (data) => {
  try {
    const header = {
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("AccessToken")),
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(
      `${baseURL}/introductions`,
      JSON.stringify(data),
      header
    );
    if (response?.data?._id) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return err.message;
  }
};

export const createbulkintroduction = async (data) => {
  try {
    const header = {
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("AccessToken")),
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(
      `${baseURL}/introductions/fileUpload`,
      JSON.stringify(data),
      header
    );

    if (response?.data) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return err.message;
  }
};

///Lounges
export const getAlllounges = async (status, page) => {
  try {
    const header = {
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("AccessToken")),
      },
    };
    const response = await axios.get(
      `${baseURL}/lounges/admin/all?status=${status}&limit=10&page=${page}`,
      {},
      header
    );

    if (response.data.message==="success") {
      return response.data;
    } else {
      return;
    }
  } catch (err) {
    return err.message;
  }
};

export const updateLounge = async (id, payload) => {
  try {
    const header = {
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("AccessToken")),
      },
    };
    const response = await axios.patch(
      `${baseURL}/lounges/${id}`,
      payload,
      header
    );
console.log(response)
    if (response.data._id) {
      Toast.sucess("Lounges Updated Successfully");
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return err.message;
  }
};
export const deleteLounge = async (id) => {
  try {
    const header = {
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("AccessToken")),
      },
    };
    const response = await axios.delete(`${baseURL}/lounges/${id}`, header);

    if (response.data.message==="success") {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return err.message;
  }
};

export const updateloungeimages = async (id, imgdata) => {
  const formatdata = new FormData();
if(imgdata.banner) {formatdata.append("banner", imgdata.banner) }
  if(imgdata.advertisementBanner){formatdata.append("advertisementBanner", imgdata.advertisementBanner)}
    

  const header = {
    headers: {
      Authorization:
        "Bearer " + JSON.parse(localStorage.getItem("AccessToken")),
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "multipart/form-data",
    },
  };

  const response = await axios.post(
    `${baseURL}/lounges/images/${id}`,
    formatdata,
    header
  );
  return response;
};
export const createLounge = async (data) => {
  const header = {
    headers: {
      Authorization:
        "Bearer " + JSON.parse(localStorage.getItem("AccessToken")),
      "Access-Control-Allow-Origin": "*",
    },
  };

  const response = await axios.post(`${baseURL}/lounges`, data, header);
  return response.data;

  // console.log(response);
  // const res = await updateloungeimages(response.data?._id, imgdata);
  // if(response.data.status==="fail" || response.data.error){
  //   Toast.error(response.data.message[0])
  // }

  // if (res.data._id && response.data._id) {
  //   return true;
  // } else {
  //   return false;
  // }
};

///Admin
export const Adminlogin = async (paylaod) => {
  try {
    const header = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(
      `${baseURL}/auth/admin/login`,
      paylaod,
      header
    );
    if (!response.data.error) {
      localStorage.setItem("user", JSON.stringify(response.data?.data?.user));
      localStorage.setItem(
        "AccessToken",
        JSON.stringify(response.data?.data?.token)
      );
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return err.message;
  }
};
export const createAdmin = async (data) => {
  try {
    const header = {
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("AccessToken")),
        "Access-Control-Allow-Origin": "*",
      },
    };
    const response = await axios.post(
      `${baseURL}/users/admin/create`,
      data,
      header
    );
    return response.data;

    // if (response.data.data) {
    //   return true;
    // } else {
    //   return false;
    // }
  } catch (err) {
    return err.message;
  }
};

export const logout = async () => {
  const header = {
    headers: {
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("AccessToken")),
      },
      "Content-Type": "application/json",
    },
  };

  const response = await axios.post(`${baseURL}/auth/logout`, {}, header);
  if (response.data.status==="success") {
    return true;
  } else {
    return false;
  }
};
