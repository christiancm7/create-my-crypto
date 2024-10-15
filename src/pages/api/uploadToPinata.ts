// pages/api/uploadToPinata.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { PinataSDK } from "pinata";
import formidable from "formidable";
import fs from "fs";

const PINATA_JWT = process.env.PINATA_JWT;
const PINATA_GATEWAY_URL = process.env.NEXT_PUBLIC_GATEWAY_URL;

export const config = {
  api: {
    bodyParser: false,
  },
};

if (!PINATA_JWT) {
  console.error("PINATA_JWT is not defined in environment variables.");
}
if (!PINATA_GATEWAY_URL) {
  console.error(
    "NEXT_PUBLIC_GATEWAY_URL is not defined in environment variables."
  );
}

const pinata = new PinataSDK({
  pinataJwt: PINATA_JWT!,
  pinataGateway: PINATA_GATEWAY_URL!,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const form = formidable({ multiples: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Formidable error:", err);
      res.status(500).json({ error: "Failed to parse form data" });
      return;
    }

    console.log("Fields:", fields);
    console.log("Files:", files);

    const { name, symbol, description } = fields;

    if (!name || !symbol) {
      res.status(400).json({ error: "Name and symbol are required." });
      return;
    }

    // Adjust for possible array structure
    let imageFile = files.image;
    if (Array.isArray(imageFile)) {
      imageFile = imageFile[0];
    }

    try {
      let imageUrl: string | undefined;

      if (imageFile) {
        const filePath = imageFile.filepath || imageFile.path;

        if (!filePath) {
          console.error("File path is undefined.");
          res.status(500).json({ error: "File path is undefined." });
          return;
        }

        // Read the image file
        const fileData = fs.readFileSync(filePath);

        // Use native File and Blob objects
        const blob = new Blob([fileData], {
          type: imageFile.mimetype || imageFile.type,
        });
        const file = new File(
          [blob],
          imageFile.originalFilename || imageFile.name || "image.png",
          {
            type: imageFile.mimetype || imageFile.type,
          }
        );

        // Upload the image to Pinata
        const imageResult = await pinata.upload.file(file);

        imageUrl = `${PINATA_GATEWAY_URL}/${imageResult.cid}`;
      }

      // Create metadata JSON
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const metadataJSON: any = {
        name,
        symbol,
      };

      if (description) {
        metadataJSON.description = description;
      }

      if (imageUrl) {
        metadataJSON.image = imageUrl;
        metadataJSON.properties = {
          files: [
            {
              uri: imageUrl,
              type: imageFile.mimetype || imageFile.type,
            },
          ],
          category: "image",
        };
      }

      const metadataResult = await pinata.upload.json(metadataJSON);

      const metadataUri = `${PINATA_GATEWAY_URL}/${metadataResult.cid}`;

      res.status(200).json({ metadataUri });
    } catch (error) {
      console.error("Error uploading to Pinata:", error);
      res.status(500).json({ error: "Failed to upload to Pinata" });
    }
  });
}
