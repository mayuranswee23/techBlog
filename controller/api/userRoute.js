const router = require('express').Router();
const {User, Post, Comment} = require('../../models');

//get all users
router.get('/', (req, res) => {
    User.findAll({
        attributes: {exclude: ['password']},
    })
    .then((Data) => res.json(Data))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//get by id
router.get('/:id', (req, res) => {
    User.findOne({
      attributes: { exclude: ['password'] },
      where: {
        id: req.params.id,
      },
      include: [
        {
            model: Post, 
            attributes: ['id', 'title', 'content']
        },
        {
            model: Comment,
            attributes: ['id', 'comment_text']
        }
      ],
    })
      .then((Data) => {
        if (!Data) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(Data);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });


// create user
router.post('/', (req, res) => {
    console.log(req.body);
    User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    })
      .then((Data) => {
        res.json(Data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });

  //log user and validate password
  router.post('/login', (req, res) => {
    console.log(req.body);
    User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((Data) => {
      console.log(Data);
      if (!Data) {
        res.status(400).json({ message: 'No user with that email address!' });
        return;
      }
  
      const validPassword = Data.checkPassword(req.body.password);
      console.log(validPassword);
      if (!validPassword) {
        res.status(400).json({ message: 'Incorrect password!' });
        return;
      }
  
      req.session.save(() => {
        req.session.user_id = Data.id;
        req.session.username = Data.username;
        req.session.loggedIn = true;
  
        res.status(200).json({ user: Data, message: 'You are now logged in!' });
      });
    });
  });

  //logout
  router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });

  module.exports = router;