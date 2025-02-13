const { MessageEmbed } = require('discord.js');
const roles = require('../roles.json');

module.exports = {
    name: 'reactionrole',
    group: 'moderation',
    description: "Commande de déploiement du message de reaction",
    permission: "owner",
    hidden: false,
    serverid: ["513776796211085342", "890915473363980308"],
    help: [
        {
            "name": "- __reactionrole__ :",
            "value": "Envoie le message de réaction."
        }
    ],
    place: "guild",
    options: [
        {
            name: 'message',
            description: 'message à modifier',
            type: 'STRING',
            required: false,
        },
    ],
    async run(message, client, interaction = undefined) {
        if (interaction !== undefined) {

            const fields = [];
            for (const role in roles) {
                fields.push({
                    "name": " - " + role,
                    "value": "réagissez avec la réaction " + roles[role]["emoji"] + " pour avoir le rôle <@&" + roles[role]["role"] + ">",
                });
            }

            const embed1 = new MessageEmbed()
                .setColor("0xffe402")
                .setTitle("Roles : ")
                .setAuthor("KwikBot", client.user.avatarURL())//, 'https://github.com/KwikKill/Gab_bot')
                .setDescription(
                    "Réagissez sur un émoji pour avoir le rôle correspondant."
                )
                .addFields(fields)
                .setTimestamp();

            if (interaction.options.getString('message') === null) {
                await interaction.reply({ embeds: [embed1] });

                const msg = await interaction.fetchReply();
                for (const role in roles) {
                    msg.react(roles[role]["emoji"]);
                }
            } else {
                const msg = await interaction.channel.messages.edit(interaction.options.getString('message'), { embeds: [embed1] });
                for (const role in roles) {
                    msg.react(roles[role]["emoji"]);
                }
            }
        }
    }
};
