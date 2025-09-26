import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { config } from "./config";

cloudinary.config({
  cloud_name: config.cloudinarycloudName,
  api_key: config.cloudinaryAPIKey,
  api_secret: config.cloudinaryAPISecret,
});

const uploadOnCloudinary = async (
  localFilePath: any,
  folder: string,
  format?: string,
  fileName?: string
) => {
  try {
    if (!localFilePath) return null;
    //upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      filename_override: fileName,
      folder: folder,
      format: format,
    });
    // file has been uploaded successfull
    //console.log("file is uploaded on cloudinary ", response.url);
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload operation got failed
    return null;
  }
};

const deleteOnCloudinary = async (name: string) => {
  const response = await cloudinary.uploader.destroy(name);
  return response;
};
export { uploadOnCloudinary, deleteOnCloudinary };
