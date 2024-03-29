const ZoopoClient = require('./src/ZoopoClient'),
    Config = require('./Config.json'),
    Zoopo = new ZoopoClient(Config.token, Config.ZoopoOptions, Config);

const Init = async () => {
    Zoopo.loadCommands(__dirname + '/src/Commands');
    Zoopo.loadEvents(__dirname + '/src/Events');
    await Zoopo.connectDatabase();

    Zoopo.connect();
};

Init(); 

// Up time thingeeee
/*
const http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('ok');
}).listen(25569);
*/

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '0x';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const app = require('express')();
const bodyParser = require('body-parser');
const fetch = require('node-fetch').default;

// Uptime
app.get('/', (req, res) => {
    res.status(200).send('ok');
});

// Votes
app.post('/vote', bodyParser.json(), (req, res) => {
    // console.log(req.headers, req.body);
    const { authorization } = req.headers;
    const { bot, user } = req.body;
    if(authorization != Config['top.gg_auth']) {
      console.log(`No auth from ${req.headers['user-agent']}, auth: ${authorization}`);
      return res.status(400).send('Wrong auth :sob:');
    };
    const howMany = Math.floor(Math.random() * 3000); 
    // Wassup <@!${user}>, Thank you for voting for Zoopo, You earned ${howMany} points!
    Zoopo.createMessage('779441136719757323', {
      content: `<@!${user}>`,
      embed: {
        description: `Thank you for voting for me!`,
        fields: [
          {
            name: 'Points gained',
            value: `${howMany}`,
            inline: true
          },
          {
            name: 'Vote link',
            value: '[Click ME](https://top.gg/bot/807048838362955798/vote)',
            inline: true
          }
        ],
        color: Number(getRandomColor())
      }
    })
    // console.log(user)
    // 

    fetch('https://afk.monkedev.com/points/add', { method: 'POST', headers: { userid: user, howmany: howMany, auth: Config.adminKey }});
    res.status(200).send('ok');
});

const port = process.env.PORT || 25569;
app.listen(port, () => console.log('On port: ' + port));

// Server count 
setInterval(() => {
  fetch('https://top.gg/api/bots/807048838362955798/stats', {
    method: 'POST',
    body: JSON.stringify({
      server_count: Zoopo.guilds.size,
      shard_count: Zoopo.shards.size
    }),
    headers: {
      Authorization: Config['top.gg_token'],
      'Content-Type': 'application/json'
    }
  });
}, 1000 * 60); // 1 min