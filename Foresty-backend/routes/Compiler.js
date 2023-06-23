const express = require("express");
const router = express.Router();

var Axios = require("axios");

router.post("/", (req, res) => {
  //getting the required data from the request
  let code = req.body.code;
  let language = req.body.language;
  let input = req.body.input;

  if (language === "python") {
    language = "py";
  }

  let data = {
    code: code,
    language: language,
    input: input,
  };
  let config = {
    method: "post",
    url: "https://api.codex.jaagrav.in",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  //calling the code compilation API
  Axios(config)
    .then((response) => {
      res.send(response.data);
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
