const { Client, GatewayIntentBits } = require('discord.js');
const mySecret = process.env['token']

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const prefix = '/';

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  if (message.content.startsWith(prefix + 'calculate')) {
    const expression = message.content.slice(prefix.length + 'calculate'.length).trim();

    try {
      const result = eval(expression);
      await message.reply(`Result: ${result}`);
    } catch (error) {
      await message.reply('Error: Invalid calculation');
    }
  }
});

client.login(mySecret);
