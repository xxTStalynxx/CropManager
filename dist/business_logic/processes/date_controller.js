"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDate = void 0;
const moment_1 = __importDefault(require("moment"));
const getDate = () => {
    const timeElapsed = Date.now();
    const date = new Date(timeElapsed);
    const formatDate = ((0, moment_1.default)(date)).format('DD-MM-YYYY');
    return formatDate;
};
exports.getDate = getDate;
//# sourceMappingURL=date_controller.js.map