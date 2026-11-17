import multer from "multer";
import sharp from "sharp";

const multerUpload = multer({
  dest: "uploads/",
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype.startsWith("image/") ||
      file.mimetype.startsWith("video/")
    ) {
      cb(null, true);
    } else {
      const error = new Error("Only images and videos are allowed!");
      error.status = 400;
      cb(error, false);
    }
  },
});

const parseCatUpload = multerUpload.fields([
  { name: "file", maxCount: 1 },
  { name: "cat", maxCount: 1 },
]);

const upload = (req, res, next) => {
  parseCatUpload(req, res, (error) => {
    if (error) {
      next(error);
      return;
    }

    const files = req.files ?? {};
    const uploadedFile = files.file?.[0];
    const legacyUploadedFile = files.cat?.[0];
    if (uploadedFile && legacyUploadedFile) {
      const uploadError = new Error(
        "Upload one file using either the file or cat field.",
      );
      uploadError.status = 400;
      next(uploadError);
      return;
    }

    req.file = uploadedFile ?? legacyUploadedFile;
    next();
  });
};

const createThumbnail = async (req, res, next) => {
  if (!req.file || !req.file.mimetype.startsWith("image/")) {
    next();
    return;
  }

  await sharp(req.file.path)
    .resize(160, 160)
    .png()
    .toFile(`${req.file.path}_thumb.png`);

  next();
};

export { upload, createThumbnail };
