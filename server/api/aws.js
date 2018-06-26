const router = require('express').Router();
let AWS = require('aws-sdk');
let fs = require('fs');
let path = require('path');
let configPath = path.join(__dirname, '../../secrets.json');
let blobUtil = require('blob-util');
const multer = require('multer');
let upload = multer();
module.exports = router;

//set up AWS config
AWS.config.loadFromPath(configPath);

// Create an S3 client
let s3 = new AWS.S3();

router.post('/upload', upload.any(), function(req, res, next) {
  console.log('test');
  let formData = req.body;
  let files = req.files;
  // fs.writeFileSync('audio/audiotest.webm', req.files);
  console.log('form data', formData, 'files', files[0].buffer);
  let s3request = {
    Body: files[0].buffer, //actual file turned into a string,
    Bucket: 'replicode',
    Key: 'testfile81', //filename
    ContentType: 'audio/webm',
    // ContentEncoding: 'base64', //encoding scheme
    ACL: 'public-read',
  };

  s3.putObject(s3request, function(err, data) {
    if (err) {
      console.error(err);
    }
    res.send('Uploaded successfully');
  });
});

//mounted on /api/aws
//POST route for '/api/aws/upload'
// router.post('/upload', async (req, res) => {
//s3 request will contain the file to upload
// let base64 = req.body['data:audio/webm;codecs'].slice(12);
// let blob = blobUtil.base64StringToBlob(base64);
// console.log('blob', req.body);
// let buffer = new Buffer(base64, 'base64');
// console.log('body', req.body.blobURL);
// fs.readFile(req.body.blobURL, (err, data) => {
//   if (err) console.log(err);
//   console.log('data,', data);
// });
// let blob = await new Blob([req.body], { type: 'audio/webm' });
// console.log('blob', blob);

// let buff = new Buffer(req.body);
// console.log('buf', buff);
// let obj = req.body['data:audio/webm;codecs'];
// console.log('req body', obj);
// let buf = Buffer.from(obj.split('base64,')[1], 'base64');
// let buf = new Buffer(obj.split('base64,')[1], 'base64');
// console.log('GONNA POST THIS', buf);
// var s3request = {
//   Body: buff, //actual file turned into a string,
//   Bucket: 'replicode',
//   Key: 'testfile77', //filename
//   ContentType: 'audio/webm',
//   // ContentEncoding: 'base64', //encoding scheme
//   ACL: 'public-read',
// };

// s3.putObject(s3request, function(err, data) {
//   if (err) {
//     console.error(err);
//   }
//   res.send('Uploaded successfully');
// });
// });

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
