const express = require("express");
const router = express.Router();
const newsletterController = require("../controllers/newsletterController");

// Subscribe to newsletter
router.post("/subscribe", newsletterController.subscribe);

// Unsubscribe from newsletter
router.post("/unsubscribe", newsletterController.unsubscribe);

// Get all subscribers (admin only)
router.post("/getSubscribers", newsletterController.getSubscribers);

module.exports = router;
