# 我的記帳簿 Expense Tracker
![MyImage](https://github.com/newm1n/ac-expense-tracker/blob/main/public/image/A3.png)
## 介紹
紀錄自己的花費。
## Features功能
•	使用者可註冊帳號或連結Facebook登入
• 新增、編輯、瀏覽或刪除支出明細
•	依照類別搜尋該項目支出明細、該項目總花費
## Install安裝與使用
1. 請先確認有安裝 node.js, npm 與 nodemon，並將專案 clone 到本地
2. 在本地開啟之後，透過終端機進入資料夾，輸入：

```
npm install
```

3.	安裝完畢後，輸入：
```
npm run start
```
4.	若看見此行訊息則代表順利運行，打開瀏覽器進入到以下網址
```
App is running on http://localhost:3000
```
5.	若欲暫停使用
```
ctrl + c
```
6.	匯入種子資料
```
npm run seed
```
7.	終端機出現下列字樣，表示種子資料執行完畢
```
mongodb connected!
categorySeeder done.
mongodb connected!
recordSeeder done
```
