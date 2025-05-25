import express from "express";

const app = express();
app.use(express.json());

app.post("/tool/add_numbers", (req, res) => {
  const { a, b } = req.body;
  const result = a + b;
  console.log(`🧮 ${a} + ${b} = ${result}`);
  res.json({ result });
});

app.listen(3001, () => {
  console.log("🧠 math.interface module ready.");
  console.log("✅ Listening on http://localhost:3001");
});
