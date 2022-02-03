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
const csvtojson_1 = __importDefault(require("csvtojson"));
const { WebClient } = require('@slack/web-api');
const decomposeDate = (date) => {
    return {
        date: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear()
    };
};
const today = decomposeDate(new Date());
const getDbData = (dbPath) => __awaiter(void 0, void 0, void 0, function* () {
    const json = yield (0, csvtojson_1.default)().fromFile(dbPath);
    return json;
});
const processEntries = (people) => {
    return people.map((person) => {
        return Object.assign(Object.assign({}, person), { date_of_birth: decomposeDate(new Date(person.date_of_birth)) });
    });
};
const getPeopleToCongratulate = (people) => {
    return people.filter((person) => {
        if (person.date_of_birth.date === today.date
            && person.date_of_birth.month === today.month) {
            return true;
        }
        return false;
    }).map(person => {
        return Object.assign(Object.assign({}, person), { age: today.year - person.date_of_birth.year });
    });
};
const report = (people) => {
    people.forEach(person => {
        console.log(`${person.first_name} ${person.last_name} turned ${person.age} today`);
    });
};
const notify = (people, { slackToken, slackConversationId }) => __awaiter(void 0, void 0, void 0, function* () {
    return people.forEach((person) => __awaiter(void 0, void 0, void 0, function* () {
        if (person.provider === 'slack') {
            if (!slackToken || !slackConversationId) {
                console.log(`Could not submit the notify to slack because you didn't pass the slackToken/slackConversationId. Check the --help command.`);
                return;
            }
            const web = new WebClient(slackToken);
            try {
                const result = yield web.chat.postMessage({
                    text: `Hey ${person.first_name} ${person.last_name}, Happy ${person.age} birthday! :tada: :cake: we wish you a great day!`,
                    channel: slackConversationId,
                });
                console.log(`Successfully send message ${result.ts} in slack conversation ${conversationId}`);
            }
            catch (err) {
                console.log(`Slack.postMessage returned an error: ${err.message}. This will happen if your slack token and slack conversationId are not valid.`);
            }
            if (person.provider === 'email') {
                console.log('SMTP notification is not implemented yet');
            }
        }
    }));
});
const run = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const { dbpath, slackToken, slackConversationId } = options;
    const dbItems = yield getDbData(dbpath);
    const peopleToCongratulate = getPeopleToCongratulate(processEntries(dbItems));
    report(peopleToCongratulate);
    yield notify(peopleToCongratulate, { slackToken, slackConversationId });
});
exports.default = run;
