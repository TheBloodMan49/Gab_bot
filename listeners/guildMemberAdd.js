const config = require('../config.json');
const fs = require("fs");
const path = require('path');
const packageJSON = require("./package.json");
const { MessageEmbed, Interaction } = require('discord.js');

module.exports = {
    name: 'guildMemberAdd',
    group: 'core',
	description: "listener de gestion de nouveau membre",
    type: "guildMemberAdd",
	place: "guild",
    options: undefined,
    async run(client, member) {
        try {
            let welcome = JSON.parse(fs.readFileSync("./welcome.json", "utf8"));
            if (welcome[member.guild.id].channel) {
                var welcomechannel = member.guild.channels.cache.get(welcome[member.guild.id].channel);
        
                if (!welcomechannel) {
                    return undefined;
                }
                console.log(welcome[member.guild.id].message + ` ${member}`);
                welcomechannel.send(welcome[member.guild.id].message + ` ${member}`);
            }
        }catch(err) {
            console.log(err);
        }
    }
}