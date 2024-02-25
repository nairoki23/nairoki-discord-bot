const{REST, Routes } = require('discord.js');


const { token,client_id } = require('./discord_env.json');


//新コマンド登録
const fs = require('node:fs');
const commands = [];
// commandsフォルダから、.jsで終わるファイルのみを取得
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
}


// 登録コマンドを呼び出してリスト形式で登録
/*旧コマンド登録
const heyFile = require('./commands/hey.js');
const alias_list = require('./commands/alias_list');
const make_alias = require('./commands/make_alias');
const commands = [heyFile.data.toJSON(),alias_list.data.toJSON(),make_alias.data.toJSON()];
*/


const rest = new REST({ version: '10' }).setToken(token);

try {
  console.log('Started refreshing application (/) commands.');

  rest.put(Routes.applicationCommands(client_id), {body: commands}).then(r =>  console.log('Successfully reloaded application (/) commands.'));
} catch (error) {
  console.error(error);
}
