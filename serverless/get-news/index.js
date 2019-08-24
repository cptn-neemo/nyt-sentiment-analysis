const AWS = require('aws-sdk');
const axios = require('axios');

const s3 = new AWS.S3();

exports.handler = async (event) => {
    const articles = 
        await axios.get(`https://api.nytimes.com/svc/news/v3/content/all/all/18.json?api-key=${process.env.API_KEY}`);

    //console.log(JSON.stringify(articles.data.results));

    const params = {
        Bucket: 'nyt-sentiment-analysis'
    }

    articles.data.results.forEach(async article => {
        if (!article.url || !article.abstract)
            return;
        
        params.Key = article.title.split(' ').join('_');
        params.Body = article.abstract;

//        console.log(article.title + ": " + article.abstract);

        try {
            const putResult = await s3.putObject(params).promise();
            console.log("Successfully put object in s3.");
        } catch (err) {
            console.log("Error when putting");
        }
    });


    return {
        statusCode: 200
    }
}