var express     = require('express'),
    app         = express(),
    server      = require('http').createServer(app),
    io          = require('socket.io')(server),
    mongoose    = require('mongoose'),
    fbgraph     = require('fbgraph'),
    q           = require('q'),
    crypto      = require('crypto');

global.dirname = __dirname;

require(dirname + '/server/config')(app, express, mongoose);

require(dirname + '/server/modules/mongoose')(mongoose, q);

var competitions = [
    {
        dbid: 36,
        name: "Champions League"
    },
    {
        dbid: 2,
        name: "English Premier League"
    },
    {
        dbid: 46,
        name: "Spanish La Liga"
    },
    {
        dbid: 49,
        name: "Italian Serie A"
    },
    {
        dbid: 37,
        name: "Europa League"
    }
];

for (var i in competitions) {
    mongoose.promise.save('competitions', competitions[i]);
};

// Test call teams of Champions League

mongoose.promise.find('competitions').then(function (competitions) {
    var competitionId = [];
    for (var i in competitions) {
        competitionId.push(competitions[i].dbid);
    };
    getTeams(competitionId) 
});

const https = require('https');

function getTeams(competitionId) {
    var options = {
        hostname: 'api.crowdscores.com',
        path: '/api/v1/teams?competition_ids=' + competitionId.join(','),
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
            
            // if exist update players list...
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

server.listen(3000);
