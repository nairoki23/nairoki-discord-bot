// discord.jsライブラリの中から必要な設定を呼び出し、変数に保存します
const {Client, Events, GatewayIntentBits} = require('discord.js');
const {PrismaClient} = require('@prisma/client')


// hey.jsのmodule.exportsを呼び出します。
const heyFile = require('./commands/hey.js');
const alias_list = require('./commands/alias_list');
const make_alias = require('./commands/make_alias');


// 設定ファイルからトークン情報を呼び出し、変数に保存します
const {token} = require('./discord_env.json');

// クライアントインスタンスと呼ばれるオブジェクトを作成します
const client = new Client({intents: [GatewayIntentBits.Guilds]});

// クライアントオブジェクトが準備OKとなったとき一度だけ実行されます


const prisma = new PrismaClient()

client.once(Events.ClientReady, c => {


  console.log(`LoginSuccess`);


});


client.on(Events.InteractionCreate, async interaction => {

  // スラッシュ以外のコマンドの場合は対象外なので早期リターンさせて終了します
  // コマンドにスラッシュが使われているかどうかはisChatInputCommand()で判断しています
  if (!interaction.isChatInputCommand()) return;

  // heyコマンドに対する処理
  try {
    if (interaction.commandName === heyFile.data.name) {
      await heyFile.execute(interaction);
    } else if (interaction.commandName === alias_list.data.name) {
      await alias_list.execute(interaction)
    }else if (interaction.commandName === make_alias.data.name) {
      await make_alias.execute(interaction)
    }
    else {
      console.error(`${interaction.commandName}というコマンドには対応していません。`);
    }
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {// ||←はor
      await interaction.followUp({content: 'コマンド実行時にエラーになりました。', ephemeral: true});
    } else {
      await interaction.reply({content: 'コマンド実行時にエラーになりました。', ephemeral: true});
    }
  }


})


// ログインします
client.login(token);
