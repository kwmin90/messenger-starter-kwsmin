const router = require("express").Router();
const aws = require("aws-sdk");

router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const { type, name } = req.body;
    const { username } = req.user;
    const s3Bucket = process.env.AWS_BUCKET_NAME;
    const fileName = `${username}/${name}`;
    const s3 = new aws.S3({
      signatureVersion: "v4",
      region: process.env.AWS_REGION,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    });
    const s3Params = {
      Bucket: s3Bucket,
      Key: fileName,
      Expires: 60,
      ContentType: type,
      ACL: "public-read",
    };
    const signedRequest = await s3.getSignedUrl("putObject", s3Params);
    const url = `https://${s3Bucket}.s3.amazonaws.com/${fileName}`;
    return res.status(200).json({ url, signedRequest });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
