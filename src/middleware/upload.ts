import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";
const s3Config = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: "AKIAXZRD5R2CL66NF6NK",
    secretAccessKey: "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",
  },
});

const upload = multer({
  storage: multerS3({
    s3: s3Config,
    bucket: "shivam-practics-bucket",
    // acl: "public-read", // or 'private' for private files
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: (req, file, cb) => {
      cb(null, Date.now() + file.originalname);
    },
  }),
});

export default upload;
