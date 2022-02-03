# Congratulate: Send birthday greetings from github CI

<p align="center">
  <a href="https://npmjs.com/package/congratulate"><img src="https://img.shields.io/npm/v/congratulate.svg" alt="npm package"></a>
</p>

## What it is?

A toy to make use of your *free usage quota* on Github Actions to send birthday notifications to Slack or by Email.

![image](https://user-images.githubusercontent.com/1942073/152436891-fd79bf85-2424-4eea-baed-d1e1c28f6dc4.png)

* Fork this repo and schedule the script on Github CI to run every day at a specific time. For free.
* Slack notifications

## How it works
* GitHub Actions is used as a scheduler

* Every day the script runs and sends a notification if a birthday was found on the database.  

## How to use locally

You don't need to fork the repo, you can also run it locally. Create a CSV database with your contacts similar to the [example
database](https://raw.githubusercontent.com/dgrabla/congratulate/main/db.csv). Then run it with npx.
```
> npx congratulate --dbpath db.csv --slack-token XXX-YYY-ZZZ --slack-conversation-id 12346780
```

Or if you want to download the repo
```
> git clone @dgrabla/congratulate
> npm install
> npm run help
> npm run demo
```

## How to configure the Github workflow

Use the free CI github minutes to schedule this script every day and send notifications to an slack channel

For that, *fork this project as a private repo on your github account*, or *clone the repo and upload it on your name*, 
change the csv database file db.csv with your data, activate the workflows (disabled by default on the forks) and add the 
required secrets to send Slack notifications.

You can change the schedule when the event fires on the workflow file. You can also fire it manually by clicking the run workflow button:
![image](https://user-images.githubusercontent.com/1942073/152421450-f342d5d8-f4aa-4c7e-85aa-927f84821d8d.png)

### Set up slack notifications

On your forked repo, add the SLACK_TOKEN (a long string) and SLACK_CONVERSATION_ID (the channel where you want to send the notification) secrets. You can generate tokens in [this page](https://slack.com/help/articles/215770388-Create-and-regenerate-API-tokens)

![image](https://user-images.githubusercontent.com/1942073/152424316-2e9b4db4-99c1-4444-9177-f8a8f15ca726.png)

### Set up email notifications

Not yet.
