const router = require("express").Router();
const { add, edit, update, destroy } = require("../controllers/note");

router.post("/add", add);
router.get("/edit/:id", edit);
router.post("/update/:id", update);
router.get("/delete/:id", destroy);

module.exports = router;
