import { ObjectId } from "mongodb";

const getUser = async (req, res) => {
  const usersCollection = req.app.locals.usersCollection;
  const { status } = req.query;
  const query = {};
  if (status && status !== "all") {
    query.status = status;
  }
  const cursor = usersCollection.find(query);
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
  const usersCollection = req.app.locals.usersCollection;
  const { displayName, photoURL, district, districtId, upazila, bloodGroup } =
    req.body;
  const email = req.params.email;
  const query = { email };
  const updatedUserDoc = {
    $set: {
      displayName: displayName,
      photoURL: photoURL,
      district: district,
      districtId: districtId,
      upazila: upazila,
      bloodGroup: bloodGroup,
    },
  };
  const result = await usersCollection.updateOne(query, updatedUserDoc);
  res.send(result);
};

const toggleUserStatus = async (req, res) => {
  const usersCollection = req.app.locals.usersCollection;
  const { id } = req.params;
  const query = { _id: new ObjectId(id) };

  const user = await usersCollection.findOne(query);

  if (!user) {
    return res.status(404).send({
      message: "User not found",
    });
  }

  const newStatus = user.status === "active" ? "blocked" : "active";

  const updatedStatus = {
    $set: {
      status: newStatus,
    },
  };

  const result = await usersCollection.updateOne(query, updatedStatus);

  res.send(result);
};

const updateUserRole = async (req, res) => {
  const usersCollection = req.app.locals.usersCollection;
  const { id } = req.params;
  const { role } = req.body;

  if (!["donor", "volunteer", "admin"].includes(role)) {
    return res.status(400).send({
      message: "Invalid role",
    });
  }

  const query = { _id: new ObjectId(id) };
  const updatedRole = {
    $set: {
      role,
    },
  };

  const result = await usersCollection.updateOne(query, updatedRole);

  res.send(result);
};
export {
  getUser,
  postUser,
  getOneUser,
  updateUser,
  toggleUserStatus,
  updateUserRole,
};
