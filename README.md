# discord-nairoki-bot
## 以下開発者向けメモ
### スラッシュコマンドを追加したい時
1. deploy-commands.jsとmain.jsに処理を書いてください。
2. deploy-commands.jsを実行してください。
3. 多分完了です。
### デプロイする時
1. `.env.example`と`discord_env.json.example`を/examplesからrootなdirにcpしてください。
2. 適切な環境変数を書いてください。
3. `node deploy-commands.js`してスラッシュコマンドたちを登録してください。
4. `node main.js`すれば多分動きます。
