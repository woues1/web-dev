const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/userModel");
const Workout = require("../models/workoutModel");
const workouts = require("./data/workouts.js");

let token = null;

const initializeDatabase = async () => {
  await User.deleteMany({});
  const result = await api
    .post("/api/user/signup")
    .send({ email: "mattiv@matti.fi", password: "R3g5T7#gh" });
  token = result.body.token;
};

const clearWorkouts = async () => {
  await Workout.deleteMany({});
};

const addInitialWorkouts = async () => {
  await api
    .post("/api/workouts")
    .set("Authorization", `bearer ${token}`)
    .send(workouts[0])
    .send(workouts[1]);
};

beforeAll(async () => {
  await initializeDatabase();
});

describe("Workout API tests", () => {
  beforeEach(async () => {
    await clearWorkouts();
    await addInitialWorkouts();
  });

  it("Workouts are returned as JSON", async () => {
    await api
      .get("/api/workouts")
      .set("Authorization", `bearer ${token}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  it("New workout is added successfully", async () => {
    const newWorkout = {
      title: "testworkout",
      reps: 10,
      load: 100,
    };
    await api
      .post("/api/workouts")
      .set("Authorization", `bearer ${token}`)
      .send(newWorkout)
      .expect(201);
    });
    
    it("Workout is updated successfully", async () => {
      const response = await api
        .get("/api/workouts")
        .set("Authorization", `bearer ${token}`);
      
      const workoutToUpdate = response.body[0];
      console.log(workoutToUpdate._id);
      const updatedWorkout = {
        title: "updatedworkout",
        reps: 20,
        load: 200,
      };
  
      await api
        .patch(`/api/workouts/${workoutToUpdate._id}`)
        .set("Authorization", `bearer ${token}`)
        .send(updatedWorkout)
        .expect(200);
  
      const updatedResponse = await api
        .get(`/api/workouts/${workoutToUpdate._id}`)
        .set("Authorization", `bearer ${token}`);
  
      expect(updatedResponse.body.title).toBe(updatedWorkout.title);
      expect(updatedResponse.body.reps).toBe(updatedWorkout.reps);
      expect(updatedResponse.body.load).toBe(updatedWorkout.load);
    });
    
  it("Workout is deleted successfully", async () => {
    const response = await api
      .get("/api/workouts")
      .set("Authorization", `bearer ${token}`);
    
    const workoutToDelete = response.body[0];

    await api
      .delete(`/api/workouts/${workoutToDelete._id}`)
      .set("Authorization", `bearer ${token}`)
      .expect(200);

    const workoutsAtEnd = await api
      .get("/api/workouts")
      .set("Authorization", `bearer ${token}`);

    expect(workoutsAtEnd.body).toHaveLength(0);
  });


  it("Single workout is retrieved successfully", async () => {
    const response = await api
      .get("/api/workouts")
      .set("Authorization", `bearer ${token}`);
    
    const workoutToRetrieve = response.body[0];

    const retrievedWorkout = await api
      .get(`/api/workouts/${workoutToRetrieve._id}`)
      .set("Authorization", `bearer ${token}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(retrievedWorkout.body.title).toBe(workoutToRetrieve.title);
    expect(retrievedWorkout.body.reps).toBe(workoutToRetrieve.reps);
    expect(retrievedWorkout.body.load).toBe(workoutToRetrieve.load);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
