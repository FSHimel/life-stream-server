const getUser = async (req, res) => {
  const usersCollection = req.app.locals.usersCollection;
  const cursor = usersCollection.find();
  const result = await cursor.toArray();
  res.send(result);
};

export { getUser };
