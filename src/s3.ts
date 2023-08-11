import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { Readable } from "stream";

const s3Client = new S3Client({
  region: process.env.REGION || "us-east-1",
  endpoint: process.env.ENDPOINT_URL, //"http://host.docker.internal:4566", // Adjust this as per your LocalStack setup
  forcePathStyle: process.env.FORCE_PATH_STYLE
    ? JSON.parse(process.env.FORCE_PATH_STYLE)
    : undefined,
});

export const getS3ImageStream = async (bucketName: string, key: string) => {
  const getObjectParams = {
    Bucket: bucketName,
    Key: key,
  };

  const getObjectCmd = new GetObjectCommand(getObjectParams);
  const getObjectResponse = await s3Client.send(getObjectCmd);
  return getObjectResponse.Body as Readable;
};

export const putS3ImageBuffer = async (
  bucketName: string,
  buffer: Buffer,
  key: string
) => {
  const putObjectParams = {
    Bucket: bucketName,
    Key: key,
    Body: buffer,
  };
  const putObjectCmd = new PutObjectCommand(putObjectParams);
  const response = await s3Client.send(putObjectCmd);
  console.log("Image resized and uploaded successfully");
  return response;
};
