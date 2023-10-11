// expressモジュール読み込み
const express = require('express')
// dotenvモジュール読み込み
const dotenv = require('dotenv')

// dotenvの設定読み込み
dotenv.config()
const HOST = process.env.HOST
const PORT = process.env.PORT

// サーバ作成
const app = express()

// ミドルウェアの設定
// publicフォルダを静的コンテンツのフォルダに設定
app.use(express.static(__dirname + '/public'))

// URLエンコード
app.use(express.urlencoded({ extended: true }))

// GETリクエストの処理
app.get('/', (req, res) => {
    // リクエストの処理
    console.log(req.body)
    console.log(req.url)
    console.log(req.query)

    // レスポンスの処理
    res.send('Hello!!!!!!')
})

app.get('/profile', (req, res) => {
    res.send('プロフィール')
})

// POSTリクエスト
app.post('/auth', (req, res) => {
    // POSTデータ取得
    var loginName = req.body.login_name
    var password = req.body.password
    console.log(loginName, password)

    var message = "ログイン失敗"
    // .env で設定した値で、ログインチェック
    // TODO：データベースに接続してユーザ取得
    // TODO：パスワードはハッシュ値でチェック
    if (loginName == process.env.LOGIN_NAME
        && password == process.env.PASSWORD) {
            message = "ログイン成功"
        //TODO ログインが成功したらユーザの状態を保存
        //TODO ログイン後のページの転送
    } else {
        // TODO ログイン画面に戻す
    }
    res.send(message)
})

//　サーバ停止: 起動中のターミナルで Ctrl + C
// サーバ待機（Listen）
app.listen(PORT, HOST, () => {
    console.log(HOST)
    console.log(PORT)
    console.log('wait...')
})
