const fs = require("fs");
const path = require('path');
const { MessageEmbed, Interaction } = require('discord.js');

module.exports = {
    name: 'ping',
    group: 'fun',
	  description: "gestionnaire de pings",
    type: "messageCreate",
	  place: "guild",
    options: undefined,
    commande_channel: true,
    async run(client, msg) {
      if(message.content.includes("<@297409548703105035>")) {
	console.log("a", message.content)
      }
    }
}
