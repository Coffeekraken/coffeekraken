
# Function


## ```js setupSlackTransport ```


Setup a slack transport to send your logs into a certain slack channel
'winstonSlackSettings' is formated like so. You can specify some settings in the '.env' file
{
webhookUrl: process.env.SLACK_WEBHOOKURL, // see https://api.slack.com/messaging/webhooks
channel: process.env.LOG_SLACK_CHANNEL, // Slack channel to post message to
username: process.env.LOG_SLACK_USERNAME, // Username to post message with
iconUrl: process.env.LOG_SLACK_STATUS_ICON, // Status icon to post message with
formatter: null, // Custom function to format messages with
level: 'error', // Level to log. Global settings will apply if this is blank
unfurlLinks: false, // Enables or disables link unfurling
unfurlMedia: false, // Enables or disables media unfurling
mrkdwn: false // Enables or disables mrkdwn formatting within attachments or layout blocks
}

## Parameters

- **webhookUrl**  String: The slack webook url to send the log to. See https://api.slack.com/messaging/webhooks

- **level** (error) String: The level of logs to send using this transport

- **winstonSlackSettings** ([object Object]) Object: Some settings that you want to override. See https://www.npmjs.com/package/winston-slack-webhook-transport



## Example (js)

```js
const setupSlackTransport = require('@coffeekraken/sugar/node/log/setupSlackTransport');
setupSlackTransport(['hello@world.com', 'plop@youhou.com'], 'error', {});
```


## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



