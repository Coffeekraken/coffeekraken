# setupSlackTransport

<!-- @namespace: sugar.node.log.setupSlackTransport -->

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**


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



### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
webhookUrl  |  **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**  |  The slack webook url to send the log to. See https://api.slack.com/messaging/webhooks  |  optional  |  process.env.SLACK_WEBHOOKURL
level  |  **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**  |  The level of logs to send using this transport  |  optional  |  'error'
winstonSlackSettings  |  **{ [Object](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object) }**  |  Some settings that you want to override. See https://www.npmjs.com/package/winston-slack-webhook-transport  |  optional  |  {}

### Example
```js
	const setupSlackTransport = require('@coffeekraken/sugar/node/log/setupSlackTransport');
setupSlackTransport(['hello@world.com', 'plop@youhou.com'], 'error', {});
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)