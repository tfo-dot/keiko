import { Client, CommandContext, CommandParameterType, EmbedBuilder } from "../deps.ts";

export default {
  name: "booru",
  description: "Przeszukuje booru",
  category: "4Fun",
  help: new EmbedBuilder().title("No siemka").field(
    "Użycie komendy",
    "`keiko!booru <tag>`",
  ).field("Ogólny opis:", "Pokazuje losowy obrazek z wybranym tagiem").field(
    "Dodatkowe informacje:",
    "Do tej komendy potrzebny jest kanał **`nsfw`**",
  ),
  parameters: [{ name: "rest", type: CommandParameterType.REST }],
  run: async (client: Client, ctx: CommandContext) => {
    if (!ctx.channel.data.nsfw) {
      return ctx.reply(
        `<@${ctx.data.author.id}>, sorka ale coś poszło nie tak, szczegóły: \`Kanał nie jest kanałem nsfw\``,
      );
    }

    let data = await (await fetch(
      `https://cure.ninja/booru/api/json?q=${ctx.args[0].value.trim()}&f=s&o=r`,
    )).json();

    if (!data.total) {
      ctx.reply(
        "Emmm... Bo... No... Nie ma tego... Sorki! Spróbuj wyszukać coś innego!",
      );
    } else {
      ctx.reply(
        new EmbedBuilder().title("Patrz co mam!").image(data.results[0].url),
      );
    }
  },
};
