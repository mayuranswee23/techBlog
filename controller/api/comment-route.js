const router = require('express').Router();
const {Post, User, Comment} = require('../../models');

//get all of the comments
router.get('/', (req, res)=> {
    Comment.findAll({
        attributes: ['id', 'comment_text', 'user_id', 'post_id'], 
        include: [{
            model: User, 
            attributes: ['username']
        }]
    }).then((Data) => {
        res.json(Data);
      }).catch((err) => {
        res.status(500).json(err);
      });
  });

//get one comment
router.get('/:id', (req, res)=> {
    Comment.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'comment_text', 'user_id', 'post_id'], 
        include: [{
            model: User, 
            attributes: ['username']
        }]
    })  .then((Data) => {
        if (!Data) {
          res.status(404).json({ message: 'No comment found with this id' });
          return;
        }
        res.json(Data);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  //create a comment
  router.post('/', (req, res)=> {
      Comment.create({
          comment: req.body.comment_text,
          user_id: req.session.user_id,
          post_id: req.body.post_id,
      }).then((Data) => {
        res.json(Data);
      }).catch((err) => {
        res.status(500).json(err);
      });
  });
 
  //update a comment 
  router.put('/:id', (req, res) => {
      Comment.update({
        comment: req.body.comment_text
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
    Comment.destroy({
        where: {
            id: req.params.id
        },
    })
        .then((Data) => {
            if (!Data) {
              res.status(404).json({ message: 'No comment found with this id' });
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