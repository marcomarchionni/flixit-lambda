#!/bin/bash

# Variables
OUTPUT_FILE="./out/output.json"

# Execute the Lambda function
echo "Executing the Lambda function..."
aws lambda invoke --function-name flixit-lambda $OUTPUT_FILE







