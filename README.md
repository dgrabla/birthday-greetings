# Send birthday greetings

Parse a CSV database, find birthdays, send notifications.

Supports: 
* Slack notifications

How to use
```
> npm install
> npm run demo
```

## Github workflows

Use the free CI github minutes you are not using to run this toy. 

Use github CI to run this every day to 
parse the csv database and send the notifications if a birthday is found. 

For that, fork this project on your account, change the csv database file db.csv with your
data, change the notification messages if you want and add the required secrets to send notifications.

### Slack notifications

On github, add as secre

## Alternative CLI use
```
> npx @dgrabla/birthday-greetings 
```
