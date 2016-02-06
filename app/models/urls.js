'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection(process.env.MONGOLAB_URI);

autoIncrement.initialize(connection);

var urlSchema = new Schema({
	url: { type: String, unique: true }
});

urlSchema.plugin(autoIncrement.plugin, 'Url');

module.exports = connection.model('Url', urlSchema);