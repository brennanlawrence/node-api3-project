const express = require("express");
const Users = require("./users-model");
const Middleware = require("../middleware/middleware");


const router = express.Router();

router.post("/", Middleware.validateUser, (req, res) => {
  // do your magic!
  // this needs a middleware to check that the request body is valid
  Users.insert(req.body).then((user) => {
    res.status(200).json(user);
  })
  .catch((err) => {
    res.status(500).json({ message: "Something went terribly wrong..." + err });
  });
});

router.get("/", (req, res) => {
  // do your magic!
  Users.get()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json({ message: "Something went terribly wrong..." });
    });
});

router.get("/:id", Middleware.validateUserId, (req, res) => {
  const { id } = req.params;
  Users.getById(id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res
        .status(500)
        .json({
          message:
            "Something went terribly wrong... We failed to get the user you asked for.",
        });
    });
  // do your magic!
  // this needs a middleware to verify user id
});

router.delete("/:id", Middleware.validateUserId, (req, res) => {
  // do your magic!
  // this needs a middleware to verify user id
  const { id } = req.params;
  Users.remove(id)
    .then((numOfRecodsDeleted) => {
      res.status(200).json({ message: `User with id: ${id}, deleted.` });
    })
    .catch((err) => {
      res
        .status(500)
        .json({
          message:
            "Something went terribly wrong... We failed to delete the user you asked for.",
        });
    });
});

router.put(
  "/:id",
  Middleware.validateUserId,
  Middleware.validateUser,
  (req, res) => {
    // do your magic!
    // this needs a middleware to verify user id
    // and another middleware to check that the request body is valid
    const { id } = req.params;
    const changes = req.body;

    Users.update(id, changes)
      .then((numOfRecodsUpdated) => {
        res.status(200).json({ message: `User with id: ${id}, updated.` });
      })
      .catch((err) => {
        res
          .status(500)
          .json({
            message:
              "Something went terribly wrong... We failed to update the user you asked for.",
          });
      });
  }
);

//?? Not sure this is supposed to be here, it doesn't match the data structure or the helpers. ??
router.post("/:id/posts", Middleware.validateUserId, (req, res) => {
  // do your magic!
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.get("/:id/posts", Middleware.validateUserId, (req, res) => {
  // do your magic!
  // this needs a middleware to verify user id
  const { id } = req.params;
  Users.getUserPosts(id).then((usersPosts) => {
    res.status(200).json(usersPosts);
  })
  .catch((err) => {
    res.status(500).json({ message: "Something went terribly wrong... " + err });
  });
});

// do not forget to export the router

module.exports = router;
