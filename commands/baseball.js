const scrayping = require('cheerio-httpcli');
const date = require('date-utils');

const date2 = new Date();
const hiduke = date2.toFormat('YYYYMMDD');

let i;
let result = '';
let teamname = [];
let score = [];

module.exports = {
    name: 'baseball',
    description: 'baseball flash report',
    async execute(message, args, baseball) {
        if (message.channel === baseball) {
            if (!args.length) {
                return baseball.send('日付を入力してね');
            } else {
                scrayping.fetch('url'
                    + args[0], function (err, $, res, body) {

                    $('#gm_sch').each(function () {

                        const target = $(this);

                        for (i = 0; i <= 12; i++) {
                            teamname[i] = target.find('span').eq(i).text();//球団名
                            score[i] = target.find('.score_r').eq(i).text();//スコア
                        }

                        let j;
                        for (j = 0; j <= 11; j = j + 2) {//取得結果の結合
                            result = result + teamname[j] + ':' + score[j] +
                                ' VS ' + score[j + 1] + ':' + teamname[j + 1] + '\n';
                        }
                        baseball.send(result);
                    });
                });
            }

        }
    }
};
