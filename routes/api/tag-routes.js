const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

// find all tags
router.get("/", async (req, res) => {
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

// find a single tag by its `id`
router.get("/:id", async (req, res) => {
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

// create a new tag
router.post("/", async (req, res) => {
	try {
		const createTag = await Tag.create(req.body);
		res.status(200).json(createTag);
	} catch (err) {
		res.status(400).json(err);
	}
});

// update a tag's name by its `id` value
router.put("/:id", async (req, res) => {
	
});

// delete on tag by its `id` value
router.delete("/:id", async (req, res) => {
	try {
		const tagData = await Tag.destroy({
			where: {
				id: req.params.id,
			},
		});
		if (!tagData) {
			res.status(404).json({ message: "No location found with this id!" });
			return;
		}
		res.status(200).json(tagData);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
