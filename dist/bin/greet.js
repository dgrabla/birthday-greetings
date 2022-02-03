'use strict';
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
const cac_1 = __importDefault(require("cac"));
const index_js_1 = __importDefault(require("../dist/index.js"));
cac_1.default
    .command('', 'Run, identify people to congratulate and send a notification using the provider')
    .option('--provider <type>', 'Choose a provider, available providers: slack', {
    default: 'slack'
})
    .option('--dbpath <type>', 'Choose a csv database file', {
    default: './db.csv'
})
    .action((options) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('run', index_js_1.default);
    yield (0, index_js_1.default)(options);
}));
cac_1.default.help();
cac_1.default.version(require('../package.json').version);
cac_1.default.parse();
