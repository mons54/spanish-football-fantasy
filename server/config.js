module.exports = function (app, express, mongoose) {

    mongoose.connect('mongodb://mons54:jsOL160884@ds045465.mongolab.com:45465/the-best-coach');

    var staticPath = dirname + '/public/',
        bodyParser = require('body-parser');

    app.use(express.static(staticPath));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.set('views', staticPath);
    app.engine('html', require('ejs').renderFile);

    app.facebook = {
        appId: '1676925215917166',
        secret: 'df411c7ce6b2f476e3fbe56d560b96b6',
        redirectUri: 'https://apps.facebook.com/the-best-coach/'
    };

    var competitions = [
        {
            id: 36,
            name: "Champions League"
        },
        {
            id: 2,
            name: "English Premier League"
        },
        {
            id: 46,
            name: "Spanish La Liga"
        },
        {
            id: 49,
            name: "Italian Serie A"
        },
        {
            id: 37,
            name: "Europa League"
        }
    ];

    // Test call teams of Champions League

    const https = require('https');

    var options = {
        hostname: 'api.crowdscores.com',
        path: '/api/v1/teams?competition_ids=36',
        method: 'GET',
        headers: {
            'x-crowdscores-api-key': 'fcf2776e688647848681d216ebbf89ca'
        }
    };

    var req = https.request(options, function (res) {
        console.log('statusCode: ', res.statusCode);
        console.log('headers: ', res.headers);
        res.on('data', function (d) {
            process.stdout.write(d);
        });
    });

    req.end();

    req.on('error', function (e) {
        console.error(e);
    });
};
