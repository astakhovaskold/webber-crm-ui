/**
 * Created by ASTAKHOV A.A. on 02.04.2022
 */

const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const port = import.meta.env.PORT || 8080;

// здесь у нас происходит импорт пакетов и определяется порт нашего сервера
const app = express();
app.use(favicon(__dirname + '/build/favicon.ico'));

// static
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));

// html
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port);
