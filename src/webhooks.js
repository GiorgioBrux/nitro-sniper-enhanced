const { WebhookClient, MessageEmbed } = require("discord.js-light");
const logging = require("./logging/logging");

class Webhook {
  constructor(webhookUrl, type) {
    this.a = 2;
    if (webhookUrl === "") {
      logging.info(`{blueBright The ${type} webhook is empty, skipping...}`);
      return null;
    }

    const webhooktoken = /[^/]*$/.exec(webhookUrl)[0];
    const webhookid = webhookUrl.replace(
      /^.*\/(?=[^/]*\/[^/]*$)|\/[^/]*$/g,
      "",
    );
    if (
      webhooktoken == null ||
      webhookid == null ||
      webhooktoken.length < webhookid.length ||
      !/https:\/\/(ptb\.|canary\.|)(discordapp|discord)\.com\/api\/webhooks\/[0-9]+\/.+/g.test(
        webhookUrl,
      )
    ) {
      logging.error(`{red The ${type} webhook url is not valid. Skipping...}`);
      return null;
    }
    logging.info(
      `{blueBright Using ${type} webhook with id: [${webhookid}] and token: [${webhooktoken}].}`,
    );
    this.client = new WebhookClient(webhookid, webhooktoken);
    this.a = 1;
  }

  show_a() {
    console.log(`a = ${this.client}`);
  }

  send_webhook_nitro(
    res_type,
    guild,
    giver,
    tokenname,
    timetaken,
    code,
    msgurl,
    webhookping_userid,
  ) {
    if (!this.client) return;
    const embed = new MessageEmbed()
      .setTitle(`Sniped gift successfully!`)
      .setColor("#1ce829")
      .addField("Where", `${guild}`, true)
      .addField("Account used", `${tokenname}`, true)
      .addField("Giver", `${giver}`, true)
      .addField("Time taken", `${timetaken}`, true)
      .addField("Type of sub", `${res_type}`, true)
      .addField("Giftcode", `${code}`, true)
      .addField("​", `[Click here for the message.](${msgurl})`, false);
    this.client
      .send(`${webhookping_userid ? `<@${webhookping_userid}>` : ""}`, {
        username: "Nitro Sniper",
        avatarURL:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS0JCyNz1WwaTkXB3jcr0MlMLIwXAsHjhoIRw&usqp=CAU",
        embeds: [embed],
      })
      .catch((err) => {
        logging.error(
          `{red Tried to send nitro webhook embed but got error: ${err}.}`,
        );
      });
  }

  send_webhook_notes(noteweb, guild, giver, tokenname, content, msgurl) {
    if (!this.client) return;
    const embed = new MessageEmbed()
      .setTitle(`Sniped note successfully!`)
      .setColor("#1ce5e8")
      .addField("Where", `${guild}`, true)
      .addField("Account used", `${tokenname}`, true)
      .addField("​", "​", true) // Dummy field
      .addField("Sender", `${giver}`, true)
      .addField("Type", `${noteweb}`, true)
      .addField("Content", `${content}`, false)
      .addField("​", `[Click here for the message.](${msgurl})`, false);
    this.client
      .send(``, {
        username: "Nitro Sniper",
        avatarURL:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS0JCyNz1WwaTkXB3jcr0MlMLIwXAsHjhoIRw&usqp=CAU",
        embeds: [embed],
      })
      .catch((err) => {
        logging.error(
          `{red Tried to send notes webhook embed but got error: ${err}.}`,
        );
      });
  }
}

module.exports = { Webhook };
