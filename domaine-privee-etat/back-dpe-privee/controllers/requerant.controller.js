"use strict";
const Requerant = require("../models/requerant.model");

module.exports.addRequerant = (req, res) => {
  const { p_cin, etatMorale, numeroTelephone, complementInformation } =
    req.body;

  const newRequerant = {
    p_cin,
    etatMorale,
    numeroTelephone,
    complementInformation,
  };

  Requerant.addRequerant(newRequerant, (erreur, resp) => {
    if (erreur) {
      res.send(erreur);
    } else {
      res.send(resp);
    }
  });
};

module.exports.getAllRequerants = (req, res) => {
  Requerant.getAllRequerants((err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.getIdRequerant = (req, res) => {
  Requerant.getIdRequerant(req.params.id, (err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.searchRequerant = (req, res) => {
  Requerant.searchRequerant(req.params.valeur, (err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.updateRequerant = (req, res) => {
  const { p_cin, etatMorale, complementInformation, numeroTelephone } =
    req.body;
  const updateRequerant = {
    p_cin,
    etatMorale,
    complementInformation,
    numeroTelephone,
  };

  Requerant.updateRequerant(updateRequerant, req.params.id, (err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};
