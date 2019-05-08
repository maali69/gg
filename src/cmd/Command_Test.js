const Command = require("./Command.js");

class TestCommand extends Command {
  constructor(chatService, queueService, discord, dbService) {
    super("test");
    super.help = "for testing - duh!";
    super.usage = "<prefix>test";
    super.alias = ["test"];
    this.chatService = chatService;
    this.queueService = queueService;
    this.discord = discord;
    this.dbService = dbService;
  }

  run(payload, msg) {
    console.log("Searching Song");
    if (typeof payload === "undefined" || payload.length === 0 || payload.split(" ").length < 2) {
      this.chatService.simpleNote(msg.channel, "falscher Syntax!", this.chatService.msgType.FAIL);
      this.chatService.simpleNote(msg.channel, `Usage: ${this.usage}`, this.chatService.msgType.INFO);
      return;
    }
    const plName = payload.split(" ")[0];
    const songName = payload.substr(plName.length + 1);
    this.dbService.findSong(songName, plName).then((info) => {
      console.log(info);
      this.dbService.rateSong(info, 1).then((rateResult) => {
        console.log("done");
        console.log(rateResult);
      });
    });
  }
}

module.exports = TestCommand;
