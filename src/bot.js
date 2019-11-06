const Discord = require("discord.js");
const client = new Discord.Client();
const config = require('./config.json');
const fs = require('fs');

const prof = require('./profile.json');
const chn = require('./channel.json');
const usr = require('./user.json');

var Sequelize = require('sequelize');
var sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  storage: 'src/database.sqlite'
});

var User = sequelize.define('user', {
  username: Sequelize.STRING
});

const ta = require('./textAnalysis');

client.on("ready", () => { });

client.on("message", (message) => {
  if(message.author.bot) return;

  let prefix = config.prefix;

  async function getSentiment() {
    const sent = await ta.analyzeSentence(message.content);

    chn.messages.push({
      "id": message.author.id,
      "sentiment": sent,
      "time": message.createdAt
    })

    fs.writeFile('./src/channel.json', JSON.stringify(chn), 'utf8', function (err) {
      if (err) return console.log(err);
      console.log("The file was saved!");
    });
  }

  getSentiment();

  if (message.content.startsWith(prefix + "chatmood")) {
    let scores = 0;
    let i = 0;
    for (i = 0; i < chn.messages.length; i++) {
      scores += chn.messages[i].sentiment;
    }
    message.reply(Math.round(scores/(i+1)*100)/100);
  }
  
  if (message.content.startsWith(prefix + 'profile')) {
    console.log(prof.profiles);
    const profID = prof.profiles.find((element) => {
      if (element.id === message.author.id) {
        return element;
      }
    })

    if (profID) {
      let embed = new Discord.RichEmbed();

      embed.setTitle(message.author.username);
      embed.addField('Favorite Game', profID.interest);
      embed.setThumbnail(message.author.avatarURL);
      embed.addField('Sentiment Coefficient', profID.sentiment);

      message.reply(embed);
    } else {
      message.author.createDM().then((channel) => {
        // Build user profile
        channel.send("What is your favorite game?").then(() => {
          channel.awaitMessages(response => response.content, {
              max: 1,
              time: 20000,
              errors: ['time'],
            })
            .then((collected) => {
              console.log(collected.first().content, "was collected");
              prof.profiles.push({
                "id": message.author.id,
                "interest": collected.first().content,
                "sentiment": 0.5
              });
              fs.writeFile('./src/profile.json', JSON.stringify(prof), 'utf8', function (err) {
                if (err) return console.log(err);
                console.log("The file was saved.");
              });
              message.reply("a profile has been created for you");
            })
            .catch(() => {
              channel.send("no message");
          })
        })
      });
    }
  }

  if (message.content.startsWith(prefix + 'mood')) {
    let i = 0;
    let count = 0;
    let avg = 0;
    for (i = 0; i < chn.messages.length; i++) {
      if (chn.messages[i].id === message.author.id) {
        avg += chn.messages[i].sentiment;
        count++;
      }
    }
    console.log(i, count, avg);
    message.reply(Math.round((avg/count)*100)/100);
  }

  if (message.content.startsWith(prefix + 'analyzetext')) {
    console.log(message.content);
    ta.analyzeSentence(message.content).then((result) => {
      message.reply(Math.round(result*100)/100);
    });
  }
});

function login() {
  client.login(config.TOKEN);
}

module.exports = { login }