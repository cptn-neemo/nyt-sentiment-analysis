import boto3
from textblob import TextBlob
import json
import datetime

s3 = boto3.client('s3')
dynamodb = boto3.client('dynamodb')

def analyze_abstract(obj):
    abstract = obj['Body'].read().decode('utf-8')
    abstract_analysis = TextBlob(abstract)
    return abstract_analysis.sentiment.polarity

def put_item(title, sentiment):
    item = {
        'title': { 'S': title },
        'sentiment': { 'N': str(sentiment) },
        'created': { 'S': str(datetime.datetime.now())}
    }

    dynamodb.put_item(TableName="nyt-sentiment-analysis", Item=item)

def lambda_handler(event, context):
    # analysis = TextBlob('This is a really positive abstract the world is amazing') 
    analysis_dict = dict()

    for record in event['Records']:
        bucket_name = record['s3']['bucket']['name']
        key = record['s3']['object']['key']
        abstract_obj = s3.get_object(Bucket=bucket_name, Key=key)

        sentiment = analyze_abstract(abstract_obj)
        
        print("{0}: {1}".format(key, str(sentiment)))

        put_item(key, sentiment)
        s3.delete_object(Bucket=bucket_name, Key=key)


    return {
        'statusCode': 200,
        'analysis': json.dumps(analysis_dict)
    }