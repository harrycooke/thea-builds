import base64 from "base-64";
import utf8 from "utf8";

export function generateCaseID(arg1, arg2) {
  return `${arg1}${arg2}`
}

export function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true;
}

export function getFileNameFromUrl(url) {
  if (url) {
    var filename = url.substring(url.lastIndexOf('/') + 1);
    return filename.split('.')[0]
  }
}

export function getFileExtensionFromUrl(url) {
  var filename = url.substring(url.lastIndexOf('.') + 1);
  return filename.split('?')[0]
}


export function encodeString(input) {
  let bytes = utf8.encode(input);
  let encoded = base64.encode(bytes);
  return encoded
}

export function decodeString(input) {
  let bytes = base64.decode(input);
  let text = utf8.decode(bytes);
  return text
}

export function convertTimeStampToDateAndTime(timestamp) {
  var day = new Date(Number(timestamp));
  var date = day.getFullYear() + '-' + ('0' + (day.getMonth() + 1)).slice(-2) + '-' + ('0' + day.getDate()).slice(-2);
  var time = ('0' + (day.getHours() + 1)).slice(-2) + ":" + ('0' + (day.getMinutes() + 1)).slice(-2);
  return `${date} ${time}`
}

export function getServerUrl() {
  return process.env.REACT_APP_API_SERVER ? process.env.REACT_APP_API_SERVER : '';
  return 'http://localhost:4000';
}
