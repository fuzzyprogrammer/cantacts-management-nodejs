const expess = require("express");
const {
  getContacts,
  getContact,
  crateContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");
const tokenValidation = require('../middlewares/tokenValidationHandler');

const router = expess.Router();
router.use(tokenValidation);
router.route("/").get(getContacts).post(crateContact);

router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;
