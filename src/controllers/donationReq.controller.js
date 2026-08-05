import { ObjectId } from "mongodb";

const getDonationReq = async (req, res) => {
  const donationRequestsCollection = req.app.locals.donationRequestsCollection;
  const email = req.params.email;
  if (email !== req.decoded_email) {
    return res.status(403).send({
      message: "Forbidden access",
    });
  }
  const { limit, status } = req.query;

  const query = { requesterEmail: email };

  let cursor = donationRequestsCollection.find(query).sort({ createdAt: -1 });

  if (limit) {
    cursor = cursor.limit(parseInt(limit));
  }

  if (status && status !== "all") {
    query.donationStatus = status;
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

const updateStatusDone = async (req, res) => {
  const donationRequestsCollection = req.app.locals.donationRequestsCollection;
  const { statusDone } = req.body;
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const updatedStatusDoc = {
    $set: {
      donationStatus: statusDone,
    },
  };
  const result = await donationRequestsCollection.updateOne(
    query,
    updatedStatusDoc,
  );
  res.send(result);
};
const updateStatusCanceled = async (req, res) => {
  const donationRequestsCollection = req.app.locals.donationRequestsCollection;
  const { statusCanceled } = req.body;
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const updatedStatusDoc = {
    $set: {
      donationStatus: statusCanceled,
    },
  };
  const result = await donationRequestsCollection.updateOne(
    query,
    updatedStatusDoc,
  );
  res.send(result);
};

const deletDonationReq = async (req, res) => {
  const donationRequestsCollection = req.app.locals.donationRequestsCollection;
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await donationRequestsCollection.deleteOne(query);
  res.send(result);
};

export {
  getDonationReq,
  postDonationReq,
  updateStatusDone,
  updateStatusCanceled,
  deletDonationReq,
};
