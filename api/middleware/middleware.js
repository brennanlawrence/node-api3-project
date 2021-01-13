const User = require("../users/users-model");
const Post = require("../posts/posts-model");

function logger(req, res, next) {
  // do your magic!
  console.log({
    timestamp: new Date(),
    method: req.method,
    url: req.url,
  });
  next();
}

function validateUserId(req, res, next) {
  const { id } = req.params;
  User.getById(id)
    .then((user) => {
      if (!user) {
        console.log(`User with id: ${id}, does not exist.`);
        res.send(`User with id: ${id}, does not exist.`);
      } else {
        console.log(`User, ${user["name"]}, exists.`);
        req.user = user;
        next();
      }
    })
    .catch((err) => {
      console.log("Something went very wrong in middleware.");
    });

  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
  if (!req.body) {
    res.status(400).json({ message: "missing user data" });
  } else if (!req.body["name"]) {
    res.status(400).json({ message: "missing required name field" });
  } else {
    next();
  }
}

function validatePostId(req, res, next) {
  // do your magic!
  const { id } = req.params;
  Post.getById(id)
    .then((post) => {
      if (!post) {
        console.log(`Post with id: ${id}, does not exist.`);
        res.send(`Post with id: ${id}, does not exist.`);
      } else {
        console.log(`Post with id: ${id}, exists.`);
        req.post = post;
        next();
      }
    })
    .catch((err) => {
      console.log("Something went very wrong in middleware.");
    });
}

function validatePost(req, res, next) {
  // do your magic!
  if (!req.body) {
    res.status(400).json({ message: "missing user data" });
  } else if (!req.body["text"]) {
    res.status(400).json({ message: "missing required text field" });
  } else {
    next();
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePostId,
  validatePost,
};
