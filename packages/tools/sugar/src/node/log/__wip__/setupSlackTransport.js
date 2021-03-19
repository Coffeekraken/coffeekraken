"use strict";
// @ts-nocheck
const __winston = require('winston');
const SlackHook = require('winston-slack-webhook-transport');
const __getAppMeta = require('../app/getAppMetas');
/**
 * @name                    setupSlackTransport
 * @namespace           sugar.node.log
 * @type                    Function
 *
 * Setup a slack transport to send your logs into a certain slack channel
 * 'winstonSlackSettings' is formated like so. You can specify some settings in the '.env' file
 * {
 *    webhookUrl: process.env.SLACK_WEBHOOKURL, // see https://api.slack.com/messaging/webhooks
 *    channel: process.env.LOG_SLACK_CHANNEL, // Slack channel to post message to
 *    username: process.env.LOG_SLACK_USERNAME, // Username to post message with
 *    iconUrl: process.env.LOG_SLACK_STATUS_ICON, // Status icon to post message with
 *    formatter: null, // Custom function to format messages with
 *    level: 'error', // Level to log. Global settings will apply if this is blank
 *    unfurlLinks: false, // Enables or disables link unfurling
 *    unfurlMedia: false, // Enables or disables media unfurling
 *    mrkdwn: false // Enables or disables mrkdwn formatting within attachments or layout blocks
 * }
 *
 * @param                 {String}                [webhookUrl=process.env.SLACK_WEBHOOKURL]           The slack webook url to send the log to. See https://api.slack.com/messaging/webhooks
 * @param                 {String}                [level='error']                                     The level of logs to send using this transport
 * @param                 {Object}                [winstonSlackSettings={}]                           Some settings that you want to override. See https://www.npmjs.com/package/winston-slack-webhook-transport
 *
 * @example         js
 * const setupSlackTransport = require('@coffeekraken/sugar/node/log/setupSlackTransport');
 * setupSlackTransport(['hello@world.com', 'plop@youhou.com'], 'error', {});
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function setupSlackTransport(webhookUrl = process.env.LOG_SLACK_WEBHOOKURL, level = 'error', winstonSlackSettings = {}) {
    // get the app meta
    const appMeta = __getAppMetas();
    // format message
    const formatArray = [];
    if (appMeta.name) {
        formatArray.push({
            text: `- *Application:* ${appMeta.name}`
        });
    }
    if (appMeta.version) {
        formatArray.push({
            text: `- *Version:* ${appMeta.version}`
        });
    }
    if (appMeta.homepage) {
        formatArray.push({
            text: `- *Homepage:* <${appMeta.homepage}>`
        });
    }
    if (appMeta.license) {
        formatArray.push({
            text: `- *License:* ${appMeta.license}`
        });
    }
    if (appMeta.author) {
        formatArray.push({
            text: `- *Author:* ${appMeta.author}`
        });
    }
    if (appMeta.contributors) {
        let contributorsArray = [];
        appMeta.contributors.forEach((cont) => {
            contributorsArray.push(`<mailto:${cont.email}|${cont.name}>`);
        });
        formatArray.push({
            text: `- *Contributors:* ${contributorsArray.join(', ')}`
        });
    }
    // init the slack transport
    const slackTransport = new SlackHook(Object.assign({ webhookUrl: webhookUrl, channel: process.env.LOG_SLACK_CHANNEL, username: process.env.LOG_SLACK_USERNAME || appMeta.name || 'Coffeekraken logger', iconUrl: process.env.LOG_SLACK_STATUS_ICON, formatter: (info) => {
            return {
                // text: `${info.level}: ${info.message}`,
                attachments: [
                    {
                        text: `- *Level:* ${info.level}`
                    }
                ].concat(formatArray),
                blocks: [
                    {
                        type: 'section',
                        text: {
                            type: 'mrkdwn',
                            text: `${info.message}`
                        }
                    }
                ]
            };
        }, level: level, unfurlLinks: false, unfurlMedia: false, mrkdwn: true }, winstonSlackSettings));
    global._sLogger.add(slackTransport);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dXBTbGFja1RyYW5zcG9ydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNldHVwU2xhY2tUcmFuc3BvcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7QUFFZCxNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDckMsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7QUFDN0QsTUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFFbkQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E0Qkc7QUFDSCxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsbUJBQW1CLENBQzNDLFVBQVUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixFQUM3QyxLQUFLLEdBQUcsT0FBTyxFQUNmLG9CQUFvQixHQUFHLEVBQUU7SUFFekIsbUJBQW1CO0lBQ25CLE1BQU0sT0FBTyxHQUFHLGFBQWEsRUFBRSxDQUFDO0lBRWhDLGlCQUFpQjtJQUNqQixNQUFNLFdBQVcsR0FBRyxFQUFFLENBQUM7SUFDdkIsSUFBSSxPQUFPLENBQUMsSUFBSSxFQUFFO1FBQ2hCLFdBQVcsQ0FBQyxJQUFJLENBQUM7WUFDZixJQUFJLEVBQUUsb0JBQW9CLE9BQU8sQ0FBQyxJQUFJLEVBQUU7U0FDekMsQ0FBQyxDQUFDO0tBQ0o7SUFDRCxJQUFJLE9BQU8sQ0FBQyxPQUFPLEVBQUU7UUFDbkIsV0FBVyxDQUFDLElBQUksQ0FBQztZQUNmLElBQUksRUFBRSxnQkFBZ0IsT0FBTyxDQUFDLE9BQU8sRUFBRTtTQUN4QyxDQUFDLENBQUM7S0FDSjtJQUNELElBQUksT0FBTyxDQUFDLFFBQVEsRUFBRTtRQUNwQixXQUFXLENBQUMsSUFBSSxDQUFDO1lBQ2YsSUFBSSxFQUFFLGtCQUFrQixPQUFPLENBQUMsUUFBUSxHQUFHO1NBQzVDLENBQUMsQ0FBQztLQUNKO0lBQ0QsSUFBSSxPQUFPLENBQUMsT0FBTyxFQUFFO1FBQ25CLFdBQVcsQ0FBQyxJQUFJLENBQUM7WUFDZixJQUFJLEVBQUUsZ0JBQWdCLE9BQU8sQ0FBQyxPQUFPLEVBQUU7U0FDeEMsQ0FBQyxDQUFDO0tBQ0o7SUFDRCxJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUU7UUFDbEIsV0FBVyxDQUFDLElBQUksQ0FBQztZQUNmLElBQUksRUFBRSxlQUFlLE9BQU8sQ0FBQyxNQUFNLEVBQUU7U0FDdEMsQ0FBQyxDQUFDO0tBQ0o7SUFDRCxJQUFJLE9BQU8sQ0FBQyxZQUFZLEVBQUU7UUFDeEIsSUFBSSxpQkFBaUIsR0FBRyxFQUFFLENBQUM7UUFDM0IsT0FBTyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNwQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQ2hFLENBQUMsQ0FBQyxDQUFDO1FBQ0gsV0FBVyxDQUFDLElBQUksQ0FBQztZQUNmLElBQUksRUFBRSxxQkFBcUIsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1NBQzFELENBQUMsQ0FBQztLQUNKO0lBRUQsMkJBQTJCO0lBQzNCLE1BQU0sY0FBYyxHQUFHLElBQUksU0FBUyxpQkFDbEMsVUFBVSxFQUFFLFVBQVUsRUFDdEIsT0FBTyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQ3RDLFFBQVEsRUFDTixPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixJQUFJLE9BQU8sQ0FBQyxJQUFJLElBQUkscUJBQXFCLEVBQ3pFLE9BQU8sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixFQUMxQyxTQUFTLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNsQixPQUFPO2dCQUNMLDBDQUEwQztnQkFDMUMsV0FBVyxFQUFFO29CQUNYO3dCQUNFLElBQUksRUFBRSxjQUFjLElBQUksQ0FBQyxLQUFLLEVBQUU7cUJBQ2pDO2lCQUNGLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQztnQkFDckIsTUFBTSxFQUFFO29CQUNOO3dCQUNFLElBQUksRUFBRSxTQUFTO3dCQUNmLElBQUksRUFBRTs0QkFDSixJQUFJLEVBQUUsUUFBUTs0QkFDZCxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFO3lCQUN4QjtxQkFDRjtpQkFDRjthQUNGLENBQUM7UUFDSixDQUFDLEVBQ0QsS0FBSyxFQUFFLEtBQUssRUFDWixXQUFXLEVBQUUsS0FBSyxFQUNsQixXQUFXLEVBQUUsS0FBSyxFQUNsQixNQUFNLEVBQUUsSUFBSSxJQUNULG9CQUFvQixFQUN2QixDQUFDO0lBRUgsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDdEMsQ0FBQyxDQUFDIn0=