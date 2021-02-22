import { Client, CommandisMessage, EmbedBuilder } from "../deps.ts";
import { genRandom } from "../utils.ts";

export default {
    name: "serverinfo",
    description: "Informacje o serwerze",
    category: "4Fun",
    help: new EmbedBuilder().title("No siemka").field(
        "Użycie:",
        "`keiko!serverinfo`",
    ).field("Ogólny opis", "Katuje discorda o dane serwera"),
    run: (client: Client, msg: CommandisMessage) => {

        if (!msg.guild) {
            return msg.reply(
                `<@${msg.author.id}>, sorka ale coś poszło nie tak, szczegóły: \`Komenda nie jest wykonywana na serwerze\``,
            );
        }

        return msg.reply(
            new EmbedBuilder().title("No siemka")
                .field("Nazwa:", msg.guild.name, true)
                .field("ID:", msg.guild.id, true)
                .image(msg.guild.data.icon)
                .color("#00ff00"),
        );
    },
};
