const getDonationReq = async (req, res) => {
  const donationRequestsCollection = req.app.locals.donationRequestsCollection;
  const email = req.params.email;
  if (email !== req.decoded_email) {
    return res.status(403).send({
      message: "Forbidden access",
    });
  }
  const { limit } = req.query;
  const query = { requesterEmail: email };
  let cursor = donationRequestsCollection.find(query).sort({ createdAt: -1 });
  if (limit) {
    cursor = cursor.limit(parseInt(limit));
  }
  const result = await cursor.toArray();
  res.send(result);
};

const postDonationReq = async (req, res) => {
  const donationRequestsCollection = req.app.locals.donationRequestsCollection;
  const donationRequest = req.body;
  const result = await donationRequestsCollection.insertOne(donationRequest);
  res.send(result);
};

export { getDonationReq, postDonationReq };
