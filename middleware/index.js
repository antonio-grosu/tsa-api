const express = require("express");
const Users = require("../models/Users");

//bug
const verifyAuth = async (req, res, next) => {
  try {
    const { email, id } = req.body;
    if (!email || !id) {
      return res.status(401).send("Invalid Credentials");
    }

    // Use the findOne method to find a user by primary key (id)
    const foundUser = await Users.findByPk({ where: { id: id, email: email } });

    if (!foundUser) return res.status(404).send("No user found");

    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json("Server error");
  }
};

module.exports = verifyAuth;
