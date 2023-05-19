require('dotenv').config()
const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey
})

// uploads a file to s3
function uploadFile(file) {
  let listResponse=[];
  file.forEach(async element => {
    const fileStream = fs.createReadStream(element.path)
    
    const uploadParams = {
      Bucket: bucketName,
      Body: fileStream,
      Key: element.filename
    }
  
    listResponse.push(s3.upload(uploadParams).promise())
  })
  return listResponse;
}
exports.uploadFile = uploadFile


// downloads a file from s3
function getFileStream(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName
  }

  return s3.getObject(downloadParams).createReadStream()
}
exports.getFileStream = getFileStream


function deleteFile(namefile) {
  let listResponse=[];
    const deleteParam = {
      Bucket: bucketName,
      Key: namefile
    }
  
    listResponse.push(s3.deleteObject(deleteParam).promise())
  return listResponse;
}
exports.deleteFile = deleteFile