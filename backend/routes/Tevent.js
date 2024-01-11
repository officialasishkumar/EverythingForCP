const express = require("express");
const router = express.Router();
const Tevent = require("../models/Tevent");
const { body, validationResult } = require("express-validator");
const eventpropose = require("../handlemail/eventpropose");

router.post(
  "/",

  body("username", "Enter a valid username").isLength({ min: 3 }),
  body("email", "Enter a valid email").isEmail(),
  body("cfhandle", "Enter a valid cf").isLength({ min: 1 }),
  body("description", "Enter a description").isLength({ min: 5 }),

  async (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    let check = false;

    if (!errors.isEmpty()) {
      return res.status(400).json({ check, errors: errors.array() });
    }

    try {
      let tevent = await Tevent.create({
        username: req.body.username,
        topic: req.body.topic,
        email: req.body.email,
        date: req.body.date,
        time: req.body.time,
        description: req.body.description,
        cfhandle: req.body.cfhandle,
        review: req.body.review,
        eventlink: req.body.eventlink,
      });

      check = true;

      eventpropose(req.body.email, req.body.username);

      res.status(200).send({ check, tevent });
    } catch (err) {
      console.log(err);
      res.status(500).json({ check, error: "Some error occured" });
    }
  }
);

router.get(
  "/",

  async (req, res) => {
    try {
      let sessionsarray = await Tevent.find();
      sessionsarray = sessionsarray.filter((item) => {
        return item.review == "Yes";
      });
      res.status(200).send(sessionsarray);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err });
    }
  }
);

module.exports = router;

//
