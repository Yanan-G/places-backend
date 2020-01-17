const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')

const secretAccessKey = process.env.secretAccessKey
const accessKeyId = process.env.accessKeyId
const region = process.env.region

const s3 = new aws.S3({
	accessKeyId,
	secretAccessKey,
	region
})

const fileUpload = multer({
	storage: multerS3({
		acl: 'public-read',
		s3,
		bucket: 'yourplaces',
		key: function(req, file, cb) {
			/*I'm using Date.now() to make sure my file has a unique name*/
			req.file = Date.now() + file.originalname
			cb(null, Date.now() + file.originalname)
		}
	})
})

module.exports = fileUpload
