import csv from 'csvtojson';
import {Options, DbItems, Person, DecomposedDate} from './types';
const { WebClient } = require('@slack/web-api');


const decomposeDate = (date: Date): DecomposedDate => {
  return {
    date: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear()
  };
}

const today:DecomposedDate = decomposeDate(new Date());

const getDbData = async (dbPath:string): Promise<DbItems[]> => {
  const json = await csv().fromFile(dbPath);
  return json;
}


const processEntries = (people: DbItems[]): Person[] => {
  return people.map((person) => {
    return <Person>{
      ...person,
      ...{date_of_birth: decomposeDate(new Date(person.date_of_birth))}
    }
  })
};

const getPeopleToCongratulate = (people: Person[]): Person[] => {
  return people.filter((person) => {
    if (
      person.date_of_birth.date === today.date
      && person.date_of_birth.month === today.month
    ) {
      return true;
    }
    return false;
  }).map(person => {
    return {...person, ...{age : today.year - person.date_of_birth.year }};
  })
}

const report = (people: Person[]): void => {
  people.forEach(person=> {
    console.log(`${person.first_name} ${person.last_name} turned ${person.age} today`)
  })
}

const notify = async (people: Person[], {slackToken, slackConversationId}:any): Promise<void> => {
  return people.forEach(async person => {
    if (person.provider === 'slack') {
      if(!slackToken || !slackConversationId) {
        console.log(`Could not submit the notify to slack because you didn't pass the slackToken/slackConversationId. Check the --help command.`)
        return;
      }
      const web = new WebClient(slackToken);
      try {
        const result = await web.chat.postMessage({
          text: `Hey ${person.first_name} ${person.last_name}, Happy ${person.age} birthday! :tada: :cake: we wish you a great day!`,
          channel: slackConversationId,
        });
        console.log(`Successfully send message ${result.ts} in slack conversation ${conversationId}`);
      }
      catch(err) {
        console.log(`Slack.postMessage returned an error: ${err.message}. This will happen if your slack token and slack conversationId are not valid.`)
    }
    if (person.provider === 'email') {
      console.log ('SMTP notification is not implemented yet');
    }
  })
}

const run = async (options: Options) => {
  const {
    dbpath,
    slackToken,
    slackConversationId
  } = options;
  const dbItems = await getDbData(dbpath);
  const peopleToCongratulate = getPeopleToCongratulate(processEntries(dbItems));
  report(peopleToCongratulate);
  await notify(peopleToCongratulate, {slackToken, slackConversationId});
}

export default run;

