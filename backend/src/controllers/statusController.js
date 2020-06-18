exports.getStatus = (req, res) => {
  return res.status(404).json({ mensaje: "server is working" });
};
