const ZoopoClient = require('./src/ZoopoClient'),
    Config = require('../Config.json'),
    Zoopo = new ZoopoClient(Config.token, Config.ZoopoOptions, Config);

const Init = async () => {
    Zoopo.loadCommands(__dirname + '/src/Commands');
    Zoopo.loadEvents(__dirname + '/src/Events');
    await Zoopo.connectDatabase();

    Zoopo.connect();
};

Init(); 