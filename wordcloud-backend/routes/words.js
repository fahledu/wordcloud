const express = require("express");
const router = express.Router();
const wordsController = require("../controllers/wordsController")

router.post("/:groupName", wordsController.addNewWord)
router.get("/:groupName", wordsController.getWords);

module.exports = router;