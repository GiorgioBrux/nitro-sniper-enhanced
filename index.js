/*
Nitro Sniper enhanced ed.
Modified work Copyright (C) 2020 GiorgioBrux
Original work Copyright (C) 2020 hellrising1337 | Sublicensed according to the MIT license available at <https://opensource.org/licenses/MIT> or in the LICENSE.md file in the root folder.

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program. If not, see <https://www.gnu.org/licenses/>. */

const {version} = require('./package.json');
const userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.101 Safari/537.36";
const regex = new RegExp(/(discord\.gift\/|discord\.com\/gifts\/|discordapp\.com\/gifts\/)[^\s]+/gmi);

const dotenv = require('dotenv').config({path: 'dotenv'});
const phin = require('phin').unpromisified;
const chalk = require('chalk');

const {Client, WebhookClient, RichEmbed} = require('discord.js');

const useMain = process.env.useMain;
const tokens = process.env.guildTokens.split(',').filter(item => item);
const mainToken = process.env.mainToken;
let webhookUrl = process.env.webhookUrl;
let usedTokens = [];

if (useMain === 'true' && mainToken != null) tokens.unshift(mainToken);
console.log(`%c    _   ___ __                _____       _                   
   / | / (_) /__________     / ___/____  (_)___  ___  _____   
  /  |/ / / __/ ___/ __ \\    \\__ \\/ __ \\/ / __ \\/ _ \\/ ___/   
 / /|  / / /_/ /  / /_/ /   ___/ / / / / / /_/ /  __/ /       
/_/ |_/_/\\__/_/_  \\____/   /____/_/ /_/_/ .___/\\___/_/      __
  ___  ____  / /_  ____ _____  ________/_/___/ /  ___  ____/ /
 / _ \\/ __ \\/ __ \\/ __ \`/ __ \\/ ___/ _ \\/ __  /  / _ \\/ __  / 
/  __/ / / / / / / /_/ / / / / /__/  __/ /_/ /  /  __/ /_/ /  
\\___/_/ /_/_/ /_/\\__,_/_/ /_/\\___/\\___/\\__,_/   \\___/\\__,_/ `, "font-family:monospace");

console.log(chalk`{magenta [Nitro Sniper]} {cyan (INFO)} {blueBright Welcome!}`);
console.log(chalk`{magenta [Nitro Sniper]} {cyan (INFO)} {blueBright Running version} {blueBright.bold ${version}}{blueBright .}`);
console.log(chalk`{magenta [Nitro Sniper]} {cyan (INFO)} {redBright This program is licensed under GPL-3.0-or-later and provided free of charge at https://github.com/GiorgioBrux/nitro-sniper-enhanced.}`);
if (webhookUrl != null) {
    const webhooktoken = /[^/]*$/.exec(webhookUrl)[0];
    const webhookid = webhookUrl.replace(/^.*\/(?=[^\/]*\/[^\/]*$)|\/[^\/]*$/g, '');
    const webhookclient = new WebhookClient(webhookid, webhooktoken);
    if (webhooktoken == null || webhookid == null || webhooktoken.length < webhookid.length || !/https:\/\/(ptb\.|canary\.|)(discordapp|discord)\.com\/api\/webhooks\/[0-9]+\/.+/g.test(webhookUrl)){
        console.log(chalk`{magenta [Nitro Sniper]} {rgb(242,46,46) (ERROR)} {red The webhook url is not valid. Skipping...}`);
        webhookUrl = null;
    }
    else
        console.log(chalk`{magenta [Nitro Sniper]} {cyan (INFO)} {blueBright Using webhook with id: [${webhookid}] and token: [${webhooktoken}].}`);

    function send_webhook(res_type, guild, giver, tokenname, timetaken, code, msgurl) {
        const embed = new RichEmbed()
            .setTitle(`Sniped successfully!`)
            .setColor('#1ce829')
            .addField('Where', `${guild}`, true)
            .addField('Account used', `${tokenname}`, true)
            .addField('Giver', `${giver}`, true)
            .addField('Time taken', `${timetaken}`, true)
            .addField('Type of sub', `${res_type}`, true)
            .addField('Giftcode', `${code}`, true)
            .addField('​',`[Click here for the message.](${msgurl})`,false);
        webhookclient.send( '', {
            username: 'Nitro Sniper',
            avatarURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS0JCyNz1WwaTkXB3jcr0MlMLIwXAsHjhoIRw&usqp=CAU',
            embeds: [embed]
        }).catch(err => {
            console.log(chalk`{magenta [Nitro Sniper]} {rgb(242,46,46) (ERROR)} {red Tried to send webhook embed but got error: ${err}.}`);
        });
    }

}
if (!tokens || tokens.length === 0) {
    console.log(chalk`{magenta [Nitro Sniper]} {rgb(242,46,46) (FATAL ERROR)} {red There is no token to login to, please check your configuration.}`);
    console.log(chalk`{magenta [Nitro Sniper]} {rgb(242,46,46) (FATAL ERROR)} {red Quitting...}`);
    process.exit();
}
if (useMain === undefined)
    console.log(chalk`{magenta [Nitro Sniper]} {yellowBright (WARNING)} {rgb(255,245,107) useMain is undefined. Defaulting to false.}`);

