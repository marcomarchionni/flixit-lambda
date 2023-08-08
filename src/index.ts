import { CopyObjectCommand, S3Client } from "@aws-sdk/client-s3";

export const handler = async (event: any): Promise<any> => {
  // Read data from event object.
  const region = "us-east-1";
  const sourceBucket = "flixit-media-bucket";
  const sourceKey = "cloud.png";

  const s3Client = new S3Client({
    region: region,
    endpoint: "http://host.docker.internal:4566", // Adjust this as per your LocalStack setup
    forcePathStyle: true,
  });

  const copyObjectParams = {
    CopySource: encodeURI(`${sourceBucket}/${sourceKey}`),
    Bucket: sourceBucket,
    Key: `resized-images/${sourceKey}`,
  };

  const copyObjectCommand = new CopyObjectCommand(copyObjectParams);
  try {
    const response = await s3Client.send(copyObjectCommand);
    console.log("Buckets listed successfully:", response);
    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  } catch (err) {
    console.log("Error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify(err),
    };
  }
};
