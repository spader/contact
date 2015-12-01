var assert = require('assert');
var Browser = require('zombie');

module.exports = function () {
    'use strict';

    var _browser = new Browser();

    this.Given(/^The first contact is no longer part of the contacts$/, function (callback) {
        _browser.visit('http://127.0.0.1:3000/', function (err) {
            if (err)
                throw err;

            assert.ok(_browser.success, 'page loaded : ok');
            assert.equal(_browser.text('h1'), 'Contacts');

            callback();
        });
    });

    this.When(/^This user click on the remove button of the first contact$/, function (callback) {
        _browser.visit('http://127.0.0.1:3000/', function (err) {
            if (err)
                throw err;

            callback();
        });
    });

    this.Then(/^This contact does not appear in the list$/, function (callback) {
        callback();
    });
};