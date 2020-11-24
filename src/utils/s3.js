import axios from "axios";
import { getServerUrl } from "./functions";

export const getSignedUrl = async (operation, file, type) => {
  const payload = { operation, file, type };
  return axios.post(getServerUrl() + "/api/v1/case/presign", payload);
}

export const removeSignedUrl = async (file, type, operation) => {
  const payload = { operation, file, type };
  return axios.post(getServerUrl() + "/api/v1/case/remove_file", payload);
}

export const uploadFile = async (file) => {
  const method = 'put'; 

  let fileName;
  let fileType;
  let buf;
  if (file.name){
    fileName = new Date().getTime() + "_" + file.name;
    fileName = fileName.replace(/[^a-zA-Z0-9.]/g, '');
    fileType = file.type;
    

  } else {
    fileName = new Date().getTime() + "_" + "screenshot.png";
    fileType = "image/png";
    file = new Buffer(file.replace(/^data:image\/\w+;base64,/, ""),'base64');
  }
  //fileName = fileName.split(' ').join('_');
  const response = await getSignedUrl(method, fileName, fileType);
  const options = {
    method: method,
    url: response.data.url,
    headers: {
      'Content-Type': fileType,
      'Access-Control-Allow-Origin': '*'
    },
    data: file,
    transformRequest: [(data, headers) => {
      // do not pass on the global authorization header to AWS
      delete headers.common.Authorization;
      return data;
    }]
  };
  await axios(options);
  let fileObj = {
    name: fileName.replace(/ /g, ''),
    type: fileType
  }

  const fileResponse = await getSignedUrl('get', fileName);
  console.log(fileResponse);
    console.log("fresp");

  const fileUrl = fileResponse.data.url;


  return [fileObj, fileUrl];
}

export const removeFileFromS3 = async (file, index) => {
  const method = 'put';
  await removeSignedUrl(file.name, file.type, method);
  return index;
}