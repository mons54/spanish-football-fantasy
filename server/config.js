module.exports = function (app, express, mongoose) {

    mongoose.connect('mongodb://mons54:jsOL160884@ds047075.mongolab.com:47075/spanish-football-fantasy');

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
};
