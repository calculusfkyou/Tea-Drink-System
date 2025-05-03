import multer from 'multer';

// 使用記憶體儲存，不再保存到磁碟
const storage = multer.memoryStorage();

// 過濾文件 (只允許圖片)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('僅支持圖像文件！'), false);
  }
};

export const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: fileFilter
});
