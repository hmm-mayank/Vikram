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
const twilio_1 = __importDefault(require("twilio"));
const accountSid = "AC1adf40fa2851736e7fa7ff1f8911edff";
const authToken = "023106d65a4c571b38540bff5c509573";
const messageClient = twilio_1.default(accountSid, authToken);
const axios_1 = __importDefault(require("axios"));
const sendMessage = (props) => __awaiter(void 0, void 0, void 0, function* () {
    const { code, userNumber } = props;
    //   messageClient.messages
    //     .create({
    //       body: `<#> ${code} is your Mangao code`,
    //       from: "+17632963461",
    //       to: `${userNumber.includes("+91") ? userNumber : `+91${userNumber}`}`,
    //     })
    //     .then((message) => console.log("LETTT", message.sid))
    //     .catch((e) => {
    //       console.log("ERROR", e);
    //     });
    const message = `${code} is your Mornigo Code`;
    const sendMessage = yield axios_1.default.get(`http://my.usacricket.org:7200?phone=${userNumber}&code=91&message=${message}`);
    console.log(sendMessage.data, "GETRES");
    return sendMessage;
});
const sendWhatsAppMessage = (props) => {
    const { code, userNumber } = props;
    messageClient.messages
        .create({
        from: "whatsapp:+17632963461",
        body: `${code} is your Mangao code`,
        to: `whatsapp:${userNumber.includes("+91") ? userNumber : `+91${userNumber}`}`,
    })
        .then((message) => console.log("LETTT", message.sid))
        .catch((e) => {
        console.log("ERROR", e);
    });
};
exports.default = { sendMessage, sendWhatsAppMessage };
//# sourceMappingURL=message.js.map