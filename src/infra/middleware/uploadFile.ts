import multer from "multer";
import urlImage from "@/shared/urlImage";
import fs from "fs";

const ensureDirectoryExistence = (dir: string) => {
  return fs.promises.mkdir(dir, { recursive: true });
}


const fileStorageConfig = {
  directory: urlImage,
  storage: multer.diskStorage({
    destination: urlImage,
    async filename(request, file, callback) {
      await ensureDirectoryExistence(urlImage);
      
      const fileName = `${file.originalname}`;

      return callback(null, fileName);
    }
  }),
}

const fileUpload = multer(fileStorageConfig);

export { fileUpload }