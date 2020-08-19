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
const SubscriptionService = require("../services/subscriptions-service");
const subscriptionService = new SubscriptionService();

//GET api/subscriptions
router.get("/", asyncWrapper(async (req, res) => {
    let userId = null;
    let subscriptions = await subscriptionService.findAll();
    res.send(subscriptions);
}));

//GET api/subscriptions/id
router.get("/:id", asyncWrapper(async (req, res) => {
    let id = req.params.id;
    let userId = null;
    let subscription = await subscriptionService.findOne(id);
}));

//POST POST /api/subscriptions
router.post("/", asyncWrapper(async (req, res) => {
    const subscription = await subscriptionService.create(req.body);
    res.send(subscription);
}));

//DELETE api/subscriptions/id
router.delete("/:id", asyncWrapper(async (req, res) => {
    let id = req.params.id;
    await subscriptionService.deleteOne(id);
    res.status(200).send("okay");
}));

module.exports = router;
