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

            var contacts = _browser.query('#contacts');
            assert(contacts, 'contacts exist');

            var table_contacts = _browser.query('#contacts table');
            assert(table_contacts, 'table contacts exist');

            var buttons_delete = _browser.query('#contacts table a');
            assert(buttons_delete, 'buttons delete exist');

            var it =  _browser.tabs.current.Contact.Contacts.instance().iterator();

            var firstContact = it.next();

            assert.equal(firstContact.firstName(), 'Eric');
            assert.equal(firstContact.lastName(), 'RAMAT');

            var idFirstContact = firstContact.id();

            var buttons_delete_firstContact = _browser.query('#contacts a#button_'+idFirstContact);
            assert(buttons_delete_firstContact, 'buttons delete first contact exist');

            callback();
        });
    });

    this.When(/^This user click on the remove button of the first contact$/, function (callback) {
        _browser.visit('http://127.0.0.1:3000/', function (err) {
            if (err)
                throw err;

            var it =  _browser.tabs.current.Contact.Contacts.instance().iterator();

            var idFirstContact;
            var contact = it.next();

            idFirstContact = contact.id();

            _browser.clickLink('#contacts a#button_'+idFirstContact);

            callback();
        });
    });

    this.Then(/^This contact does not appear in the list$/, function (callback) {
        _browser.visit('http://127.0.0.1:3000/', function (err) {
            if (err)
                throw err;

            var it =  _browser.tabs.current.Contact.Contacts.instance().iterator();
            var firstContact = it.next();

            assert.not.equal(firstContact.firstName(), 'Eric');
            assert.not.equal(firstContact.lastName(), 'RAMAT');

            callback();
        });
    });
};