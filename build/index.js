"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var helmet_1 = __importDefault(require("helmet"));
var express_rate_limit_1 = __importDefault(require("express-rate-limit"));
var error_middleware_1 = __importDefault(require("./middleware/error.middleware"));
var config_1 = __importDefault(require("./config"));
var database_1 = __importDefault(require("./database"));
var routes_1 = __importDefault(require("./routes"));
console.log(config_1.default);
// import * as dotenv from 'dotenv'
// dotenv.config()
var PORT = config_1.default.port || 3000;
// create an instance server
var app = (0, express_1.default)();
//middleware to parse incoming requests
app.use(express_1.default.json());
// HTTP request logger middleware
app.use((0, morgan_1.default)('short'));
// securing middleware
app.use((0, helmet_1.default)());
//apply rate limit
app.use((0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many requests, please try again in 15 mins '
}));
// test db
database_1.default.connect().then(function (client) {
    return client
        .query('SELECT NOW()')
        .then(function (res) {
        client.release();
        console.log(res.rows);
    })
        .catch(function (err) {
        client.release();
        console.log(err.stack);
    });
});
app.use(error_middleware_1.default);
app.use('/api', routes_1.default);
// add routing for / path
app.get('/', function (req, res) {
    res.json({
        message: 'Hello World 🌍'
    });
});
// start express server
app.listen(PORT, function () {
    console.log("Server is starting at port:".concat(PORT));
});
exports.default = app;
