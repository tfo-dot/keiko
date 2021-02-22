import { Client, CommandisMessage, EmbedBuilder } from "../deps.ts";
import { genRandom } from "../utils.ts";

export default {
    name: "dice",
    description: "Losu losu losu",
    category: "4Fun",
    help: new EmbedBuilder().title("No siemka").field(
        "Użycie:",
        "`keiko!atak <maksymalne> [minimalne]`",
    ).field("Ogólny opis", "Bawię się maszyną losującą"),
    run: (client: Client, msg: CommandisMessage) => {

        const max = msg.stringReader.readInt()
        const min = msg.stringReader.readInt()
        return msg.reply(
            new EmbedBuilder().title("No siemka").field(
                "Informacje:",
                `Wylosowałam: __***\`${genRandom(min, max)}\`***__.`,
            ).color("#00ff00"),
        );
    },
};
