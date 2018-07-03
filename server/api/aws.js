const router = require('express').Router();
let AWS = require('aws-sdk');
const shortid = require('shortid');
const multer = require('multer');
let upload = multer();

module.exports = router;

//set up AWS config
AWS.config.setPromisesDependency(null);
// Create an S3 client
let s3 = new AWS.S3();

//mounted on /api/aws
//POST route for '/api/aws/:userid/upload'
router.post('/:userId/upload', upload.any(), (req, res, next) => {
  const userId = Number(req.params.userId);
  if (userId === Number(req.user.id) && req.user.isCreator) {
    let uniqueId = shortid.generate();
    let audioData = req.body;
    let files = req.files;
    let fileName = `${files[0].fieldname.replace(/\s+/g, '_').replace(/\W/g, '')}-${uniqueId}`;
    console.log('form data', audioData, 'files', files[0]);
    let s3request = {
      Body: files[0].buffer, //actual file as a buffer,
      Bucket: 'replicode',
      Key: fileName, //filename
      ContentType: 'audio/webm',
      ACL: 'public-read',
    };

    let putObjectPromise = s3.putObject(s3request).promise();

    putObjectPromise
      .then(data => {
        console.log('Upload Successful');
        res.send(fileName);
      })
      .catch(next);
  }
});

//GET request for list of objects in bucket
// '/api/aws/list'
router.get('/list', function(req, res) {
  s3.listObjects({ Bucket: 'replicode' }, function(err, data) {
    if (err) {
      console.error(err);
    }
    res.json(data);
  });
});

router.get('/specificFile', (req, res) => {
  let request = { Bucket: 'replicode', Key: req.param.name };
  s3.getObject(request, (err, data) => {
    if (err) {
      console.error(err);
    }
    res.json(data);
  });
});
//
