//const { oneLine } = require('common-tags');

module.exports = {
    name: 'nextclass',
    description: "refresh la semaine de l'edt.",
    permission: "all",
    serverid: ["513776796211085342", "890915473363980308"],
    async run(interaction, client) {
        let classs = interaction.message.embeds[0].title.replace("Emploi du temps de la classe : ", '');
        const date1 = new Date(interaction.message.embeds[0].description.replace("Semaine du ", '').split(" ")[0]);
        const date2 = new Date(interaction.message.embeds[0].description.replace("Semaine du ", '').split(" ")[2]);

        const test = JSON.parse(JSON.stringify(client.commands.get("edt").codes));
        delete test["raph"];
        const keys = Object.keys(test);
        classs = keys[(keys.indexOf(classs) + 1) % keys.length];
        // edit
        if (classs === "raph") {
            client.commands.get("edt").create_di_raph(client, date1, date2, interaction, "raph");
        } else {
            client.commands.get("edt").classic(client, date1, date2, interaction, classs);
        }
        interaction.deferUpdate();
    }
};
