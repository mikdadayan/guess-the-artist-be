"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv"));
var api_1 = __importDefault(require("./routes/api"));
dotenv_1.default.config();
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api", api_1.default);
process.env.MONGODB_URI &&
    mongoose_1.default
        .connect(process.env.MONGODB_URI, {})
        .then(function () {
        console.log("Connected to MongoDB");
    })
        .catch(function (err) {
        console.log("Error connecting to MongoDB:", err);
    });
var port = process.env.PORT || 5001;
app.listen(port, function () {
    console.log("Server listening on port ".concat(port));
});
//# sourceMappingURL=index.js.map