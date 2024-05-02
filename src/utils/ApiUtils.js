const ApiUtils = {
    request: function (method, url, data) {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        const body = JSON.stringify(data);

        const requestOptions = {
        method: method,
        headers: headers,
        body: body
        };

        return fetch(url, requestOptions)
        .then((response) => response.json())
        .catch((error) => console.error(error));
    }
};
  
export default ApiUtils;
