const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Workout = require("../models/workoutModel");

const initialWorkouts = [
  {
    title: "test workout 1",
    reps: 11,
    load: 101,
  },
  {
    title: "test workout 2",
    reps: 12,
    load: 102,
  },
];

const workoutsInDb = async () => {
  const workouts = await Workout.find({});
  return workouts.map((workout) => workout.toJSON());
};

beforeEach(async () => {
  await Workout.deleteMany({});
  for (const workout of initialWorkouts) {
    let workoutObject = new Workout(workout);
    await workoutObject.save();
  }
});

describe("Workout API tests", () => {
  describe("GET /api/workouts", () => {
    it("should return all workouts", async () => {
      const response = await api.get("/api/workouts");
      expect(response.body).toHaveLength(initialWorkouts.length);
    });

    it("should return a specific workout within the returned workouts", async () => {
      const response = await api.get("/api/workouts");
      const titles = response.body.map((workout) => workout.title);
      expect(titles).toContain("test workout 2");
    });

    it("should return workouts in JSON format", async () => {
      const response = await api.get("/api/workouts");
      expect(response.status).toBe(200);
      expect(response.header["content-type"]).toContain("application/json");
    });
  });

  describe("POST /api/workouts", () => {
    it("should add a new workout successfully", async () => {
      const newWorkout = {
        title: "test workout x",
        reps: 19,
        load: 109,
      };
      await api.post("/api/workouts").send(newWorkout).expect(201);
    });

    it("should add a valid workout", async () => {
      const newWorkout = {
        title: "Situps",
        reps: 25,
        load: 10,
      };

      await api
        .post("/api/workouts")
        .send(newWorkout)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const response = await api.get("/api/workouts");
      const titles = response.body.map((workout) => workout.title);

      expect(response.body).toHaveLength(initialWorkouts.length + 1);
      expect(titles).toContain("Situps");
    });

    it("should not add a workout without a title", async () => {
      const newWorkout = {
        reps: 23,
      };

      await api.post("/api/workouts").send(newWorkout).expect(400);

      const response = await api.get("/api/workouts");
      expect(response.body).toHaveLength(initialWorkouts.length);
    });
  });

  describe("DELETE /api/workouts/:id", () => {
    it("should succeed with status code 204 if id is valid", async () => {
      const workoutsAtStart = await workoutsInDb();
      const workoutToDelete = workoutsAtStart[0];

      await api.delete(`/api/workouts/${workoutToDelete.id}`).expect(204);

      const workoutsAtEnd = await workoutsInDb();
      expect(workoutsAtEnd).toHaveLength(initialWorkouts.length - 1);

      const titles = workoutsAtEnd.map((workout) => workout.title);
      expect(titles).not.toContain(workoutToDelete.title);
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
