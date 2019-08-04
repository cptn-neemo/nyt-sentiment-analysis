const axios = require('axios');

exports.handler = async (event) => {

    const articles = 
        await axios.get(`https://api.nytimes.com/svc/news/v3/content/all/all/13.json?api-key=${process.env.API_KEY}`);
    const abstracts = articles.data.results.map(article => article.abstract);
   

    return {
        statusCode: 200,
        body: abstracts
    }
}