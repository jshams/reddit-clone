module.exports = (app) => {
  const Post = require('../models/post');

  app.get("/", (req, res) => {
    var currentUser = req.user;
  
    Post.find({})
      .then(posts => {
        res.render("posts-index", { posts, currentUser });
      })
      .catch(err => {
        console.log(err.message);
      });
  });

  app.get('/posts/new', (req, res) => {
    res.render('posts-new');
  })

  app.get("/posts/:id", function(req, res) {
    // LOOK UP THE POST
    // LOOK UP THE POST
    Post.findById(req.params.id).populate('comments').then((post) => {
      res.render('post-show', { post })
    }).catch((err) => {
      console.log(err.message)
    })
  });

  // SUBREDDIT
  app.get("/n/:subreddit", function(req, res) {
    Post.find({ subreddit: req.params.subreddit })
      .then(posts => {
        res.render("posts-index", { posts });
      }).catch(err => {
        console.log(err);
      });
  });

  // CREATE
app.post("/posts/new", (req, res) => {
  if (req.user) {
    const post = new Post(req.body);

    post.save(function(err, post) {
      return res.redirect(`/`);
    });
  } else {
    return res.status(401); // UNAUTHORIZED
  }
});

};
