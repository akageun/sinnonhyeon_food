const im = require('imagemagick');
const fs = require('fs');
const p = require('path');

const targetPath = "C:\\Users\\user\\Pictures\\food";
const targetFileNm = "IMG_4980.JPG";

const targetFull = p.join(targetPath, targetFileNm);
const saveImg = p.join(targetPath, "thum_" + targetFileNm);

function imageResize(item, item2) {
  return new Promise(function (resolve, reject) {
    im.convert([item, "-thumbnail", "150x150", item2],
      function (err, stdout) {
        if (err) {
          reject(err);
        }
        resolve(item2);
      });
  });
}

imageResize(targetFull, saveImg);
