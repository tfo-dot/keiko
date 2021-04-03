import { Client, Interaction, EmbedBuilder } from "../deps.ts";

export default {
    name: "INTERACTION_CREATE",
    run: async (client: Client, interaction: Interaction) => {
        if (interaction.data.data?.name == "attack") {

            let data = interaction.data.data.options ?? [];

            let interactionData = {
                lvl: (~~JSON.stringify(data.find(elt => elt.name == "lvl")?.value)) ?? 0,
                okayModif: (~~JSON.stringify(data.find(elt => elt.name == "modyfikator")?.value)) ?? 0,
                addDmg: (~~JSON.stringify(data.find(elt => elt.name == "obrażenia")?.value)) ?? 0,
                crit: (~~JSON.stringify(data.find(elt => elt.name == "krytyczne")?.value)) ?? 0,
                critMulti: (~~JSON.stringify(data.find(elt => elt.name == "mnożnik")?.value)) ?? 0
            }

            let response = (await ((await import("../commands/atak.ts")).default.run(client, interactionData))) as EmbedBuilder

            interaction.reply({
                embeds: [response.end()],
                content: `Parametry: poziom: ${interactionData.lvl}, modyfikator: ${interactionData.okayModif}, dodatkowe AD: ${interactionData.addDmg}, krytyczne: ${interactionData.crit}, mnożnik: ${interactionData.critMulti}, drugi atak: ${interactionData.second}`,
                flags: 0
            })
        }
    },
};
