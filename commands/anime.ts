import { CommandisMessage, EmbedBuilder, Client } from "../deps.ts";
import { graphql } from "../utils.ts";

export default {
    name: "anime",
    description: "Informacje o anime",
    help: new EmbedBuilder().title("No siemka").field(
        "Użycie:",
        "`keiko!anime <nazwa>`",
    ).field("Ogólny opis", "Pokazuj informacje o mandze!"),
    category: "Weeb",
    run: async (client: Client, msg: CommandisMessage) => {
        let name = msg.stringReader.getRemaing().trim();

        if (name.length < 0) {
            return msg.reply(
                `<@${msg.author.id}>, sorka ale coś poszło nie tak, szczegóły: \`Brak nazwy anime\``,
            );
        }

        let req = fetch("https://graphql.anilist.co", {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                "query": graphql.MEDIA_QUERY,
                "variables": { search: name, type: "ANIME" }
            }),
            method: "POST"
        })

        var res = (await req.then(resp => resp.json()));

        if (res.errors && res.errors.length > 0) {
            return msg.reply(
                `<@${msg.author.id}>, sorka ale coś poszło nie tak, szczegóły: \`${res.errors[0].message}\``,
            );
        }

        let data = res.data.Media;
        let embed = new EmbedBuilder().title("Bonjour!").field("Tytuł:", data.title.english, true)
            .color(data.coverImage.color).image(data.coverImage.large).field("Status:", data.status, true)
            .field("Liczba odcinków:", data.episodes, true).field("Przeczytaj więcej na", data.siteUrl, true)
            .field("NSFW?", data.isAdult ? "Tak" : "Nie", true).field("Jak inaczej to nazwać?", data.synonyms.join(", "), true)
            .field("Data pierwszego odcinka:", `${data.startDate.day}.${data.startDate.month}.${data.startDate.year}`, true)
            .field("Studia:", data.studios.nodes.map((elt: any) => elt.name).join(", "), true)
        msg.reply(embed)

    }
}