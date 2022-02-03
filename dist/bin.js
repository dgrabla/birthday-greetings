#!/usr/bin/env node
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
const cac_1 = require("cac");
const index_1 = __importDefault(require("./index"));
const cli = (0, cac_1.cac)('congratulate');
cli
    .command('', 'Run, identify people to congratulate and send a notification using the provider')
    .option('--slack-token <string>', 'Define a slack token, needed if any entry has a provider of type slack', {})
    .example('--slack-token xoxb-1189-11917-24123-123')
    .option('--slack-conversation-id <string>', 'Define a slack conversationid, needed if any entry has a provider of type slack', {})
    .example('--slack-conversation-id A022Q6KA92')
    .option('--dbpath <type>', 'Choose a csv database file', {
    default: './db.csv'
})
    .action((options) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, index_1.default)(options);
}));
cli.help();
cli.version(require('../package.json').version);
cli.parse();
