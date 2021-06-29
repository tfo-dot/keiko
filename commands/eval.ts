import { CommandContext, EmbedBuilder, Client, CommandParameterType } from "../deps.ts";

export default {
    name: "eval",
    description: "Informacje o anime",
    help: new EmbedBuilder().title("No siemka").field(
        "Użycie:",
        "`keiko!eval <kod>`",
    ).field("Ogólny opis", "Wykonuje kod!"),
    category: "system",
    hidden: true,
    parameters: [{ name: "code", type: CommandParameterType.REST }],
    run: async (client: Client, ctx: CommandContext) => {
        if (ctx.data.author.id != "344048874656366592") {
            return ctx.reply(
                `<@${ctx.data.author.id}>, sorka ale coś poszło nie tak, szczegóły: \`Nie jesteś właścicielem bota\``,
            );
        }
        try { ctx.reply(eval(ctx.args[0].value), true) } catch (e) { ctx.reply(e, true) }
    }
}