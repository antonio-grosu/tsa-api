require("dotenv").config(); // import dotenv package
const express = require("express");
const cors = require("cors"); // Import cors package
const app = express();
require("dotenv").config();
app.use(cors()); // Use cors middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./models");

const stripe = require("stripe")(process.env.STRIPE_TEST_KEY);

// Port number
const localPort = 8081;

// Routers
const coursesRouter = require("./routers/Courses");
const exerciseRouter = require("./routers/Exercise");
const lessonsRouter = require("./routers/Lessons");
const ownedBiesRouter = require("./routers/OwnedBies");
const partsRouter = require("./routers/Parts");
const paymentRouter = require("./routers/Payment");
const sumPaidRouter = require("./routers/SumPaid");
const usersRouter = require("./routers/Users");
app.use("/courses", coursesRouter);
app.use("/exercise", exerciseRouter);
app.use("/lessons", lessonsRouter);
app.use("/ownedbies", ownedBiesRouter);
app.use("/parts", partsRouter);
app.use("/sumpaid", sumPaidRouter);
app.use("/payment", paymentRouter);
app.use("/auth", usersRouter);

app.post("/webhook", async (req, res) => {
  const event = req.body;
  const OwnedBies = db.OwnedBies;

  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;
      const UserId = session.metadata.UserId;
      const courseId = session.metadata.courseId;
      // Use the userId as needed for further processing
      const data = await OwnedBies.create({
        courseId: courseId,
        UserId: UserId,
      });
      res.json(data);
      break;
  }

  // Return a 200 response to acknowledge receipt of the event
  res.json({ received: true });
});

// app.post("/webhook", async (req, res) => {
//   const event = req.body;
//   // Handle the event

//   switch (event.type) {
//     case "checkout.session.completed":
//       const session = event.data.object;
//       const userId = session.metadata.userId;
//       // Use the userId as needed for further processing
//       User.findByIdAndUpdate(userId, { isPaid: true }, { new: true })
//         .then((updatedUser) => {
//           console.log("User updated:", updatedUser);
//           // Handle success response if needed
//         })
//         .catch((err) => {
//           console.error("Error updating user:", err);
//           // Handle error response if needed
//         });
//       break;
//   }

db.sequelize.sync().then(() => {
  app.listen(process.env.PORT || localPort, () => {
    console.log(`Server listening at http://localhost:${localPort}`);
  });
});
