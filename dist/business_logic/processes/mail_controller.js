"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generarToken = exports.sendEmail = exports.transporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const email_1 = require("../../database/email");
exports.transporter = nodemailer_1.default.createTransport({
    host: email_1.email.host,
    port: email_1.email.port,
    secure: true,
    auth: {
        user: email_1.email.user,
        pass: email_1.email.pass
    }
});
exports.transporter.verify().then(() => {
    console.log('Email ready');
});
const sendEmail = (mail, subject, html) => __awaiter(void 0, void 0, void 0, function* () {
    yield exports.transporter.sendMail({
        from: `"CropManager " <${email_1.email.user}>`,
        to: mail,
        subject: subject,
        html: html
    });
});
exports.sendEmail = sendEmail;
const generarToken = (num) => {
    return [...Array(num)].map(() => {
        const randomNum = ~~(Math.random() * 36);
        return randomNum.toString(36);
    }).join('').toUpperCase();
};
exports.generarToken = generarToken;
//# sourceMappingURL=mail_controller.js.map