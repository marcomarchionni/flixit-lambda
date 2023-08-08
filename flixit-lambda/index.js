"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    // Read data from event object.
    const region = "us-east-1";
    const sourceBucket = "flixit-media-bucket";
    const sourceKey = "cloud.png";
    const s3Client = new client_s3_1.S3Client({
        region: region,
        endpoint: "http://host.docker.internal:4566",
        forcePathStyle: true,
    });
    const copyObjectParams = {
        CopySource: encodeURI(`${sourceBucket}/${sourceKey}`),
        Bucket: sourceBucket,
        Key: `resized-images/${sourceKey}`,
    };
    const copyObjectCommand = new client_s3_1.CopyObjectCommand(copyObjectParams);
    try {
        const response = yield s3Client.send(copyObjectCommand);
        console.log("Buckets listed successfully:", response);
        return {
            statusCode: 200,
            body: JSON.stringify(response),
        };
    }
    catch (err) {
        console.log("Error:", err);
        return {
            statusCode: 500,
            body: JSON.stringify(err),
        };
    }
});
exports.handler = handler;
