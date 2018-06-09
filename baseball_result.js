/*
const scrayping = require('cheerio-httpcli');
const date = require('date-utils');

const date2 = new Date();
const year = date2.toFormat('YYYY');
const hiduke = date2.toFormat('YYYYMMDD');

let i;
let result = '';
let teamname = [];
let score = [];

scrayping.fetch('http://npb.jp/bis/' + year + '/games/gm' + hiduke + '.html',
    function (err, $, res, body) {

        $('.gmdivsublist').each(function () {

            const target = $(this);

            for (i = 0; i <= 12; i++) {
                teamname[i] = target.find('.contentsTeam').eq(i).text();//球団名
                score[i] = target.find('.contentsRuns').eq(i).text();//スコア
            }

            let j;
            for (j = 0; j <= 11; j = j + 2) {//取得結果の結合
                result = result + teamname[j] + ':' + score[j] +
                    ' VS ' + score[j + 1] + ':' + teamname[j + 1] + '\n';
            }

            console.log(result);
            console.log('取得完了');
        });

        $('.contentsRuns').each(function () {
            const target = $(this);
            console.log(target.html());
        });
    });
*/