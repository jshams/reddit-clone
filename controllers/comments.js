const User = require('../models/user');

module.exports = function(app) {
  const Post = require('../models/post');
  const Comment = require('../models/comment');
  // CREATE Comment
  app.post("/posts/:postId/comments", function(req, res) {
    // INSTANTIATE INSTANCE OF MODEL
    const comment = new Comment(req.body);
    comment.author = req.user._id;
    // SAVE INSTANCE OF Comment MODEL TO DB
    comment.save()
      .then(comment => {
        req.user.comments.unshift(comment);
        req.user.save();
        return Post.findById(req.params.postId);
      })
      .then(post => {
        post.comments.unshift(comment);
        return post.save();
      })
      .then(() => {
        res.redirect('/');
      })
      .catch(err => {
        console.log(err);
      });
  });

};
