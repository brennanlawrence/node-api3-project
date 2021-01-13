const express = require("express");
const Posts = require("./posts-model");
const Middleware = require("../middleware/middleware");

const router = express.Router();

router.get("/", (req, res) => {
  // do your magic!
  Posts.get()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Whoops, something went terribly wrong on our side... " + err,
      });
    });
});

router.get("/:id", Middleware.validatePostId, (req, res) => {
  // do your magic!
  // this needs a middleware to verify post id
  const { id } = req.params;
  Posts.getById(id)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Whoops, something went terribly wrong on our side... " + err,
      });
    });
});

router.delete("/:id", Middleware.validatePostId, (req, res) => {
  // do your magic!
  // this needs a middleware to verify post id
  const { id } = req.params;
  Posts.remove(id)
    .then((numOfPostsRemoved) => {
      res
        .status(200)
        .json({ message: `Post with id: ${id}, successfully removed.` });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Whoops, something went terribly wrong on our side... " + err,
      });
    });
});

router.put("/:id", Middleware.validatePostId, Middleware.validatePost, (req, res) => {
  // do your magic!
  // this needs a middleware to verify post id
  // and another middleware to check that the request body is valid
  const { id } = req.params;
  const changes = req.body;
  Posts.insert(id, changes).then((numOfPostsRemoved) => {
    res
      .status(200)
      .json({ message: `Post with id: ${id}, successfully updated.` });
  })
  .catch((err) => {
    res.status(500).json({
      message: "Whoops, something went terribly wrong on our side... " + err,
    });
  });
});

// do not forget to export the router
module.exports = router;
