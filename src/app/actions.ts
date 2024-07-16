"use server";

import cloudinary from "cloudinary";

cloudinary.v2.config({
  secure: true,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
});

// https://cloudinary.com/documentation/image_upload_api_reference#upload
export const handleUploadFile = async (formData: any) => {
  const options = {};
  const base64 = formData.get("base64");

  try {
    const result = await cloudinary.v2.uploader.unsigned_upload(base64, "buptedx3", options);

    return result;
  } catch (error) {
    console.log("error", error);
  }
};

export const handleSave = async (delta: string) => {
  try {
    const data = await fetch(process.env.API_ENDPOINT.concat("/1"), {
      method: "PATCH",
      body: JSON.stringify({
        value: delta,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
    };
  }
};
