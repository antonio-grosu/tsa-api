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
const usersRouter = require("./routers/Users");
const coursesRouter = require("./routers/Courses");
const lessonsRouter = require("./routers/Lessons");
const partsRouter = require("./routers/Parts");
const paymentRouter = require("./routers/Payment");
const ownsRouter = require("./routers/Owns");
const exerciseRouter = require("./routers/Exercise");
const exerciseForLessonRouter = require("./routers/ExerciseForLesson");
app.use("/auth", usersRouter);
app.use("/courses", coursesRouter);
app.use("/lessons", lessonsRouter);
app.use("/parts", partsRouter);
app.use("/payment", paymentRouter);
app.use("/owns", ownsRouter);
app.use("/exercise", exerciseRouter);
app.use("/exerciseForLesson", exerciseForLessonRouter);

const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;
app.post("/webhook", async (req, res) => {
  let event;
  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;
      const userId = Number(session.metadata.userId);
      const courseId = Number(session.metadata.courseId);
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

db.sequelize.sync().then(() => {
  app.listen(process.env.PORT || localPort, () => {
    console.log(`Server listening at http://localhost:${localPort}`);
  });
});
