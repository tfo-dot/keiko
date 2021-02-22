import { CommandisMessage, EmbedBuilder, Client } from "../deps.ts";
import { graphql } from "../utils.ts";

export default {
    name: "eval",
    description: "Informacje o anime",
    help: new EmbedBuilder().title("No siemka").field(
        "Użycie:",
        "`keiko!anime <nazwa>`",
    ).field("Ogólny opis", "Pokazuj informacje o mandze!"),
    category: "system",
    hidden: true,
    run: async (client: Client, msg: CommandisMessage) => {
        if (msg.data.author.id != "344048874656366592") {
            return msg.reply(
                `<@${msg.author.id}>, sorka ale coś poszło nie tak, szczegóły: \`Nie jesteś właścicielem bota\``,
            );
        }
        try { eval(msg.stringReader.getRemaing()) } catch (e) { msg.reply(e, true) }
    }
}