var contact = require('../models/contact');

exports.create = function(req, res) {
  
  var contacts = contact(token(req));
  var record = contacts.read(req.body.contact.id);
  if (!record) {
    res.json({
      contact: contacts.create(req.body.contact)
    }, 201);
  } else {
    res.send(409);
  }
};

exports.list = function(req, res){
  var contacts = contact(token(req));
  res.json({
    contacts: contacts.list()
  });
};

exports.read = function(req, res) {
  var contacts = contact(token(req));
  var record = contacts.read(req.params.contactId);
  if (!record) {
    res.send(404);
  } else {
    res.json({ contact: record });
  }
};

exports.update = function(req, res) {
  var contacts = contact(token(req));
  var record = contacts.update(req.params.contactId, req.body.contact);
  res.json({
    contact: record
  });
};

exports.destroy = function(req, res) {
  var contacts = contact(token(req));
  var record = contacts.read(req.params.contactId);
  if (record) {
    contacts.destroy(req.params.contactId);
    res.send();
  } else {
    res.send(404);
  }
  if (req.params.contactId === 'jack') {
    res.send(500, 'You cannot destroy Jack Bauer');
  } else {
    contacts.destroy(req.params.contactId);
    res.send();
  }
};

function token(req) {
  return req.header('authorization') || 'public';
}

