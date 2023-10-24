import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";
const s3Config = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId:process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

const upload = multer({
  storage: multerS3({
    s3: s3Config,
    bucket: process.env.AWS_BUCKET_NAME,
    acl: "public-read", 
    contentType: (req, file, cb)=>{
      cb(null,file.mimetype)
    },
     metadata: (req, file, cb) => {
      cb(null, { 'Content-Type': file.mimetype });
    },
    key: (req, file, cb) => {
      cb(null, Date.now() + file.originalname);
    },
  }),
});

export default upload;
