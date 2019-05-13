const express = require("express");
const router = express.Router(); //we are calling express.Router function
const db = require("./data/db.js");

router.use(express.json());

// this file will only be used when the route begins with "/posts". so we can remove that from the URLs, so "/posts" becomes simply "/"   for /api/posts  ..we are using "/"
router.get("/", async (req, res) => {
  try {
    const posts = await db.find(req.body);
    res.status(200).json(posts);
  } catch (err) {
    res
      .status(500)
      .json({ error: "The posts information could not be retrieved." });
  }
});

router.post("/", async (req, res) => {
  const { title, contents } = req.body;
  try {
    if (title && contents) {
      const post = await db.insert(req.body);
      res.status(201).json(post);
    } else {
      res.status(400).json({
        err: "Please provide title and contents for the post."
      });
    }
  } catch (error) {
    res.status(500).json({
      err: "There was an error while saving the post to the database"
    });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;
  try {
    if (title && contents) {
      const post = await db.update(id, req.body);
      if (post) {
        res.status(201).json(post);
      } else {
        res
          .status(404)
          .json({ err: "The post with the specified ID does not exist." });
      }
    } else {
      res.status(400).json({
        err: "Please provide title and contents for the post."
      });
    }
  } catch (err) {
    res.status(500).json({
      err: "The post information could not be modified."
    });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await db.remove(id);
    if (post) {
      res.status(201).json(post);
    } else {
      res
        .status(404)
        .json({ err: "The post with the specified ID does not exist." });
    }
  } catch (err) {
    res.status(500).json({
      err: "The post could not be removed"
    });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await db.findById(id);
    //console.log("post", post); // used post.length > 0 because - if the id did not exist it was returning an empty array instead of error message 404
    if (post.length > 0) {
      res.status(201).json(post);
    } else {
      res
        .status(404)
        .json({ err: "The post with the specified ID does not exist." });
    }
  } catch (err) {
    res.status(500).json({
      err: "There was an error while saving the post to the database"
    });
  }
});

// after the route has been fully configured, then we export it so it can be required where needed
module.exports = router;
