const express = require("express");
const routes = require("./routes");
const mysql = require("mysql2");
require("dotenv").config();

const sequelize = require("./config/connection");

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// Create a route
// app.post("/api/tag", ({ body }, res) => {
// 	const sql = `INSERT INTO movies (movie_name)
//    VALUES (?)`;
// 	const params = [body.movie_name];

// 	db.query(sql, params, (err, result) => {
// 		if (err) {
// 			res.status(400).json({ error: err.message });
// 			return;
// 		}
// 		res.json({
// 			message: "success",
// 			data: body,
// 		});
// 	});
// });

// Read all movies
// app.get("/api/movies", (req, res) => {
// 	const sql = `SELECT id, movie_name AS title FROM movies`;

// 	db.query(sql, (err, rows) => {
// 		if (err) {
// 			res.status(500).json({ error: err.message });
// 			return;
// 		}
// 		res.json({
// 			message: "success",
// 			data: rows,
// 		});
// 	});
// });

// Delete a movie
// app.delete("/api/movie/:id", (req, res) => {
// 	const sql = `DELETE FROM movies WHERE id = ?`;
// 	const params = [req.params.id];

// 	db.query(sql, params, (err, result) => {
// 		if (err) {
// 			res.statusMessage(400).json({ error: res.message });
// 		} else if (!result.affectedRows) {
// 			res.json({
// 				message: "Movie not found",
// 			});
// 		} else {
// 			res.json({
// 				message: "deleted",
// 				changes: result.affectedRows,
// 				id: req.params.id,
// 			});
// 		}
// 	});
// });

// Read list of all reviews and associated movie name using LEFT JOIN
// app.get("/api/movie-reviews", (req, res) => {
// 	const sql = `SELECT movies.movie_name AS movie, reviews.review FROM reviews LEFT JOIN movies ON reviews.movie_id = movies.id ORDER BY movies.movie_name;`;
// 	db.query(sql, (err, rows) => {
// 		if (err) {
// 			res.status(500).json({ error: err.message });
// 			return;
// 		}
// 		res.json({
// 			message: "success",
// 			data: rows,
// 		});
// 	});
// });

// BONUS: Update review name
// app.put("/api/review/:id", (req, res) => {
// 	const sql = `UPDATE reviews SET review = ? WHERE id = ?`;
// 	const params = [req.body.review, req.params.id];

// 	db.query(sql, params, (err, result) => {
// 		if (err) {
// 			res.status(400).json({ error: err.message });
// 		} else if (!result.affectedRows) {
// 			res.json({
// 				message: "Movie not found",
// 			});
// 		} else {
// 			res.json({
// 				message: "success",
// 				data: req.body,
// 				changes: result.affectedRows,
// 			});
// 		}
// 	});
// });

// Default response for any other request (Not Found)
app.use((req, res) => {
	res.status(404).end();
});

sequelize.sync({ force: false }).then(() => {
	app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});
