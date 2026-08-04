const verifyActiveUser = async (req, res, next) => {
  try {
    const usersCollection = req.app.locals.usersCollection;

    const email = req.decoded_email;
    const query = { email };
    const user = await usersCollection.findOne(query);

    // User not found
    if (!user) {
      return res.status(404).send({
        message: "User not found",
      });
    }

    // User is blocked
    if (user.status !== "active") {
      return res.status(403).send({
        message: "You are blocked from doing this process",
      });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

export default verifyActiveUser;
