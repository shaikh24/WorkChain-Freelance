const multer = require('multer');
const supabase = require('../lib/supabase');
const path = require('path');

const storage = multer.memoryStorage();
const upload = multer({ storage });

async function uploadFilesToSupabase(req, res, next) {
  try {
    if (!req.files || req.files.length === 0) {
      req.filesData = [];
      return next();
    }

    const bucket = process.env.SUPABASE_BUCKET || 'jobs';
    const uploadedFiles = [];

    for (const file of req.files) {
      const ext = path.extname(file.originalname);
      const uniqueName = `${req.user?._id || 'guest'}-${Date.now()}-${file.originalname}`;
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(uniqueName, file.buffer, { contentType: file.mimetype, upsert: false });

      if (error) {
        console.error('Supabase upload error:', error);
        continue;
      }
      const { data: publicData } = supabase.storage.from(bucket).getPublicUrl(uniqueName);
      uploadedFiles.push(publicData.publicUrl);
    }

    req.filesData = uploadedFiles;
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'File upload failed' });
  }
}

module.exports = { upload, uploadFilesToSupabase };