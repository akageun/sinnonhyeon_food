const readline = require('readline');
const crypto = require('crypto');

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
    promptMsg: "별점",
    qType: qTypeCd.INT,
    fieldName: 'rate',
    desc: '숫자로 별점을 입력해주세요.(1-5)',
  },
  {
    promptMsg: "링크",
    qType: qTypeCd.ARR,
    fieldName: 'ref_link',
    desc: '링크를 입력해주세요.',
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
        console.log("잘못된 질문 입니다.");
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

    rl.question('해당 데이터가 맞습니까? (Y/n)', answer => {
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

var fs = require('fs')


let generatorResultJson = (answers) => {
  return new Promise((res, rej) => {

    let resultJson = {};
    Questions.forEach((qInfo, index) => {
      resultJson[qInfo.fieldName] = answers[index];
    });

    resultJson['_id'] = getRandomId();

    console.log("");
    console.log("resultJson : ", resultJson);

    let contents = fs.readFileSync("./src/data/temp.json");
    console.log("TEST -1");
    let json = JSON.parse(contents);
    json.push(resultJson);
    console.log("TEST 0");
    const resultJ = JSON.stringify(json);
    fs.writeFile("./src/data/temp.json", resultJ, 'utf8', function () {
      console.log("TEST 1");
      res(resultJson);
    });

  });
};

let genratorComplete = () => {
  console.log("성공")
  process.exit(0);
}


askQuestions()
  .then(resultConfirm)
  .then(generatorResultJson)
  .then(genratorComplete)
  .catch(handleError);
