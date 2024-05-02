const ApiUtils = {
    request: async function (method, url, data) {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        const body = JSON.stringify(data);

        const requestOptions = {
            method: method,
            headers: headers,
            body: body
        };

        try {
            const response = await fetch(url, requestOptions);
            return response.json();
        } catch (error) {
            console.error(error);
        }
    }
};

export default ApiUtils;
