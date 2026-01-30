import { useMutation } from "react-query";
import { determineInstance } from "utils/helper";

const get = async ({
  url,
  type,
  token = false,
  file = false,
  customHeaders = {},
}) => {
  const instance = determineInstance(type);
  const username = process.env.REACT_APP_Security_ID;
  const password = process.env.REACT_APP_Security_Password;
  const credentials = btoa(`${username}:${password}`);

  let headers = {
    "Content-Type": "text/plain",
    Authorization: `Basic ${credentials}`,
    Cookie: "pin_writes=y",
  };

  if (token) {
    // const accessToken = localStorage.getItem('token')
    // headers = { 'JCMS-API-TOKEN': accessToken, "Content-Type": "image/jpeg" }
  }
  if (Object.keys(customHeaders).length > 0) {
    headers = { ...headers, ...customHeaders };
  }
  if (file) {
    headers = { ...headers, "Content-Type": "image/jpeg" };
  }
  let response;
  const { data } = await instance
    .get(url, { headers, responseType: file ? "blob" : "json" })
    .then((res) => {
      response = res;
      return res;
    })
    .catch(async (e) => {
      console.dir(e, { depth: null });
      throw e;
    });
  console.log(data);
  return response;
};

const useGet = () => useMutation(get);

export default useGet;
