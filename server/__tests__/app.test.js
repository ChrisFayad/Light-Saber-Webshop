const app = require("../app.js");
const supertest = require("supertest");

const request = supertest(app);

let crystals = [
  {
    crystalName: "Dantooine",
    crystalInfo: {
      color: "blue",
      mode: "Justice and protection",
      force: 19,
      crystalPower: 10,
    },
  },
  {
    crystalName: "Ilum",
    crystalInfo: {
      color: "red",
      mode: "Evil and power",
      force: 20,
      crystalPower: 101,
    },
  },
  {
    crystalName: "Dagobah",
    crystalInfo: {
      color: "green",
      mode: "Peace through force, when necessary",
      force: 22,
      crystalPower: 37,
    },
  },
];

const newCrystal = {
  name: "Hurrikaine",
  color: "purple",
  mode: "Moral ambiguity",
  f: 25,
  cr: 50,
};

const updatedCrystal = {
  mode: "Geostorm",
};

describe("GET /JediMaster/crystal", () => {
  it("Should get a status code of 200", async () => {
    const response = await request.get("/JediMaster/crystal");
    expect(response.status).toBe(200);
  });
  it("Should return an object which include an array of crystals", async () => {
    const response = await request.get("/JediMaster/crystal");
    expect(response.body.message.crystal).toMatchObject(crystals);
  });
});

describe("GET /JediMaster/crystal/:color", () => {
  describe("User give an invalid color", () => {
    it("Should return a status code of 404", async () => {
      const response = await request.get("/JediMaster/crystal/black");
      expect(response.status).toBe(404);
    });
    it("Should return an error message", async () => {
      const response = await request.get("/JediMaster/crystal/black");
      expect(response.body.message).toContain("is not found");
    });
  });
  describe("User give a valid color", () => {
    it("Should return a status code of 200", async () => {
      const response = await request.get("/JediMaster/crystal/green");
      expect(response.status).toBe(200);
    });
    it("Should return the crystal with the color", async () => {
      const response = await request.get("/JediMaster/crystal/green");
      expect(response.body.message.force).toBe(22);
      expect(response.body.message.crystalPower).toBe(37);
    });
  });
});

describe("POST /JediMaster/crystal", () => {
  describe("User not to give enough information", () => {
    it("Should return a status code of 422", async () => {
      const response = await request.post("/JediMaster/crystal");
      expect(response.status).toBe(422);
    });
  });
  describe("User to give enough information", () => {
    it("Should return a status code of 201 & a message", async () => {
      const response = await request
        .post("/JediMaster/crystal")
        .send(newCrystal);
      expect(response.status).toBe(201);
      expect(response.body.message).toContain("Crystal has been added");
    });
  });
});

describe("PATCH /JediMaster/crystal", () => {
  describe("User don't provide content", () => {
    it("Should return a status code of 400", async () => {
      const response = await request
        .patch("/JediMaster/crystal?name=Ilum")
        .send();
      expect(response.status).toBe(400);
    });
    it("Should return an error message", async () => {
      const response = await request
        .patch("/JediMaster/crystal?name=Ilum")
        .send();
      expect(response.body.message).toContain("No content was provided");
    });
  });
  describe("User give a valid name", () => {
    it("Should return a status code of 200 & a message", async () => {
      const response = await request
        .patch("/JediMaster/crystal?name=Hurrikaine")
        .send(updatedCrystal);
      expect(response.status).toBe(200);
      expect(response.body.message).toContain("Crystal has been updated");
    });
  });
});

describe("DELETE /JediMaster/crystal", () => {
  describe("User give an invalid name", () => {
    it("Should return a status code of 404", async () => {
      const response = await request.delete("/JediMaster/crystal?name=Il");
      expect(response.status).toBe(404);
    });
    it("Should return an error message", async () => {
      const response = await request.delete("/JediMaster/crystal?name=Il");
      expect(response.body.message).toContain("Crystal is not found");
    });
  });
  describe("User give a valid name", () => {
    it("Should return a status code of 200 & a message", async () => {
      const response = await request.delete(
        "/JediMaster/crystal?name=Hurrikaine"
      );
      expect(response.status).toBe(200);
      expect(response.body.message).toContain("Crystal has been deleted");
    });
  });
});
