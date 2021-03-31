import { Client, User } from "../deps.ts";

export default {
  name: "READY",
  run: (client: Client, user: User) => {
    console.log("Logged as " + user.data.username);
    client.game("hentai");

    client.registerSlashCommand({
      name: "attack",
      id: client.user?.data.id!,
      description: "Atakowańsko",
      options: [
        {
          name: "lvl",
          type: 4,
          description: "Poziom postaci"
        },
        {
          name: "modyfikator",
          type: 4,
          description: "Modyfikator trafienia",
          required: false
        },
        {
          name: "obrażenia",
          type: 4,
          description: "Dodatkowe obrażenia", required: false
        },
        {
          name: "krytyczne",
          type: 4,
          description: "Szansa na trafienie krytyczne", required: false
        },
        {
          name: "mnożnik",
          type: 4,
          description: "Mnożnik krytycznego", required: false
        },
        {
          name: "second",
          type: 4,
          description: "Szansa na drugie uderzenie", required: false
        },
      ],
    }, "749007879150895105"); // Reborn
  }
};
