'use strict';
const botKit = require('botkit');
const isUp = require('is-up');

const controller = botKit.slackbot({
	debug: false
});

controller.spawn({
	token: 'xoxb-64620058769-Ra3JavtNMhfAJHjhjrG8wXHn'
}).startRTM(function (err) {
	if (err) {
		throw new Error(err);
	}
});

const sortMsg = msg => {
	const urls = msg.text.replace(/(<|>)/g, '')
		.split('|');

	return urls[1];
};

controller.on('direct_mention', (bot, message) => {
	const site = sortMsg(message);

	isUp(site).then(up => {
		if (up === true) {
			bot.reply(message, `${site} is up`);
			return;
		}

		bot.reply(message, `${site}is down`);
	});
});
