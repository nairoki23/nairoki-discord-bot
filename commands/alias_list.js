// SlashCommandBuilder という部品を discord.js からインポートしています。
// これにより、スラッシュコマンドを簡単に構築できます。
const {SlashCommandBuilder} = require('discord.js');
const prisma = require('../prisma')
// 以下の形式にすることで、他のファイルでインポートして使用できるようになります。
module.exports = {
  data: new SlashCommandBuilder()
    .setName('alias_list')
    .setDescription('設定しているエイリアスのリストを表示します'),
  execute: async function (interaction) {
    console.log(Number(interaction.member.id))
    const list = await prisma.alias.findMany({where: {memberId: Number(interaction.member.id)}});

    console.log(list)
    await interaction.reply('syori_finish');
  },
}
