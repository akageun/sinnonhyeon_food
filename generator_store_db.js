const readline = require('readline');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const im = require('imagemagick');

const targetJsonFullPath = "./src/data/temp.json";
const saveImgPath = "./static/img2";

const qTypeCd = {
  STR: "STRING",
  ARR: "ARRAY",
  INT: "INT"
};

const Questions = [
  {
    promptMsg: "가게명",
    qType: qTypeCd.STR,
    fieldName: 'store_nm',
    desc: '가게명을 입력해주세요.',
  },
  {
    promptMsg: "가게 설명",
    qType: qTypeCd.STR,
    fieldName: 'store_desc',
    desc: '가게 설명을 입력해주세요.',
  },
  {
    promptMsg: "썸네일",
    qType: qTypeCd.STR,
    fieldName: 'thum_img',
    desc: '원본이미지를 Path를 입력해주시면, 알아서 리사이징하여 사용합니다.',
  },
  {
    promptMsg: "별점",
    qType: qTypeCd.INT,
    fieldName: 'rate',
    desc: '숫자로 별점을 입력해주세요.(1-5)',
  },
  {
    promptMsg: "이미지",
    qType: qTypeCd.ARR,
    fieldName: 'detail_img',
    desc: '관련 이미지들을 추가해주세요.',
  },
  {
    promptMsg: "링크",
    qType: qTypeCd.ARR,
    fieldName: 'ref_link',
    desc: '블로그 등의 링크를 입력해주세요.',
  },
  {
    promptMsg: "레이블",
    qType: qTypeCd.ARR,
    fieldName: 'label',
    desc: '레이블을 입력해주세요.',
  },
];

let askQuestions = () => {
  return new Promise((res, rej) => {
    let chainQ = Promise.resolve([]); // resolve to active 'then' chaining (empty array for answers)

    Questions.forEach(qInfo => {
      if (qInfo.qType === qTypeCd.INT) {
        chainQ = chainQ.then(answers => new Promise((resQ, rejQ) => {
            console.log(qInfo.desc);
            const rl = readline.createInterface({
              input: process.stdin,
              output: process.stdout
            });

            rl.question(`${qInfo.promptMsg}: `, answer => {

              if (isNumeric(answer) === false) {
                console.warn("해당 질문에는 숫자만 입력 가능합니다.");
                process.exit(0);
              }

              if (isNumBetween(answer, 1, 5) === false) {
                console.warn("1~5 사이 숫자만 입력해주세요.");
                process.exit(0);
              }

              answers.push(answer);
              rl.close();
              resQ(answers);
            });
          })
        );
      } else if (qInfo.qType === qTypeCd.STR) {
        chainQ = chainQ.then(answers => new Promise((resQ, rejQ) => {
            console.log(qInfo.desc);

            const rl = readline.createInterface({
              input: process.stdin,
              output: process.stdout
            });

            rl.question(`${qInfo.promptMsg}: `, answer => {
              answers.push(answer);
              rl.close();
              resQ(answers);
            });
          })
        );
      } else if (qInfo.qType === qTypeCd.ARR) {
        chainQ = chainQ.then(answers => new Promise((resQ, rejQ) => {
            console.log(qInfo.desc);
            console.log('(여러개 등록가능, Ctrl + D or Ctrl + C 를 누르면 다음 질문으로 넘어갑니다.)');
            const rl = readline.createInterface({
              input: process.stdin,
              output: process.stdout
            });

            rl.setPrompt(`${qInfo.promptMsg}: `, qInfo.promptMsg.length);
            rl.prompt();

            let tmpArrayAnswers = [];

            rl.on('line', function (line) {
              tmpArrayAnswers.push(line);

              rl.setPrompt(`${qInfo.promptMsg}: `, qInfo.promptMsg.length);
              rl.prompt();
            }).on('close', function () {
              answers.push(tmpArrayAnswers);
              resQ(answers);

            });
          })
        );
      } else {
        console.error("잘못된 질문 입니다.");
        process.exit(0);
      }
    });

    chainQ.then((answers) => {
      res(answers);
    })
  });
};

let handleError = (err) => {
  console.log(`ERROR: ${err}`);
};

let resultConfirm = (answers) => {
  return new Promise((res, rej) => {
    console.log("========================================")
    Questions.forEach((qInfo, index) => {
      if (qInfo.qType === qTypeCd.ARR) {
        console.log(qInfo.promptMsg);
        answers[index].forEach((answerInfo, subIndex) => {
          const tmpIndex = (subIndex + 1);
          console.log(" - ", tmpIndex, " : ", answerInfo);
        });
      } else {
        console.log(qInfo.promptMsg, " : ", answers[index]);
      }


    });
    console.log("========================================")

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question('해당 데이터가 맞습니까? (Y/n)  ', answer => {
      if (answer === 'Y') {
        res(answers);
      } else {
        console.log("다음에 다시 이용해주세요.");
        process.exit(0);
      }
    });
  });
};

function getRandomId() {
  const len = 16;
  return crypto.randomBytes(Math.ceil(Math.max(8, len * 2)))
    .toString('base64')
    .replace(/[+\/]/g, '')
    .slice(0, len);
}

function isNumeric(num) {
  return !isNaN(parseFloat(num)) && isFinite(num);
}

function isNumBetween(targetNum, minNum, maxNum) {
  const min = Math.min.apply(Math, [minNum, maxNum]);
  const max = Math.max.apply(Math, [minNum, maxNum]);

  return targetNum >= min && targetNum <= max;
}

let generatorResultJson = (answers) => {
  return new Promise((res, rej) => {

    let resultJson = {};
    Questions.forEach((qInfo, index) => {
      resultJson[qInfo.fieldName] = answers[index];
    });

    resultJson['_id'] = getRandomId();

    res(resultJson);
  });
};
let saveJsonFile = (resultJson) => {
  return new Promise((res, rej) => {

    let contents = fs.readFileSync(targetJsonFullPath);
    let json = JSON.parse(contents);
    json.push(resultJson);
    const resultJ = JSON.stringify(json);
    fs.writeFile(targetJsonFullPath, resultJ, 'utf8', function () {
      res(resultJson);
    });

  });
};

let generatorComplete = () => {
  console.log("신논현 맛집 추가가 완료되었습니다. 감사합니다.");
  process.exit(0);
};

let imageConverting = (answers) => {
  return new Promise((res, rej) => {
    let thumImg = answers.thum_img;
    const filename = thumImg.replace(/^.*[\\\/]/, '');
    const savePath = path.join(saveImgPath, "thum_" + filename);

    im.convert([thumImg, "-thumbnail", "550x550", savePath],
      function (err, stdout) {
        if (err) {
          rej(err);
        }
        answers.thum_img = savePath;
        res(answers);
      });
  });
};
let moveImage = (answers) => {
  return new Promise((res, rej) => {
    let detailImgs = answers.detail_img;
    for (let img of detailImgs) {
      const filename = img.replace(/^.*[\\\/]/, '');
      const savePath = path.join(saveImgPath, filename);

      fs.copyFileSync(img, savePath);
    }

    res(answers);
  });
};


askQuestions()
  .then(resultConfirm)
  .then(generatorResultJson)
  .then(imageConverting)
  .then(moveImage)
  .then(saveJsonFile)
  .then(generatorComplete)
  .catch(handleError);
