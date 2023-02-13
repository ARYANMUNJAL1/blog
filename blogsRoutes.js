const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended:true}));

const methodOverride = require('method-override');
app.use(methodOverride('_method'))

let Blog = [
    {
        id: 0,
        username: "Aryan",
        blog: "Welcome to my blog, I am a Software Developer."
    },
    {
        id: 1,
        username: "Tarun",
        blog: "You are doing wonderful."
    },
    {
        id: 2,
        username: "Anurag",
        blog: "This blog is about Web Dev."
    }
]

app.get('/', (req, res) => {
    res.send("Root Page");
})

// display all the blogs
app.get('/blogs', (req, res) => {
    res.render('index', {Blog});
})

// new blogs creation
app.get('/blogs/new', (req, res) => {
    res.render('new');
})

// add new blog to database, and redirect
app.post('/blogs', (req, res) => {
    const blogo = {
        id:Blog.length,
        ...req.body
    }

    // console.log(blogo);
    Blog.push(blogo);
    res.redirect('/blogs');
})

// information of any one blog
app.get('/blogs/:id', (req, res) => {
    const {id} = req.params;
    const foundBlog = Blog.find((b) => b.id === parseInt(id));
    res.render('show', {foundBlog});
})

// edit a blog
app.get('/blogs/:id/edit', (req, res) => {
    const {id} = req.params;
    const getBlog = Blog.find((b) => b.id === parseInt(id));
    res.render('edit', {getBlog});    
})

// update the blog
app.patch('/blogs/:id', (req, res) => {
    // console.log(req.body);
    const {id} = req.params;
    const originalBlog = Blog.find((b) => b.id === parseInt(id));

    const newBlog = req.body;
    originalBlog.username = newBlog.username;
    originalBlog.blog = newBlog.blog;
    res.redirect('/blogs');
})

// delete the blog
app.delete('/blogs/:id', (req, res) => {
    const {id} = req.params;
    const newBlogs = Blog.filter((b) => b.id !== parseInt(id));

    Blog = newBlogs;
    res.redirect('/blogs');
    // console.log(newBlogs);
})

app.listen(4300, ()=>{
    console.log("Server is listening from port 4300");
})