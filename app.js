global.dirname = __dirname;

const mongoose = require('mongoose');
const q = require('q');
const https = require('https');

mongoose.connect('mongodb://mons54:jsOL160884@ds047075.mongolab.com:47075/spanish-football-fantasy');

require(dirname + '/server/modules/mongoose')(mongoose, q);

function initTeams() {
    var options = {
        hostname: 'api.crowdscores.com',
        path: '/api/v1/teams?competition_ids=46',
        method: 'GET',
        headers: {
            'x-crowdscores-api-key': 'fcf2776e688647848681d216ebbf89ca'
        }
    };
    var req = https.request(options, function (res) {
        res.setEncoding('utf8');
        var body = '';
        res.on('data', function(data) {
            body += data;
        });
        res.on('end', function() {
            var data = JSON.parse(body);
            for (var i in data) {
                saveTeam(data[i].dbid);
            }
        });
    });

    req.end();

    req.on('error', function (e) {
        console.error(e);
    });
}

function saveTeam(teamId) {
    var options = {
        hostname: 'api.crowdscores.com',
        path: '/api/v1/teams/' + teamId,
        method: 'GET',
        headers: {
            'x-crowdscores-api-key': 'fcf2776e688647848681d216ebbf89ca'
        }
    };

    var req = https.request(options, function (res) {
        res.setEncoding('utf8');
        var body = '';
        res.on('data', function(data) {
            body += data;
        });
        res.on('end', function() {
            var data = JSON.parse(body);

            // Save player before convert
            savePlayers(data.players, data.dbid);

            // Convert players to array
            data.players = getPlayersTeam(data.players);
            
            // if exist update players
            mongoose.promise.save('teams', data);
        });
    });

    req.end();

    req.on('error', function (e) {
        console.error(e);
    });
}

function savePlayers(players, team) {
    for (var i in players) {
        players[i].team = team;
        mongoose.promise.save('players', players[i]);
    }
}

function getPlayersTeam(players) {
    var result = [];
    for (var i in players) {
        result.push(players[i].dbid);
    }
    return result; 
}

function initMatches() {
    var options = {
        hostname: 'api.crowdscores.com',
        path: '/api/v1/matches?competition_id=46',
        method: 'GET',
        headers: {
            'x-crowdscores-api-key': 'fcf2776e688647848681d216ebbf89ca'
        }
    };
    var req = https.request(options, function (res) {
        res.setEncoding('utf8');
        var body = '';
        res.on('data', function(data) {
            body += data;
        });
        res.on('end', function() {
            var data = JSON.parse(body);
            for (var i in data) {
                saveMatches(data[i]);
            }
        });
    });

    req.end();

    req.on('error', function (e) {
        console.error(e);
    });
}

function saveMatches(data) {
    mongoose.promise.save('matches', data)
    .then(function (response) {
        if (data.isResult) {
            saveMatch(data.dbid); 
        }
    });
}

function saveMatch(matchId) {
    var options = {
        hostname: 'api.crowdscores.com',
        path: '/api/v1/matches/' + matchId,
        method: 'GET',
        headers: {
            'x-crowdscores-api-key': 'fcf2776e688647848681d216ebbf89ca'
        }
    };

    var req = https.request(options, function (res) {
        res.setEncoding('utf8');
        var body = '';
        res.on('data', function(data) {
            body += data;
        });
        res.on('end', function() {
            var data = JSON.parse(body);

            // if exist update match
            mongoose.promise.update('matches', { dbid: data.dbid }, data).then(function (response) {});
        });
    });

    req.end();

    req.on('error', function (e) {
        console.error('err: ' + e);
    });
}

initTeams();
initMatches();


