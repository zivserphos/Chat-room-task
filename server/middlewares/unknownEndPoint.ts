export function unknownEndPoint(req, res, next) {
  res.status(404).json({ error: "Unknown endpoint" });
}
