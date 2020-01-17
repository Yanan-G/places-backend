const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')

const secretAccessKey = process.env.SECRET
const accessKeyId = process.env.KEY
const region = process.env.REGION

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
