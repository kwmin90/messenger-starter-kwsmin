const router = require("express").Router();
const aws = require("aws-sdk");

router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.stendStatus(401);
    }
    const { type, name } = req.body;
    const { username } = req.user;
    const s3Bucket = "messenger-starter-kwsmin";
    const fileName = `${username}/${name}`;
    const s3 = new aws.S3({
      signatureVersion: "v4",
      region: "ca-central-1",
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
    return res.json({ url, signedRequest });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
