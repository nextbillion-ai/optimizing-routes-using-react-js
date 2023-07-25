import axios from "axios";
import config from "./config";


//   create task optimization task

export const createTask = (payload) => {
    const url = "https://api.nextbillion.io/optimization/v2?key=" + config.apiKey;
    return axios.post(url, payload);
  };
  
  
//  retrieve the optimized solution for the optimization task using request id 
//  polling request every 5 secs to check if the optimization task is completed
  export const getOptimizedSolution = (requestId) => {
    const url = `https://api.nextbillion.io/optimization/v2/result?id=${requestId}&key=${config.apiKey}`;
    const headers = {
      Authorization: `Bearer ${config.apiKey}`,
    };
    return new Promise((resolve, reject) => {
    let retryTimer = 0
      const loadResult = () => {
        axios
          .get(url, {
            headers,
            params: {
              key: config.apiKey,
              id: requestId,
            },
          })
          .then((res) => {
            const data = res.data
            if (data.status !== "Ok" || data.result.code !== 0) {
              retryTimer = setTimeout(() => {
                loadResult()
              }, 1000)
              return
            }
            const result = data
            resolve(result)
          })
          .catch((e) => {
            reject(e)
          })
      }
      loadResult()
    })
  };
  