// SlashCommandBuilder という部品を discord.js からインポートしています。
// これにより、スラッシュコマンドを簡単に構築できます。
const {SlashCommandBuilder} = require('discord.js');
const prisma = require('../prisma')
// 以下の形式にすることで、他のファイルでインポートして使用できるようになります。
module.exports = {
    data: new SlashCommandBuilder()
        .setName('make-alias')
        .setDescription('新規エイリアスを設定します')
        .addStringOption(option =>
            option
                .setName("alias")
                .setDescription('alias名を指定します')
                .setRequired(true) //trueで必須、falseで任意
        )
    ,
    execute: async function (interaction) {
        console.log(interaction.options.getString('alias'))
        console.log()
        console.log(interaction.user.id)

        const newRole = await interaction.guild.roles.create(
            {
                name: interaction.options.getString('alias'),
                reason: interaction.user.tag + 'が新しいエイリアスを必要としたため。',
            }
        )
        await interaction.member.roles.add(newRole)
        await prisma.alias.create(
            {data:
                    {
                        roleId:newRole.id,
                        memberId:interaction.user.id,
                        guildId:newRole.guild.id,

                }
            }
        )

        //console.log(list)

        await interaction.reply(interaction.member.displayName+"さんの新しいエイリアス :"+newRole.toString()+"を作成しました。");
    },
}
