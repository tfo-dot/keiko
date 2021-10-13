import { Command, CommandContext, Embed, RestArgument } from "../deps.ts";
import { graphql } from "../utils.ts";

export default class AnimeCommand extends Command {
  name = "anime";
  description = "Informacje o anime";
  category = "weeb";
  args = [
    {
      match: "rest",
    } as RestArgument,
  ];
  async execute(ctx: CommandContext) {
    const name = ctx.args![0];

    const req = fetch("https://graphql.anilist.co", {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        "query": graphql.MEDIA_QUERY,
        "variables": { search: name, type: "ANIME" },
      }),
      method: "POST",
    });

    const res = (await req.then((resp) => resp.json()));

    if (res.errors && res.errors.length > 0) {
      return ctx.message.reply(
        `<@${ctx.author.id}>, sorka ale coś poszło nie tak, szczegóły: \`${
          res.errors[0].message
        }\``,
      );
    }

    const data = res.data.media;

    const embed = new Embed().setTitle("Bonjour!").addField(
      "Tytuł:",
      data.title.english,
      true,
    )
      .setColor(data.coverImage.color).setImage(data.coverImage.large).addField(
        "Status:",
        data.status,
        true,
      )
      .addField("Liczba odcinków:", data.episodes, true).addField(
        "Przeczytaj więcej na",
        data.siteUrl,
        true,
      )
      .addField("NSFW?", data.isAdult ? "Tak" : "Nie", true).addField(
        "Jak inaczej to nazwać?",
        data.synonyms.join(", "),
        true,
      )
      .addField(
        "Data pierwszego odcinka:",
        `${data.startDate.day}.${data.startDate.month}.${data.startDate.year}`,
        true,
      )
      .addField(
        "Studia:",
        data.studios.nodes.map((elt: { name: string }) => elt.name).join(", "),
        true,
      );

    ctx.message.reply({ embed });
  }
}
