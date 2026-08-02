const getUser = async (req, res) => {
  const usersCollection = req.app.locals.usersCollection;
  const cursor = usersCollection.find();
  const result = await cursor.toArray();
  res.send(result);
};

const postUser = async (req, res) => {
  const usersCollection = req.app.locals.usersCollection;
  const userInfo = req.body;
  userInfo.status = "active";
  const email = userInfo.email;
  const userExist = await usersCollection.findOne({ email });
  if (userExist) {
    return res.status(409).send({
      success: false,
      message: "User already exists",
    });
  }
  userInfo.createdAt = new Date();
  const result = await usersCollection.insertOne(userInfo);
  res.send(result);
};

export { getUser, postUser };
