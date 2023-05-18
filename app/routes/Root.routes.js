var express = require("express");
const router = express.Router();
const rootController = require("../controllers/root.controller");

router.get("/", rootController.renderHomePage);
router.post("/convert", rootController.convertImagesToWebP);
module.exports = router;
