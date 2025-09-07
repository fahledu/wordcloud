const express = require("express");
const authenticate = require("../middleware/auth");
const router = express.Router();
const groupController = require("../controllers/groupController")

router.get("/", authenticate, groupController.listGroups);
router.post("/", authenticate, groupController.newGroup);
router.put("/:id", authenticate, groupController.editGroup);
router.delete("/:id", authenticate, groupController.deleteGroup);

module.exports = router;
