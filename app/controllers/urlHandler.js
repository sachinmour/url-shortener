'use strict';

var Url = require(process.cwd() + "/app/models/urls.js");
var validUrl = require('valid-url');

module.exports = function() {
    
    var object = { original_url: "invalid", short_url: null };
    
    this.new = function(base, res, url) {
        if (validUrl.isUri(url)){
            object.original_url = url;
            Url.findOne({url: url}, function(err, data) {
                if (err) throw err;
                if (data) {
                    object.short_url = base + '/' + data.id;
                    res.json(object);
                }
                else {
                    var doc = new Url();
                    doc.url = url;
                    doc.save(function(err) {
                        if (err) throw err;
                        object.short_url = base + '/' + doc.id;
                        res.json(object);
                    });
                }
            });
        }
        else {
            res.json({error:"Invalid url submitted"});
        }
    };
    
    this.search = function(res, id) {
        Url.findById(Number(id), function(err, doc) {
            if(err) throw err;
            if (doc) {
                res.redirect(doc.url);
            }
            else {
                res.json({error:"No short url found for given input"});
            }
        });
    };
};