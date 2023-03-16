import { createClient } from "@supabase/supabase-js";
import formidable from "formidable";
// @ts-ignore
import { firstValues } from "formidable/src/helpers/firstValues.js";
import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

const db = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || ""
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }

  if (req.method === "POST") {
    try {
      const form = formidable({
        keepExtensions: true,
      });

      form.parse(req, async (err, fieldsMultiple, files: any) => {
        if (err) throw err;

        // convert formData value arrays to strings
        const exceptions = ["buttonColors"];
        const fieldsSingle = firstValues(form, fieldsMultiple, exceptions);
        console.log(fieldsMultiple, fieldsSingle);

        // get image file for upload
        const imageFile = await fs.promises.readFile(files.image[0].filepath);

        // upload image to bucket
        const { data: imageUploadData, error: imageUploadError } =
          await db.storage
            .from("gallery")
            .upload(files.image[0].newFilename, imageFile, {
              contentType: files.image[0].mimetype,
            });

        if (imageUploadError) throw imageUploadError;

        if (!imageUploadData?.Key)
          throw "No imageUploadData.Key returned from database.";

        // get public url of uploaded image
        // Key returns "gallery/{filename}", split it to get just the filename
        const { data: storedFile } = db.storage
          .from("gallery")
          .getPublicUrl(imageUploadData.Key.split("/")[1] as string);

        // save form submission to db
        const { data: rowData, error: insertError } = await db
          .from("image-gallery")
          .insert([
            {
              case: fieldsSingle.case,
              buttonColors: JSON.parse(fieldsSingle.buttonColors),
              buttonShape: fieldsSingle.buttonShape,
              credit: fieldsSingle.credit,
              creditUrl: fieldsSingle.creditUrl,
              src: storedFile?.publicURL,
              isActive: false,
            },
          ]);

        if (insertError) throw insertError;

        res.status(200).json({ message: "OK", rowData: rowData });
      });
    } catch (e) {
      res.status(500).json({ message: "ERROR", error: e });
    }
  }
}
