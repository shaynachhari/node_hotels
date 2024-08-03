const multer = require('multer');
const path = require('path');

// Set up storage engine (Specify the folder to store uploaded files)
const storage = multer.diskStorage({
    destination: './uploads/',                
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

// Initialize upload (Limit file size to 1MB)
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },                      
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
}).single('image');

// Check file type
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

module.exports = upload;

