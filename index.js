const restify = require('restify');
const { BotFrameworkAdapter } = require('botbuilder');

// Crear el adaptador del bot
const adapter = new BotFrameworkAdapter({
    appId: process.env.MicrosoftAppId || '',
    appPassword: process.env.MicrosoftAppPassword || ''
});

// Crear el servidor
const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, () => {
    console.log(`Bot escuchando en http://localhost:3978`);
});

// Manejar mensajes
server.post('/api/messages', async (req, res) => {
    await adapter.processActivity(req, res, async (context) => {
        if (context.activity.type === 'message') {
            await context.sendActivity(`Hola, dijiste: "${context.activity.text}"`);
        }
    });
});
