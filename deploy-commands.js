const{REST, Routes } = require('discord.js');


const { discord_token,discord_client_id } = require('./env.json');
const heyFile = require('./commands/hey.js');

// 登録コマンドを呼び出してリスト形式で登録
const commands = [heyFile.data.toJSON()];
console.log(commands)

const rest = new REST({ version: '10' }).setToken(discord_token);

try {
  console.log('Started refreshing application (/) commands.');

  rest.put(Routes.applicationCommands(discord_client_id), {body: commands}).then(r =>  console.log('Successfully reloaded application (/) commands.'));
} catch (error) {
  console.error(error);
}
