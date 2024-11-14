// uploadConfig.js
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');

/**
 * Dynamic upload configuration for handling different file types and limits.
 * @param {Object} options - Configuration options
 * @param {Array<string>} options.allowedFormats - Allowed file extensions (e.g., ['jpg', 'png'])
 * @param {number} options.fileSize - Maximum file size in bytes (e.g., 1 * 1024 * 1024 for 1MB)
 * @param {string} options.folder - Cloudinary folder name to store files
 * @returns {Object} multer middleware for uploading files
 */
const configureUploader = ({ allowedFormats, fileSize, folder }) => {
  // Cloudinary storage configuration
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: folder,
      allowed_formats: allowedFormats,
    },
  });

  // File filter function to validate MIME types based on allowed formats
  const fileFilter = (req, file, cb) => {
    const mimeType = file.mimetype.split('/')[1]; // Get file extension from MIME type
    if (allowedFormats.includes(mimeType)) {
      cb(null, true);
    } else {
      cb(new Error(`Unsupported file type! Only ${allowedFormats.join(', ')} are allowed.`), false);
    }
  };

  // Configure multer with storage, file size, and file filter
  return multer({
    storage: storage,
    limits: { fileSize: fileSize },
    fileFilter: fileFilter,
  });
};

module.exports = {configureUploader};
