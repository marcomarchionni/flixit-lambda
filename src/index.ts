import { resizeImage } from "./image-resizer";
import { getS3ImageStream, putS3ImageBuffer } from "./s3";

export const handler = async (event: any): Promise<any> => {
  const record = event.Records[0];
  const bucketName = record.s3.bucket.name;
  const originalPrefix = "original-images/";
  const resizedPrefix = "resized-images/";
  const sourceKey = decodeURIComponent(
    record.s3.object.key.replace(/\+/g, " ")
  );
  const resizedImageKey = sourceKey.startsWith(originalPrefix)
    ? sourceKey.replace(originalPrefix, resizedPrefix)
    : `${resizedPrefix}${sourceKey}`;

  // Read data from event object.
  if (!sourceKey)
    return {
      statusCode: 400,
      body: "No key specified",
    };

  try {
    //Get image from bucket
    const imageStream = await getS3ImageStream(bucketName, sourceKey);

    // Resize image
    const resizedImageBuffer = await resizeImage(imageStream);

    // Put resized image in bucket
    await putS3ImageBuffer(bucketName, resizedImageBuffer, resizedImageKey);

    return {
      statusCode: 200,
      body: "Image resized and uploaded successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: "An error occurred",
    };
  }
};
