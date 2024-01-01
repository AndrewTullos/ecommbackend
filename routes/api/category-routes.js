const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

// find all categories
router.get("/", async (req, res) => {
	try {
		const getAllCategory = await Category.findAll({
			// be sure to include its associated Products
			include: [{ model: Product }],
		});
		res.status(200).json(getAllCategory);
	} catch (err) {
		res.status(500).json(err);
	}
});

// find one category by its `id` value
router.get("/:id", async (req, res) => {
	try {
		const findSingleCategory = await Category.findByPk(req.params.id, {
			// be sure to include its associated Products
			include: [{ model: Product }],
		});

		if (!findSingleCategory) {
			res.status(400).json({ message: "No categories found with this id!" });
			return;
		}
		res.status(200).json(findSingleCategory);
	} catch (err) {
		res.status(500).json(err);
	}
});

// create a new category
router.post("/", async (req, res) => {
	try {
		const createCategory = await Category.create(req.body);
		res.status(200).json(createCategory);
	} catch (err) {
		res.status(400).json(err);
	}
});

// update a category by its `id` value
router.put("/:id", async (req, res) => {
	const categoryId = req.params.id;
	try {
		const updatedCategory = await Category.update(req.body, {
			where: {
				id: categoryId,
			},
		});

		if (updatedCategory[0] > 0) {
			// Check if any rows were actually updated
			res.status(200).json({ message: "Category updated successfully" });
		} else {
			res.status(404).json({ message: "Category not found" });
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

// delete a category by its `id` value
router.delete("/:id", async (req, res) => {
	try {
		const categoryData = await Category.destroy({
			where: {
				id: req.params.id,
			},
		});

		if (!categoryData) {
			res.status(404).json({ message: "No category found with this id!" });
			return;
		}
		res.status(200).json(categoryData);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
