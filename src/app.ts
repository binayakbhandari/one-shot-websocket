import express from 'express';
const app = express();
import ('./todo/todoController.js')

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('home.ejs')
})

export default app; 