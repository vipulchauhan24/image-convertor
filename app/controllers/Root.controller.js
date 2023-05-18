const fs = require("fs");
const ejs = require("ejs");
const path = require("path");
const webp = require("webp-converter");
webp.grant_permission();

const readFiles = (directory) => {
  fs.readdir(directory, function (err, files) {
    if (err) {
      console.error("Could not list the directory.", err);
      process.exit(1);
    }

    files.forEach(function (file, index) {
      var fromPath = path.join(directory, file);
      fs.stat(fromPath, function (error, stat) {
        if (error) {
          console.error("Error stating file.", error);
          return;
        }

        if (stat.isFile()) {
          const ext = path.extname(fromPath);
          if (ext === ".png" || ext === ".jpeg" || ext === ".jpg") {
            // console.log("'%s' is the ext.", ext);
            let file = fromPath;
            file = file.substring(0, file.lastIndexOf(".")) + ".webp";
            // console.log("'%s' is the file.", file);

            const result = webp.cwebp(
              fromPath,
              file,
              "-q 100",
              (logging = "-v")
            );
            // result.then((response) => {
            //   console.log(response);
            // });
          }
          return;
        } else if (stat.isDirectory()) {
          readFiles(fromPath);
        }
      });
    });
  });
};

exports.renderHomePage = (request, response) => {
  let html = ejs.render("../app/view/index.ejs");
  response.render(html);
};

exports.convertImagesToWebP = (request, response) => {
  readFiles(request.body.directory);
  response.json({
    directory: request.body.directory,
  });
};
