const router = require('express').Router();
const {User, Post, Comment} = require('../models');

//get all posts
router.get('/', (req, res) => {
    Post.findAll({
        attributes: ['id', 'title', 'content', 'user_id'], 
        include: [{
            model: Comment, 
            attributes: ['comment_text', 'user_id']
        }]
    })
    .then(Data => {
        const posts = Data.map(post => post.get({ plain: true }));
        res.render('homepage', { 
            posts,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//login 
router.get('/login', (req, res) => {
    // if (req.session.loggedIn){
    //     res.redirect('/login');
    //     return;
    // }
    res.render('login');
});

//create a post
router.get('/createpost', (req, res) => {
    res.render('createpost', {loggedIn: req.session.loggedIn});
});

//show single post
router.get('/post/:id', (req, res)=> {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'title', 'content', 'user_id'], 
        include: [{
            model: Comment, 
            attributes: ['comment_text', 'user_id']
        }, 
        {
            model: User, 
            attributes: ['username']
        }]
    })  .then((Data) => {
        if (!Data) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        const post = Data.map(post => post.get({ plain: true }));
        res.render('single-post', {post});
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.get('/:id', (req, res)=> {
    Comment.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'comment_text', 'user_id', 'post_id'], 
    })  .then((Data) => {
        if (!Data) {
          res.status(404).json({ message: 'No comment found with this id' });
          return;
        }
        const comment = Data.get({ plain: true });
        res.render('single-post', {comment});
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });


router.get('/logout', (req, res) => {
    res.render('homepage');
});

router.get('/:id', (req, res) => {
    res.render('single-post');
});

router.get('/updatepost', (req, res) => {
    res.render('updatepost');
});

router.get('/comments', (req, res) => {
    res.render('single-post');
});

module.exports = router;