const AWS = require('aws-sdk')

exports.handler = async (event) => {
    const docClient = new AWS.DynamoDB.DocumentClient();
    const params = {
        TableName: 'nyt-sentiment-analysis'
    }
    
    const docs = await docClient.scan(params).promise();
    
    const response = {
        statusCode: 200,
        body: JSON.stringify(docs),
    };
    return response;
};
