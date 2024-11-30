import { request, expect } from "./config.js";

describe("Favorites API", function () {
  describe("POST /favorites", function () {
    describe("when authentication is required", function () {
      it("should return a 401 status", async function () {
        const response = await request.post("/favorites").send({
          airport_id: "YBR",
          note: "Going to Canada",
        });

        expect(response.status).to.eql(401);
      });
    });

    describe("when retrieving favorite airports", function () {
      it("should return a 200 status", async function () {
        const postResponse = await request
          .get("/favorites")
          .set("Authorization", "Bearer token=5XwHCKAW5TNWHPzGXyLBeHCf ");
        expect(postResponse.status).to.eql(200);
      });
    });

    describe("when saving and deleting favorite airports", function () {
      it.skip("should allow a user to save and delete their favorite airports", async function () {
        const postResponse = await request
          .post("/favorites")
          .set("Authorization", "Bearer token=5XwHCKAW5TNWHPzGXyLBeHCf")
          .send({
            airport_id: "YBR",
            note: "Going to Canada",
          });

        expect(postResponse.status).to.eql(201);
        expect(postResponse.body.data.attributes.airport.name).to.eql(
          "Brandon Municipal Airport"
        );
        expect(postResponse.body.data.attributes.note).to.eql("Going to Canada");

        const favoriteId = postResponse.body.data.id;

        const putResponse = await request
          .put(`/favorites/${favoriteId}`)
          .set("Authorization", "Bearer token=5XwHCKAW5TNWHPzGXyLBeHCf")
          .send({
            note: "My usual layover when visiting family and friends",
          });

        expect(putResponse.status).to.eql(200);
        expect(putResponse.body.data.attributes.note).to.eql(
          "My usual layover when visiting family and friends"
        );

        const deleteResponse = await request
          .delete(`/favorites/${favoriteId}`)
          .set("Authorization", "Bearer token=5XwHCKAW5TNWHPzGXyLBeHCf");

        expect(deleteResponse.status).to.eql(204);

        const getResponse = await request
          .get(`/favorites/${favoriteId}`)
          .set("Authorization", "Bearer token=5XwHCKAW5TNWHPzGXyLBeHCf");

        expect(getResponse.status).to.eql(404);
      });
    });
  });
});