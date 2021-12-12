import app from "./app";
import { mongo } from "./db/mongo";
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
