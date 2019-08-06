import boto3
from textblob import TextBlob
import json

def lambda_handler(event, context):
    print('Hello World!')
    print('Dog')
    analysis = TextBlob('This is a really positive abstract the world is amazing') 
    return {
        'statusCode': 200,
        'analysis': analysis.sentiment.polarity
    }