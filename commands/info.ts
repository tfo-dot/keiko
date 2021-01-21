import { Client, CommandisMessage, EmbedBuilder } from "../deps.ts";

export default {
  name: "info",
  description: "Ogólne informacje o keiko!",
  category: "Inne",
  run: async (client: Client, msg: CommandisMessage) => {
    msg.reply(
      new EmbedBuilder().title(`Witaj przybyszu!`).field(
        "Troszkę o mnie!",
        `Jestem botem! Tak to dziwne, prawda? Moim tatą jest <@344048874656366592>.
Napisał mnie z całą swoją miłością do programowania. Potrafię dużo rzeczy. Ale na większość nie jestem jeszcze gotowa... Bywa i tak`,
      )
        .field(
          "Twórcy",
          `Co prawda wcześniej powiedziałam ci że <@344048874656366592> jest twórcą.
Prawda jest troszkę odmiennna. Nad moją poprawną pracą czuwa cały skład Indexed®. Więc nie masz się czego martwić! Do mojego rozwoju przynili się głównie:
> <@651511209585147904> - Tata mojego zmarłego ~~wskrzeszonego~~ już kuzyna, oraz ogromna pomoc!
> <@680907935345541219> - Skrypty i niektóre komendy
> <@344048874656366592> - Twórca`,
        ).field(
          "Pozostałe informacje",
          `Github: Wkrótce ~~raczej nie będzie~~
            Moja strona: [kliknij tutaj](https://keiko-assistant.herokuapp.com/)`,
        ),
    );
  },
};
