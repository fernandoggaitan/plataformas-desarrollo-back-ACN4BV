const express = require('express');
const router = express.Router();

const eventoController = require("../controllers/eventoController");

router.get("/eventos", eventoController.index);
router.post("/eventos", eventoController.store);
router.get("/eventos/:ID", eventoController.show);
router.put("/eventos/:ID", eventoController.update);

module.exports = router;