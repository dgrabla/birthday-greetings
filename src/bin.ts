import { cac } from 'cac'
import run from './index';
import {Options} from './types';

const cli = cac('greet');

cli
.command('', 'Run, identify people to congratulate and send a notification using the provider')
.option('--slack-token <string>',
  'Define a slack token, needed if any entry has a provider of type slack', {
})
.example('--slack-token xoxb-1189-11917-24123-123')
.option('--slack-conversation-id <string>',
  'Define a slack conversationid, needed if any entry has a provider of type slack', {
})
.example('--slack-conversation-id A022Q6KA92')
.option('--dbpath <type>',
  'Choose a csv database file', {
  default: './db.csv'
})
.action(async (options:Options) => {
  await run(options);
})

cli.help();
cli.version(require('../package.json').version);
cli.parse();

