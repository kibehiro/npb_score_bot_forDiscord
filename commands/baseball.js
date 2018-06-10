const scrayping = require('cheerio-httpcli');

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
            baseball.send(result);
        }
    }
};


function getresult(hiduke) { //https://qiita.com/soarflat/items/1a9613e023200bbebcb3#async-functionの利用例

    let i;
    let result = ' ';
    let teamname = [];
    let score = [];

    return new Promise((resolve) => {
        scrayping.fetch('https://baseball.yahoo.co.jp/npb/schedule/?&date='
            + hiduke, function (err, $) {

            result = '';

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
            });
            resolve(result);
        });
    });
}