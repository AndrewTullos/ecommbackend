const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// The `/api/products` endpoint

// find all products
router.get("/", async (req, res) => {
	try {
		const getAllProducts = await Product.findAll({
			// be sure to include its associated Category and Tag data
			include: [{ model: Category }, { model: Tag }],
		});
		res.status(200).json(getAllProducts);
	} catch (err) {
		res.status(500).json(err);
	}
});

// find a single product by its `id`
router.get("/:id", async (req, res) => {
	try {
		const findSingleProduct = await Product.findByPk(req.params.id, {
			// be sure to include its associated Category and Tag data
			include: [{ model: Category }, { model: Tag }],
		});

		if (!findSingleProduct) {
			res.status(400).json({ message: "No products found with this id!" });
			return;
		}

		res.status(200).json(findSingleProduct);
	} catch (err) {
		res.status(500).json(err);
	}
});

// create new product
router.post("/", async (req, res) => {
	/* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
	Product.create(req.body)
		.then((product) => {
			// if there's product tags, we need to create pairings to bulk create in the ProductTag model
			if (req.body.tagIds && req.body.tagIds.length) {
				const productTagIdArr = req.body.tagIds.map((tag_id) => {
					return {
						product_id: product.id,
						tag_id,
					};
				});
				return ProductTag.bulkCreate(productTagIdArr).then((productTagIds) => {
					return res.status(200).json({ product, tags: productTagIds });
				});
			} else {
				// if no product tags, just respond
				res.status(200).json(product);
			}
		})
		.catch((err) => {
			console.log(err);
			res.status(400).json(err);
		});
});

// update product
router.put("/:id", async (req, res) => {
	// update product data
	Product.update(req.body, {
		where: {
			id: req.params.id,
		},
	})
		.then((product) => {
			if (req.body.tagIds && req.body.tagIds.length) {
				ProductTag.findAll({
					where: { product_id: req.params.id },
				}).then((productTags) => {
					// create filtered list of new tag_ids
					const productTagIds = productTags.map(({ tag_id }) => tag_id);
					const newProductTags = req.body.tagIds
						.filter((tag_id) => !productTagIds.includes(tag_id))
						.map((tag_id) => {
							return {
								product_id: req.params.id,
								tag_id,
							};
						});

					// figure out which ones to remove
					const productTagsToRemove = productTags
						.filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
						.map(({ id }) => id);
					// run both actions
					return Promise.all([
						ProductTag.destroy({ where: { id: productTagsToRemove } }),
						ProductTag.bulkCreate(newProductTags),
					]);
				});
			}

			return res.json(product);
		})
		.catch((err) => {
			// console.log(err);
			res.status(400).json(err);
		});
});

// delete one product by its `id` value
router.delete("/:id", async (req, res) => {
	try {
		const productData = await Product.destroy({
			where: {
				id: req.params.id,
			},
		});

		if (!productData) {
			res.status(404).json({ message: "No products found with this id!" });
			return;
		}
		res.status(200).json(productData);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
