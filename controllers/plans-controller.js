const router = require("express").Router();
/**
 * allows the request handler to be async and free
 * from error handling code. (no need to include try|catch blocks).
 * An added bonus to this is that we don;t have to care about the response
 * sent to the end user, unless the response of course is a the regular 200
 * for a bad request response we will be throwing an error that when caught
 * by the error handler it will return the appropriate error response and code
 * the controller does not need to know about all that.
 */
const asyncWrapper = require("../utilities/async-wrapper").AsyncWrapper;
const validator = require("../middleware/validator");
const PlanService = require("../services/plans-service");
const planService = new PlanService();

//GET api/plans 
router.get("/", asyncWrapper(async (req, res) => {
    let userId = null;
    let plans = await planService.findAll();
    res.send(plans);
}));

//GET api/plans/id
router.get("/:id", asyncWrapper(async (req, res) => {
    let id = req.params.id;
    let userId = null;
    let plan = await planService.findOne(id);
    res.send(plan);
}));

//POST POST /api/plans
router.post("/", [validator("plan")], asyncWrapper(async (req, res) => {
    const plan = await planService.create(req.body);
    res.send(plan);
}));

//DELETE api/plans/id
router.delete("/:id", asyncWrapper(async (req, res) => {
    let id = req.params.id;
    await planService.deleteOne(id);
    res.status(200).send("okay");
}));

module.exports = router;