import { Client, CommandContext, CommandParameterType, EmbedBuilder } from "../deps.ts";
import { genRandom } from "../utils.ts";
export default {
    name: "dice",
    description: "Losu losu losu",
    category: "4Fun",
    help: new EmbedBuilder().title("No siemka").field(
        "Użycie:",
        "`keiko!atak <maksymalne> [minimalne]`",
    ).field("Ogólny opis", "Bawię się maszyną losującą"),
    parameters: [
        { name: "max", type: CommandParameterType.INT },
        { name: "min", type: CommandParameterType.INT, default: 0 }
    ],
    run: (client: Client, ctx: CommandContext) => {

        const max = Math.abs(ctx.args[0].value)
        const min = Math.abs(ctx.args[1].value)
        return ctx.reply(
            new EmbedBuilder().title("No siemka").field(
                "Informacje:",
                `Wylosowałam: __***\`${genRandom(min, max)}\`***__.`,
            ).color("#00ff00"),
        );
    },
};
