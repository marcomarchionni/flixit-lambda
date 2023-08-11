import fs from "fs";
import { resizeImage } from "../image-resizer"; // Adjust the path to your function file

const imagePath = "../../assets/cloud.png"; // Path to your test image
const outputImagePath = "../../assets/resized-image.jpg"; // Path for the resized image

const imageStream = fs.createReadStream(imagePath);

resizeImage(imageStream)
  .then((resizedImageBuffer) => {
    fs.writeFileSync(outputImagePath, resizedImageBuffer);
    console.log(`Resized image written to ${outputImagePath}`);
  })
  .catch((error) => {
    console.error("An error occurred:", error);
  });
