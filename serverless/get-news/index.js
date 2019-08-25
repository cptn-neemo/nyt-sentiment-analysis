const AWS = require('aws-sdk');
const axios = require('axios');

const s3 = new AWS.S3();

exports.handler = async (event) => {
    const articles = 
        await axios.get(`https://api.nytimes.com/svc/news/v3/content/all/all/18.json?api-key=${process.env.API_KEY}`);

    const putPromises = articles.data.results.map(article => {
        if (!article.title || !article.abstract)
            return;
        
        const params = {
            Bucket: 'nyt-sentiment-analysis',
            Key:  article.title.split(' ').join('_'),
            Body: article.abstract
        }


        return s3.putObject(params).promise();
    })

    try {
        const results = await Promise.all(putPromises);

        return {
            statusCode: 200,
            results
        }
    } catch (err) {
        console.log('Error putting objects in S3');
        return {
            statusCode: 500,
            message: 'Error putting objects in S3'
        }
    }
}