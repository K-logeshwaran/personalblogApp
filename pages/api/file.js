// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import formidable from "formidable";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  const loc = path.resolve(process.cwd(), "articles");
  const form = formidable({ uploadDir: loc });
  

  form
    .on("field", (data,value) => {
      console.log(data,value);
    })
    .on("fileBegin", function ( t,file) {
      console.log(true);
      file.newFilename = file.originalFilename
      file.filepath = path.join(loc,file.originalFilename)
    });

  form.parse(req);

  res.send("ok");
};
