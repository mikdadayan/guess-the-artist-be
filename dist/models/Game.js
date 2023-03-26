"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var gameSchema = new mongoose_1.Schema({
    artist: { type: String, required: true },
    score: { type: Number, required: true },
    albums: [{ type: String, ref: "Album" }],
});
var Game = (0, mongoose_1.model)("Game", gameSchema);
exports.default = Game;
//# sourceMappingURL=Game.js.map