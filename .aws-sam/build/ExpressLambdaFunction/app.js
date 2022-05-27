"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const tslib_1 = require("tslib");
const cors_1 = tslib_1.__importDefault(require("cors"));
const express_1 = tslib_1.__importDefault(require("express"));
const path_1 = tslib_1.__importDefault(require("path"));
const compression_1 = tslib_1.__importDefault(require("compression"));
const serverless_express_1 = require("@vendia/serverless-express");
const ejs = require("ejs").__express;
const app = (0, express_1.default)();
exports.app = app;
const router = express_1.default.Router();
app.set("view engine", "ejs");
app.engine(".ejs", ejs);
router.use((0, compression_1.default)());
router.use((0, cors_1.default)());
router.use(express_1.default.json());
router.use(express_1.default.urlencoded({ extended: true }));
app.set("views", path_1.default.join(__dirname, "views"));
router.get("/", (req, res) => {
    const currentInvoke = (0, serverless_express_1.getCurrentInvoke)();
    const { event = {} } = currentInvoke;
    const { requestContext = {} } = event;
    const { domainName = "localhost:3000" } = requestContext;
    const apiUrl = `https://${domainName}`;
    return res.render("index", {
        apiUrl,
    });
});
router.get("/vendia", (req, res) => {
    return res.sendFile(path_1.default.join(__dirname, "vendia-logo.png"));
});
router.get("/users", (req, res) => {
    return res.json(users);
});
router.get("/users/:userId", (req, res) => {
    const user = getUser(req.params.userId);
    if (!user)
        return res.status(404).json({});
    return res.json(user);
});
router.post("/users", (req, res) => {
    const user = {
        id: ++userIdCounter,
        name: req.body.name,
    };
    users.push(user);
    return res.status(201).json(user);
});
router.put("/users/:userId", (req, res) => {
    const user = getUser(req.params.userId);
    if (!user)
        return res.status(404).json({});
    user.name = req.body.name;
    return res.json(user);
});
router.delete("/users/:userId", (req, res) => {
    const userIndex = getUserIndex(req.params.userId);
    if (userIndex === -1)
        return res.status(404).json({});
    users.splice(userIndex, 1);
    return res.json(users);
});
router.get("/cookie", (req, res) => {
    res.cookie("Foo", "bar");
    res.cookie("Fizz", "buzz");
    return res.json({});
});
const getUser = (userId) => users.find((u) => u.id === parseInt(userId));
const getUserIndex = (userId) => users.findIndex((u) => u.id === parseInt(userId));
const users = [
    {
        id: 1,
        name: "Joe",
    },
    {
        id: 2,
        name: "Jane",
    },
];
let userIdCounter = users.length;
app.use("/", router);
//# sourceMappingURL=app.js.map