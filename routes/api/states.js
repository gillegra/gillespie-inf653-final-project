const express = require("express");
const router = express.Router();
const statesController = require("../../controllers/statesController");

router.route("/").get(statesController.readAllStates);

//single reads
router.route("/:state").get(statesController.readState);
// router.route("/:state/capital").get(statesController.readCapital);
// router.route("/:state/nickname").get(statesController.readNickname);
// router.route("/:state/population").get(statesController.readPopulation);
// router.route("/:state/admission").get(statesController.readAdmission);

//funfact CRUD
// router
//   .route("/:state/funfact")
//   .get(funfactsController.readFunfact)
//   .post(funfactsController.createFunfact)
//   .patch(funfactsController.updateFunfact)
//   .delete(funfactsController.deleteFunfact);

module.exports = router;
