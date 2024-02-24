const{REST, Routes } = require('discord.js');


const { token,client_id } = require('./discord_env.json');
const heyFile = require('./commands/hey.js');
const alias_list = require('./commands/alias_list');

// 登録コマンドを呼び出してリスト形式で登録
const commands = [heyFile.data.toJSON(),alias_list.data.toJSON()];
//console.log(commands)
//↑エラー発生しているみたいに見えるから消した
const rest = new REST({ version: '10' }).setToken(token);

try {
  console.log('Started refreshing application (/) commands.');

  rest.put(Routes.applicationCommands(client_id), {body: commands}).then(r =>  console.log('Successfully reloaded application (/) commands.'));
} catch (error) {
  console.error(error);
}
