import axios from "axios";
import { Toast } from "bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { baseURL } from "./config.js";
///introduction

export const getIntroduction = async (status) => {
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

    return response.data.data;
  } catch (err) {
    return err.message;
  }
};

///icebreakers
export const createicebreakers =async(data)=>{
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
}
export const getIcebreakers = async (status) => {
  try {
    const header = {
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("AccessToken")),
      },
    };
    const response = await axios.get(
      `${baseURL}/icebreakers/admin/all?status=${status}`,
      {},
      header
    );

    return response.data.data;
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

export const createbulkiceabreaker = async (data)=>{
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
}
///USers
export const getAlluser = async (status) => {
  try {
    const header = {
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("AccessToken")),
      },
    };
    const response = await axios.get(`${baseURL}/users/admin/all?status=${status}`, {}, header);

    return response.data.data;
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
export const updateintroduction =async(id,data)=>{
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
}
export const createintroduction =async(data)=>{
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
}

export const createbulkintroduction = async (data)=>{
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
}


///Lounges
export const getAlllounges = async (status) => {
  try {
    const header = {
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("AccessToken")),
      },
    };
    const response = await axios.get(
      `${baseURL}/lounges/admin/all?status=${status}`,
      {},
      header
    );

    if (response.data.message == "success") {
      return response.data.lounges;
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
          "Bearer " +
          JSON.parse(localStorage.getItem("AccessToken")),
      },
    };
    const response = await axios.delete(`${baseURL}/lounges/${id}`, header);

    if (response.data.message == "success") {
      return true
    } else {
      return false;
    }
  } catch (err) {
    return err.message;
  }
};

export const updateloungeimages = async (id,data)=>{
  const header = {
    headers: {
      Authorization:
        "Bearer " + JSON.parse(localStorage.getItem("AccessToken"))
      },
      'Content-Type': 'multipart/form-data; '
    
  };
  
  const response = await axios.post(`${baseURL}/lounges/images/${id}`, data, header);
  console.log(response);
}
export const createLounge = async (data,imgdata) => {
  const header = {
    headers: {
      Authorization:
        "Bearer " + JSON.parse(localStorage.getItem("AccessToken"))
      
    },
    "Content-Type": "application/json",
  };
  
  const response = await axios.post(`${baseURL}/lounges`, data, header);
  if(response.data){return true}
  // console.log(response)
  // console.log(imgdata);
  // const res = await updateloungeimages(response.data._id,imgdata)
  // console.log(res)
  
  
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
        headers: {
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("AccessToken")),
        },
        
      },
    };
    const response = await axios.post(
      `${baseURL}users/admin/create`,
      data,
      header
    );
    if (response.data.user) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return err.message;
  }
};

export const logout = async ()=>{
  const header = {
    headers: {
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("AccessToken")),
      },
      "Content-Type": "application/json",
    },
  };
  
  const response = await axios.post(
    `${baseURL}/auth/logout`,{},header) 
    if(response.data.status=="success"){
return true
    }else{
return false
    }

}
