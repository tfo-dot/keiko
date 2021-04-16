import { Client, CommandisMessage, EmbedBuilder } from "../deps.ts";

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
  run: async (client: Client, msg: CommandisMessage) => {
    if (!msg.channel.data.nsfw) {
      return msg.reply(
        `<@${msg.data.author.id}>, sorka ale coś poszło nie tak, szczegóły: \`Kanał nie jest kanałem nsfw\``,
      );
    }

    let data = await (await fetch(
      `https://cure.ninja/booru/api/json?q=${msg.stringReader.getRemaing().trim()}&f=s&o=r`,
    )).json();

    if (!data.total) {
      msg.reply(
        "Emmm... Bo... No... Nie ma tego... Sorki! Spróbuj wyszukać coś innego!",
      );
    } else {
      msg.reply(
        new EmbedBuilder().title("Patrz co mam!").image(data.results[0].url),
      );
    }
  },
};
