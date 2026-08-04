const getDonationReq = async (req, res) => {};

const postDonationReq = async (req, res) => {
  const donationRequestsCollection = req.app.locals.donationRequestsCollection;
  const donationRequest = req.body;
  const result = await donationRequestsCollection.insertOne(donationRequest);
  res.send(result);
};

export { getDonationReq, postDonationReq };
