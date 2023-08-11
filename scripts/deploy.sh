#!/bin/bash

# Variables
FUNCTION_NAME="flixit-lambda"
ZIP_FILE="./dist/flixit-lambda.zip"
HANDLER="index.handler"
RUNTIME="nodejs18.x" 
ROLE_ARN="arn:aws:iam::872156512074:role/flixit-media-reader-writer"
LAYER_ARN="arn:aws:lambda:us-east-1:872156512074:layer:sharp-layer:1"
ENV_VARIABLES='Variables={}' 

# Check if the Lambda function already exists
function_exists=$(aws lambda list-functions --query "Functions[?FunctionName=='$FUNCTION_NAME'].FunctionName" --output text)

if [ -z "$function_exists" ]; then
  echo "Creating Lambda function..."
  aws lambda create-function \
    --function-name $FUNCTION_NAME \
    --zip-file fileb://$ZIP_FILE \
    --handler $HANDLER \
    --runtime $RUNTIME \
    --role $ROLE_ARN \
    --layers $LAYER_ARN \
    --environment $ENV_VARIABLES
else
  echo "Updating Lambda function code..."
  aws lambda update-function-code \
    --function-name $FUNCTION_NAME \
    --zip-file fileb://$ZIP_FILE

  echo "Updating Lambda function configuration..."
  aws lambda update-function-configuration \
    --function-name $FUNCTION_NAME \
    --layers $LAYER_ARN \
    --environment $ENV_VARIABLES
fi

echo "Deployment complete."
