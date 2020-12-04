const express = require("express");
const rbx = require("noblox.js");
const app = express();
const Discord = require('discord.js');
const client = new Discord.Client();
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
 
const adapter = new FileSync('db.json')
const db = low(adapter)
 
// Set some defaults
db.defaults({ posts: [], user: {} })
  .write()
 
app.use(express.static("public"));

app.get("/status", (req, res) => {
   res.json({"Status": "Update"})
});
app.get("/API/blacklist", (req, res) => {
   var gameId = req.param("cmd");
  if (db.get(`Banlist ${gameId}`).value() == true) {
    res.json({"Status": "true"})
  } else {
    res.json({"Status": "false"})
  }
});
//res.write(`{"Sucess": "Now You See Me, Now You Don't Ding ding it worked"}`);

app.get("/API/cmdlog", (req, res) => {
    var Command = req.param("cmd");
    var Token = req.param("token");
    var State = req.param("response");
    res.json("Logged Successfully");
  
});

app.get("/API/setcmd", (req, res) => {
  var Discord = req.param("discord");
    var Token = req.param("token");
    var Command = req.param("cmd");
  db.set(`${Discord} ${Token} Command ${Command}`).write()
    res.json("Logged Successfully");
  
});
app.get("/", (req, res) => {
    var Token = req.param("token");
    var Command = req.param("cmd");
    var s = "" + Command
    var t = "" + Token
    res.json({"Token": t, "Command": s});
  
});
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

client.on('ready', () => {
    setInterval(() => {
        client.user.setActivity("ds!help | ds!invite", { type: 'LISTENING' });
    }, 20000);
    console.log("Successfully logged in!");
});