for (const token of tokens) {
    const client = new Client({
        disabledEvents: [
            "GUILD_UPDATE",
            "GUILD_MEMBER_ADD",
            "GUILD_MEMBER_REMOVE",
            "GUILD_MEMBER_UPDATE",
            "GUILD_MEMBERS_CHUNK",
            "GUILD_ROLE_CREATE",
            "GUILD_ROLE_DELETE",
            "GUILD_ROLE_UPDATE",
            "GUILD_BAN_ADD",
            "GUILD_BAN_REMOVE",
            "CHANNEL_UPDATE",
            "CHANNEL_PINS_UPDATE",
            "MESSAGE_DELETE",
            "MESSAGE_UPDATE",
            "MESSAGE_DELETE_BULK",
            "MESSAGE_REACTION_ADD",
            "MESSAGE_REACTION_REMOVE",
            "MESSAGE_REACTION_REMOVE_ALL",
            "USER_UPDATE",
            "USER_NOTE_UPDATE",
            "USER_SETTINGS_UPDATE",
            "PRESENCE_UPDATE",
            "VOICE_STATE_UPDATE",
            "TYPING_START",
            "VOICE_SERVER_UPDATE",
            "RELATIONSHIP_ADD",
            "RELATIONSHIP_REMOVE",
        ]
    });

    client.on('message', async msg => {
        let codes = msg.content.match(regex);
        if (!codes || codes.length === 0) return;
        for (let code of codes) {
            let start = new Date();

            code = code.replace(/(discord\.gift\/|discord\.com\/gifts\/|discordapp\.com\/gifts\/)/gmi, '');
            let code_no_symbols = code.replace(/\W/g, '');
            let code_no_obfuscation = code.replace(/\W.*$/g, '');
            if (code_no_symbols !== code_no_obfuscation) {
                if (code_no_symbols.length > 26 && code_no_symbols.length < 16) code = code_no_symbols;
                else if (code_no_obfuscation.length > 26 && code_no_obfuscation < 16) code = code_no_obfuscation;
            }
            const numeric = code.replace(/[^0-9]/g, "").length;
            const lowercase = code.replace(/[^a-z]+/g, "").length;
            const uppercase = code.replace(/[^A-Z]+/g, "").length;

            if (code.length > 26 || code.length < 16 || (numeric - lowercase - uppercase) > 8) { //Error over 8 is statistically very unlikely for a true code.
                return console.log(chalk`{magenta [Nitro Sniper]} {rgb(28,232,41) [+]} {rgb(137,96,142) Sniped ${code} - Fake Code - ${msg.guild ? msg.guild.name : "DM"} from ${msg.author.tag}.}`);
            }

            if (usedTokens.includes(code)) return console.log(chalk`{magenta [Nitro Sniper]} {rgb(28,232,41) [+]} {rgb(255,228,138) Sniped ${code} - Already checked - Seen in ${msg.guild ? msg.guild.name : "DM"} from ${msg.author.tag}.}`);
            phin({
                url: `https://discord.com/api/v6/entitlements/gift-codes/${code}/redeem`,
                method: 'POST',
                parse: 'json',
                headers: {
                    "Authorization": mainToken,
                    "User-Agent": userAgent
                }
            }, (err, res) => {
                let end = `${new Date() - start}ms`;
                if (err) {
                    console.log(chalk`{magenta [Nitro Sniper]} {rgb(242,46,46) (ERROR)} {red Tried to redeem code (${code}) but got connection error: ${err}.}`);
                } else if (res.body.message === '401: Unauthorized') {
                    console.log(chalk`{magenta [Nitro Sniper]} {rgb(242,46,46) (ERROR)} {red Tried to redeem code (${code}) but the main token is not valid.}`);
                } else if (res.body.message === "This gift has been redeemed already.") {
                    console.log(chalk`{magenta [Nitro Sniper]} {rgb(28,232,41) [+]} {rgb(255,228,138) Sniped ${code} - Already redeemed - ${msg.guild ? msg.guild.name : "DM"} from ${msg.author.tag} - ${end}.}`);
                    usedTokens.push(code);
                } else if ('subscription_plan' in res.body) {
                    console.log(chalk`{magenta [Nitro Sniper]} {rgb(28,232,41) [+]} {rgb(28,232,41) Sniped ${code} - Success! - ${res.body.subscription_plan.name} - ${msg.guild ? msg.guild.name : "DM"} from ${msg.author.tag} - ${end}.}`);
                    usedTokens.push(code);
                    if (webhookUrl !== null) send_webhook(res.body.subscription_plan.name, (msg.guild ? msg.guild.name : "DMs"), msg.author.tag, client.user.tag, end, code, msg.url);
                } else if (res.body.message === "Unknown Gift Code") {
                    console.log(chalk`{magenta [Nitro Sniper]} {rgb(28,232,41) [+]} {redBright Sniped ${code} - Invalid - ${msg.guild ? msg.guild.name : "DM"} from ${msg.author.tag} - ${end}.}`);
                    usedTokens.push(code);
                }
            })
        }
    })

    client.on('ready', () => {
        if (token === mainToken) console.log(chalk`{magenta [Nitro Sniper]} {cyan (INFO)} {blue Main token valid: ${client.user.tag} - Sniping in ${client.guilds.size} servers.}`)
        else console.log(chalk`{magenta [Nitro Sniper]} {cyan (INFO)} {cyan Slave logged in as ${client.user.tag} - Sniping in ${client.guilds.size} servers.}`)

    })
    /*
    client.on('error', error => {
        console.log(chalk`{magenta [Nitro Sniper]} {rgb(242,46,46) (ERROR)} {red Token [${token.substring(0, 10)}...] encountered a connection error: ${error}.}`);
    })
    client.on('reconnecting', () => {
        console.log(chalk`{magenta [Nitro Sniper]} {cyan (INFO)} {rgb(255,245,107) Attempting to reconnect token [${token.substring(0, 10)}...]}.`);
    })
    client.on('resume', () => {
        console.log(chalk`{magenta [Nitro Sniper]} {cyan (INFO)} {blueBright Token [${token.substring(0, 10)}...] reconnected successfully!}`);
    })
     */
    setTimeout(() => {
        client.login(token)
            .catch(function (err) {
                if (token === mainToken) {
                    console.log(chalk`{magenta [Nitro Sniper]} {rgb(242,46,46) (FATAL ERROR)} {red Main token not valid: ${err}.}`)
                    console.log(chalk`{magenta [Nitro Sniper]} {rgb(242,46,46) (FATAL ERROR)} {red Quitting...}`)
                    process.exit();
                } else {
                    console.log(chalk`{magenta [Nitro Sniper]} {rgb(242,46,46) (ERROR)} {red Skipping slave token "${token.substring(0, 10)}...": ${err}.}`)
                    clearTimeout();
                }
            })
    }, Math.floor(Math.random() * ((1100 * tokens.length) - 500 + 1)) + 500)
}
