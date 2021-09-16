const router = require('express').Router();
const {Post, User, Comment} = require('../../models');
const withAuth = require('../../utils/auth');

//get all of the posts
router.get('/', (req, res)=> {
    Post.findAll({
        attributes: ['id', 'title', 'content', 'user_id', 'username'], 
        include: [{
            model: Comment, 
            attributes: ['comment_text', 'user_id']
        }]
    }).then((Data) => {
        res.json(Data);
    });
});

//get one post
router.get('/:id', (req, res)=> {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'title', 'content', 'user_id'], 
        include: [{
            model: Comment, 
            attributes: ['comment_text', 'user_id']
        }]
    })  .then((Data) => {
        if (!Data) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(Data);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  //create a post
  router.post('/', withAuth, (req, res)=> {
      console.log(req.body.title);
      console.log(req.body.content);
      console.log(req.session.user_id)
      Post.create({
          title: req.body.title,
          content: req.body.content, 
          user_id: req.session.user_id,
          username: req.session.username
      }).then((Data) => {
        res.json(Data);
      }).catch((err) => {
        res.status(500).json(err);
      });
  });
 
  //update a post 
  router.put('/:id', (req, res) => {
      Post.update({
    title: req.body.title,
    content: req.body.content
  },
  {
    where: {
      id: req.params.id,
    }
  }
)
  .then((Data) => res.json(Data))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

//delete a post
router.delete('/:id', (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        },
    })
        .then((Data) => {
            if (!Data) {
              res.status(404).json({ message: 'No post found with this id' });
              return;
            }
            res.json(Data);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      });
      
module.exports = router;