const getUser = async (req, res) => {
  const usersCollection = req.app.locals.usersCollection;
  const cursor = usersCollection.find();
  const result = await cursor.toArray();
  res.send(result);
};

const getOneUser = async (req, res) => {
  const usersCollection = req.app.locals.usersCollection;
  const email = req.params.email;
  if (email !== req.decoded_email) {
    return res.status(403).send({ message: "forbidded access" });
  }
  const query = { email };
  const result = await usersCollection.findOne(query);
  res.send(result);
};

const postUser = async (req, res) => {
  const usersCollection = req.app.locals.usersCollection;
  const userInfo = req.body;
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

const updateUser = async (req, res) => {
  const email = req.params.email;
  const query = { email };
};

export { getUser, postUser, getOneUser, updateUser };
