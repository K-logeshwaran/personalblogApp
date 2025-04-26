import formidable from "formidable";
import path from "path";
import fs from 'fs/promises';
export const config = {
  api: {
    bodyParser: false, // Important: disable bodyParser
  },
};

const SECRET = process.env.SECRET_KEY

export default async (req, res) => {
  const loc = path.resolve(process.cwd(), "articles");
  const form = formidable({ uploadDir: loc });

  form.parse(req, (err, fields, files) => {
    if (err) {
      res.status(500).send("Error parsing form data");
      return;
    }

    const secret = fields.secret;
    console.log("Received secret:", secret);

    if (secret !== SECRET) {
      res.status(401).send("Unauthorized: Invalid Secret Key");
      return;
    }

    const file = files.file;

    if (!file) {
      res.status(400).send("No file uploaded");
      return;
    }

    // Properly move file with correct filename
    const filePath = path.join(loc, file.originalFilename);

    // Rename the uploaded file
    
    fs.rename(file.filepath, filePath);

    res.send("File uploaded successfully!");
  });
};
