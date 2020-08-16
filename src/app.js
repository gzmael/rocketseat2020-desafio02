const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

// const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO
  const allRepositories = repositories;
  return response.json(allRepositories);
});

app.post("/repositories", (request, response) => {
  // TODO
  const { title, url, techs } = request.body;
  const newRepo = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };
  repositories.push(newRepo);

  return response.json(newRepo);
});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const { title, url, techs } = request.body;
  const { id } = request.params;

  const hasRepo = repositories.find((repo) => repo.id === id);
  if (!hasRepo) {
    return response.status(400).send("Repositorio não existe");
  }

  repositories.forEach((repo) => {
    if (repo.id === id) {
      repo.title = title;
      repo.url = url;
      repo.techs = techs;
    }
  });

  const newRepo = repositories.find((repo) => repo.id === id);

  return response.json(newRepo);
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;

  const indexRepo = repositories.findIndex((repo) => repo.id === id);
  if (indexRepo === -1) {
    return response.status(400).send("Repositorio não existe");
  }

  repositories.splice(indexRepo, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const { id } = request.params;

  const hasRepo = repositories.find((repo) => repo.id === id);
  if (!hasRepo) {
    return response.status(400).send("Repositorio não existe");
  }

  repositories.forEach((repo) => repo.id === id && repo.likes++);

  const repo = repositories.find((repo) => repo.id === id);
  const { likes } = repo;

  return response.json({ likes });
});

module.exports = app;
