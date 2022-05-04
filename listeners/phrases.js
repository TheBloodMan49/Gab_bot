const fs = require("fs");
const path = require('path');
const { MessageEmbed, Interaction } = require('discord.js');

module.exports = {
    name: 'phrases',
    group: 'fun',
	  description: "listener de phrases",
    type: "messageCreate",
	  place: "guild",
    options: undefined,
    commande_channel: true,
    async run(client, msg) {
      guilds = ["513776796211085342", "890915473363980308", "480142959501901845"]
      
      if(msg.channel.type == "GUILD_TEXT" && guilds.includes(msg.channel.guild.id) && !msg.author.bot) {
	      channel = await client.channels.fetch("948352104769151047")
	      message = await channel.messages.fetch()
	      if(message.first().embeds[0].description == msg.channel.guild.id) {
		 date = new Date(message.first().embeds[0].timestamp)
		 now = new Date()
		 if(((now - date)/1000/60/60) < 1) {
			return;	 
		 }
	      }
	      
	content2 = msg.content
	content2 = content2.toLowerCase()
	      
	if(client.owners.includes(msg.author.id)) {
	   if(msg.reference != undefined && msg.reference.messageId != undefined) {
		mmsg = await msg.channel.messages.fetch(msg.reference.messageId);
		if(mmsg.author.id == client.user.id) {
			await msg.reply("♥");
		}
	   }
	}
	      
	if(content2.includes("application d'enzo")) {
		msg.reply("Ah ? cette CELEBRE application trouvée le 08/02/2022 aux alentours de 15h20 par le GRAND Enzo Sicard ?")
		return;
	}else if(content2.includes("pgcd")) {
		msg.reply("Le PGCD c'est 4")
		return;
	}

        content = msg.content
	content = content.replaceAll(/[.,\/#!%\^&\*;:{}=?\-_`~()\"]/g,"")
	content = content.trim()
	content = content.toLowerCase()
	      
	if(content.length >= 200) {
		random = Math.floor(Math.random() * (1000 + 1))
		if(random == 100) {
			mmsg = await msg.reply("https://media.discordapp.net/attachments/514374423910809601/943079513212989470/20220214_224737.jpg?width=668&height=663")
			await mmsg.react("♥")
			await msg.react("♥")
			return;
		}else if(random == 99) {
			mmsg = await msg.reply("https://cdn.discordapp.com/attachments/294267591734722561/969366860472655972/My_Movie.mov")
			await mmsg.react("♥")
			await msg.react("♥")
			return;
		}else if(random == 98) {
			mmsg = await msg.reply("https://images-ext-1.discordapp.net/external/XFH2Kik-2VUJhgU7NHddd7Z9-CiP9VtUqWjWKZCk3_M/https/media.discordapp.net/attachments/661317980671574020/964874613370789898/20220415_192915.jpg")
			await mmsg.react("♥")
			await msg.react("♥")
			return;
		}else {
			mmsg = await msg.reply("menfou palu + ratio")
			await mmsg.react("♥")
			await msg.react("♥")
			return;
		}
	}
	      
	arr = content.split(" ")
	      
	last = arr[arr.length - 1]
	if(last.substr(last.length - 4) == "quoi" || last.substr(last.length - 3) == "koi" || last.substr(last.length - 7) == "quoient" || last.substr(last.length - 3) == "coi" || last.substr(last.length - 4) == "koua"|| last.substr(last.length - 3) == "kwa") {
		msg.reply("feur")
		return;
	}
	      
	
	for(x in arr) {
	  if(arr[x].startsWith("di") || arr[x].startsWith("dy")) {
	     if(arr[x].substring(2).length > 1 && arr[x] != "dire") {
		msg.reply(arr[x].substring(2))
	        return;
	     }
	  }
	}
	
	for(x in arr) {
	  if(arr[x].startsWith("ukraine") || arr[x].startsWith("lukraine")) {
		msg.reply("L'Ukraine ? tu veut dire cette province de la Russie ?")
		return;
	  }
	}
	      
	arr = content.split(" ")
	for(x in arr) {
	  if(arr[x].startsWith("cri") || arr[x].startsWith("cry")) {
	     if(arr[x].substring(3).length > 1) {
		msg.reply(arr[x].substring(3).toUpperCase())
	        return;
	     }
	  }
	}
	      
	if(last == "ah" || last == "ha") {
		msg.reply("B")
		return;
	}
	      
      }
    }
}
