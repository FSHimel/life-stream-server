const verifyAdminAndVolunteer = async (req, res, next) => {
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

    // if admin or volunteer
    if (!["admin", "volunteer"].includes(user?.role)) {
      return res.status(403).send({
        message: "You are not allowed to procceed any further",
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

export default verifyAdminAndVolunteer;
