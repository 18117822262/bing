const express = require('express');
const path = require('path');

const app = express();

// 设置视图引擎
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 静态文件
app.use(express.static(path.join(__dirname, 'public')));

// 错误处理中间件
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// 路由
app.get('/', (req, res) => {
    try {
        res.render('index', {
            title: '欢迎来到槟城',
            categories: [
                {
                    name: '旅游景点',
                    description: '探索槟城的美丽景点'
                },
                {
                    name: '美食佳肴',
                    description: '品尝地道美食'
                },
                {
                    name: '住宿酒店',
                    description: '寻找理想住宿'
                }
            ]
        });
    } catch (error) {
        console.error('Error rendering index:', error);
        res.status(500).send('Error rendering page');
    }
});

// 404处理
app.use((req, res) => {
    res.status(404).send('Page not found');
});

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    console.log('Press Ctrl+C to stop');
});

module.exports = app; 