const router = require('express').Router();
let AWS = require('aws-sdk');
let fs = require('fs');
let path = require('path');
let configPath = path.join(__dirname, '../../secrets.json');
const shortid = require('shortid');
const multer = require('multer');
let upload = multer();

module.exports = router;

//set up AWS config
AWS.config.loadFromPath(configPath);

// Create an S3 client
let s3 = new AWS.S3();

//mounted on /api/aws
//POST route for '/api/aws/upload'
router.post('/upload', upload.any(), function(req, res, next) {
  let uniqueId = shortid.generate();
  let audioData = req.body;
  let files = req.files;
  let fileName = `${files[0].fieldname}-${uniqueId}`;
  console.log('form data', audioData, 'files', files[0]);
  let s3request = {
    Body: files[0].buffer, //actual file as a buffer,
    Bucket: 'replicode',
    Key: fileName, //filename
    ContentType: 'audio/webm',
    ACL: 'public-read',
  };

  // s3.putObject(s3request, function(err, data) {
  //   if (err) {
  //     console.error(err);
  //     res.send('Upload Unsuccessful');
  //   } else {
  //     console.log('backend filename', fileName);
  //     res.send(fileName);
  //   }
  // });
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
