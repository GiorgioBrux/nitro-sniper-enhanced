# Nitro Sniper Enhanced [![CodeFactor](https://www.codefactor.io/repository/github/giorgiobrux/nitro-sniper/badge)](https://www.codefactor.io/repository/github/giorgiobrux/nitro-sniper-enhanced) ![GitHub issues](https://img.shields.io/github/issues/giorgiobrux/nitro-sniper-enhanced) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
<img alt="img" align="right" src="https://user-images.githubusercontent.com/18328525/92536909-19ea5000-f23b-11ea-8fb7-524b4ba22f26.png">
Snipes nitro gift codes; with alt-support.<br>
Original project by hellbound1337.

# Features
- Beautiful colors to quickly see if something important happened.
- Multi-token support
- Notifications work if you don't use your main token for sniping.
- Removes non-alphanumeric chars automatically from codes and tries to redeem.
- Auto-detects obvious fake codes.
# Installation methods
#### Heroku (recommended)
Click on the image below and login to continue the setup.  
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/giorgiobrux/nitro-sniper/tree/master)  
#### Local
- Make sure [Node](https://nodejs.org/en/) is installed on your system and open a command prompt/terminal.
- Run `git clone https://github.com/giorgiobrux/nitro-sniper-enhanced nitro-sniper`
- Run `cd nitro-sniper`
- Run `npm install`
- Edit the dotenv file. <br>
    - To insert multiple tokens in the guildTokens variable, use `,` as a separator. <br> 
    - The useMain can be either true or false. If it's false the mainToken won't be checked to avoid destroying it.
- Run `node .`
#### Docker
Public image soon™.

# Tips
- The less the latency to discord servers, the better; You could be competing with other snipers.
- This is technically a self-bot, even mentioning to have this on discord is enough to make you reportable.
