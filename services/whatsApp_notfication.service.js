const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const { API_KEY, SOURCE_MOBILE_NUMBER } = process.env;
const url = {
    sendTemplateMessage: 'http://api.gupshup.io/sm/api/v1/template/msg'
};

// 
const getUrlEncodedData = (data) => {
    const resultantData = new URLSearchParams();
    Object.keys(data).forEach(key => {
        resultantData.append(key, typeof data[key] === 'object' ? JSON.stringify(data[key]) : data[key]);
    });
    return resultantData;
};

const config = {
    headers: {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/x-www-form-urlencoded',
        apiKey: API_KEY
    }
};

// gupshup send template notification
const sendTemplateMessage = (userMobileNumber, templateId, templateParams) => {
    const params = getUrlEncodedData({
        source: SOURCE_MOBILE_NUMBER,
        destination: userMobileNumber,
        template: {
            id: templateId,
            params: templateParams
        },
        // message: mediaMessage
    });


    return axios.post(url.sendTemplateMessage, params, config);
};


module.exports = {
    sendTemplateMessage
};
