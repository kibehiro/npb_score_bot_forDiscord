const scraping = require('cheerio-httpcli');

module.exports = {
    name: 'baseball',
    description: 'baseball flash report',
    async execute(message, args, baseball) {
        let result;
        if (message.channel === baseball) {
            if (!args.length) {
                return baseball.send('日付を入力してね');
            } else {
                result = await getresult(args[0]);
            }
            if (!result) {
                baseball.send('試合データがありません');
            } else {
                baseball.send(result);
            }
        }
    }
};


function getresult(hiduke) { //https://qiita.com/soarflat/items/1a9613e023200bbebcb3#async-functionの利用例

    const yaer = hiduke.slice(0, 4);

    return new Promise((resolve) => {
        scraping.fetch(`URL`,
            function (err, $) {

                let result = '';
                let teamname = [];
                let score = [];

                $('.gmdivsublist').each(function () {

                    const target = $(this);

                    for (let i = 0; i <= 11; i++) {
                        teamname[i] = target.find('.contentsTeam').eq(i).text();//球団名
                        score[i] = target.find('.contentsRuns').eq(i).text();//スコア
                    }

                    replace(teamname);

                    for (let j = 0; j <= 11; j = j + 2) {//取得結果の結合
                        result = `${result}${teamname[j]}:**${score[j]}** VS **${score[j + 1]}**:${teamname[j + 1]}\n`;
                    }
                });
                resolve(result);
            });
    });
}

function replace(teamname) {
    for (let i = 0; i <= teamname.length; i++) {
        switch (teamname[i]) {
            case '広島東洋':
                teamname[i] = '広島';
                break;
            case '東京ヤクルト':
                teamname[i] = 'ヤク';
                break;
            case '読　売':
                teamname[i] = '巨人';
                break;
            case '阪　神':
                teamname[i] = '阪神';
                break;
            case '横浜DeNA':
                teamname[i] = '横浜';
                break;
            case '中　日':
                teamname[i] = '中日';
                break;
            case '北海道日本ハム':
                teamname[i] = '日公';
                break;
            case '千葉ロッテ':
                teamname[i] = '千葉';
                break;
            case '東北楽天':
                teamname[i] = '楽天';
                break;
            case '埼玉西武':
                teamname[i] = '西武';
                break;
            case '福岡ソフトバンク':
                teamname[i] = '福岡';
                break;
            case 'オリックス':
                teamname[i] = 'オリ';
                break;
        }
    }
}