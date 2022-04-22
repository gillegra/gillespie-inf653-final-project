const express = require("express");
const router = express.Router();
const statesController = require("../../controllers/statesController");

//TODO: does this need something special here for handling the querystring?
router.route("/").get(statesController.getAllStates);

router.route("/:state").get(statesController.getState);

router.route("/:state/capital").get(statesController.getCapital);
router.route("/:state/nickname").get(statesController.getNickname);
router.route("/:state/population").get(statesController.getPopulation);
router.route("/:state/admission").get(statesController.getAdmission);

router
  .route("/:state/funfact")
  .get(funfactsController.read)
  .post(funfactsController.create)
  .patch(funfactsController.update)
  .delete(funfactsController.delete);

module.exports = router;
