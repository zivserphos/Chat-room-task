const app = require("./app");
const { mongo } = require("./db/mongo");
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
