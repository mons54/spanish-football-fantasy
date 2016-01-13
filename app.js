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

server.listen(3000);
