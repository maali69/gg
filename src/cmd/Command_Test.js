const Command = require("./Command.js");

class TestCommand extends Command {
  constructor(chatService, queueService, discord) {
    super("test");
    super.help = "for testing - duh!";
    super.usage = "<prefix>test";
    super.alias = ["test"];
    this.chatService = chatService;
    this.queueService = queueService;
    this.discord = discord;
  }

  run(payload, msg) {
    console.log("Testing...");
    const nowplaying = this.queueService.history[0];
    const embed = new this.discord.RichEmbed();
    console.log(nowplaying);
    // eslint-disable-next-line no-negated-condition
    if (String(nowplaying) !== "undefined") {
      for (const key in nowplaying) {
        if (nowplaying[key] === "") {
          nowplaying[key] = "-";
        }
      }
      embed.setColor(890629);
      embed.addField("Title", nowplaying.title, true);
      embed.addField("Artist", nowplaying.artist, true);
      embed.addBlankField();
      embed.addField("Requester", nowplaying.requester, true);
      embed.addField("Rating", nowplaying.rating, true);
      embed.addField("Source", nowplaying.src, true);
    } else {
      console.log();
      embed.setColor(13632027);
      embed.addField("Are you deaf?", "Go check your ears, there is clearly nothing playing right now!", true);
    }
    this.chatService.richNote(msg.channel, embed);
  }
}

module.exports = TestCommand;