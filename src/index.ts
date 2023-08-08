import { CopyObjectCommand, S3Client } from "@aws-sdk/client-s3";

export const handler = async (event: any): Promise<any> => {
  // Read data from event object.
  const region = "us-east-1";
  const sourceBucket = "flixit-media-bucket";
  const sourceKey = "cloud.png";

  // Instantiate a new S3 client.
  const s3Client = new S3Client({
    region: region,
    endpoint: "http://127.0.0.1:4566",
    forcePathStyle: true,
  });

  const copyObjectParams = {
    CopySource: encodeURI(`${sourceBucket}/${sourceKey}`),
    Bucket: "flixit-media-bucket",
    Key: `resized-images/${sourceKey}`,
  };

  const copyObjectCommand = new CopyObjectCommand(copyObjectParams);
  try {
    const response = await s3Client.send(copyObjectCommand);
    console.log("Copy successful: " + response);
    return {
      statusCode: 200,
      body: JSON.stringify("Hello from Lambda!"),
    };
  } catch (err) {
    console.error("Error: " + err);
    return {
      statusCode: 500,
      body: JSON.stringify(err),
    };
  }
};
