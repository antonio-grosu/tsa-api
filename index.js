require("dotenv").config(); // import dotenv package
const express = require("express");
const cors = require("cors"); // Import cors package
const app = express();
require("dotenv").config();

//BUG MIDDLEWARE
// const middleware = require("./middleware/index");
//BUG MIDDLEWARE

app.use(cors()); // Use cors middleware
app.use(express.json());

const db = require("./models");

const stripe = require("stripe")(process.env.STRIPE_TEST_KEY);

// Port number
const localPort = 8081;

// Routers
const coursesRouter = require("./routers/Courses");
const exerciseRouter = require("./routers/Exercise");
const lessonsRouter = require("./routers/Lessons");
const partsRouter = require("./routers/Parts");
const paymentRouter = require("./routers/Payment");
const usersRouter = require("./routers/Users");
app.use("/courses", coursesRouter);
app.use("/exercise", exerciseRouter);
app.use("/lessons", lessonsRouter);
app.use("/parts", partsRouter);
app.use("/payment", paymentRouter);
app.use("/auth", usersRouter);

app.post("/webhook", async (req, res) => {
  const event = req.body;

  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;
      const userId = session.metadata.userId;
      const courseId = session.metadata.courseId;
      // Use the userId as needed for further processing
      db.Owns.create({
        userId: userId,
        courseId: courseId,
      })
        .then((data) => {
          console.log("Owns created:", data);
          // Handle success response if needed
        })
        .catch((err) => {
          console.error("Error creating owns:", err);
          // Handle error response if needed
        });
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
