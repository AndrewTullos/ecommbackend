const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
	// find all tags
	try {
		const getAllTags = await Tag.findAll({
			// be sure to include its associated Product data
			include: [{ model: Product }],
		});
		res.status(200).json(getAllTags);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get("/:id", async (req, res) => {
	// find a single tag by its `id`
	try {
		const findSingleTag = await Tag.findByPk(req.params.id, {
			// be sure to include its associated Product data
			include: [{ model: Product }],
		});

		if (!findSingleTag) {
			res.status(400).json({ message: "No tags found with this id!" });
			return;
		}

		res.status(200).json(findSingleTag);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.post("/", async (req, res) => {
	// create a new tag
});

router.put("/:id", async (req, res) => {
	// update a tag's name by its `id` value
});

router.delete("/:id", async (req, res) => {
	// delete on tag by its `id` value
});

module.exports = router;
