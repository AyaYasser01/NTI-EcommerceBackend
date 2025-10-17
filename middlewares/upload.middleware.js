const multer = require("multer");
const path = require("node:path");

// Filter by extensions and MIME Type
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const ext = path.extname(file.originalname).toLowerCase();
  const isValidExt = allowedTypes.test(ext);
  const isValidMimetype = allowedTypes.test(file.mimetype);
  if (isValidExt && isValidMimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only images (jpeg, jpg, png, webp) are allowed"));
  }
};

// Setup storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `product-${Date.now()}-${file.originalname.replaceAll(" ", "-")}`);
  },
});

// Export the middleware with max file size = 2 MB
const MB = 1024 * 1024;
module.exports = multer({ storage, fileFilter, limits: { fileSize: 2 * MB } });
