'use strict';

var urlHandler = require(process.cwd() + '/app/controllers/urlHandler.js');
var give = new urlHandler();

module.exports = function (app) {

    app.route('/new/:url(*)')
        .get(function(req, res) {
            var base = req.headers['x-forwarded-proto'] + '://' + req.headers.host.split(':')[0];
            give.new(base, res, req.params.url);
        });
        
    app.route('/')
        .get(function(req, res) {
            res.sendFile(process.cwd() + '/public/index.html');
        });
        
    app.route('/:id(\\d+)')
        .get(function (req, res) {
            give.search(res, req.params.id);
        });
};