const pg = require("pg");
const { Client } = pg;
const uuid = require("uuid");
const client = new Client("postgres://localhost/articles");

client.connect();

const sync = async () => {
  // const SQL = `
  //   DROP TABLE IF EXISTS articles;
  //   DROP TABLE IF EXISTS authors;
  //   CREATE TABLE authors
  //   (
  //     id UUID PRIMARY KEY,
  //     first_name VARCHAR,
  //     last_name VARCHAR,
  //     date_created TIMESTAMP default CURRENT_TIMESTAMP
  //   );
  //   CREATE TABLE articles
  //   (
  //     id UUID PRIMARY KEY,
  //     title VARCHAR,
  //     body VARCHAR,
  //     date_created TIMESTAMP default CURRENT_TIMESTAMP,
  //     author_id UUID references authors(id)
  //   );
  // `;
  // await client.query(SQL);
};

//////////////////////////author methods/////////////////////////////////////
const readAuthors = async () => {
  const SQL = "SELECT * FROM authors";
  const response = await client.query(SQL);
  return response.rows;
};
const deleteAuthor = async id => {
  const SQL = "DELETE FROM authors WHERE id = $1";
  await client.query(SQL, [id]);
};
const updateAuthor = async (first_name, last_name, id) => {
  const SQL =
    "UPDATE authors set first_name = $1, last_name = $2 WHERE id = $3 returning *";
  const response = await client.query(SQL, [first_name, last_name, id]);
  return response.rows[0];
};
const readAuthor = async id => {
  const SQL = "SELECT * FROM authors WHERE id = $1";
  const response = await client.query(SQL, [id]);
  return response.rows;
};
const createAuthor = async (first_name, last_name) => {
  const SQL =
    "INSERT into authors(id, first_name, last_name) values($1, $2, $3) returning *";
  const response = await client.query(SQL, [uuid(), first_name, last_name]);
  return response.rows[0];
};

//////////////////////////article methods/////////////////////////////////////
const readArticles = async () => {
  console.log("made it to read articles");
  const SQL = "SELECT * FROM articles";
  const response = await client.query(SQL);
  return response.rows;
};
const updateArticle = async article => {
  console.log("made it to update articles");
  const SQL =
    "UPDATE articles set name = $1, author_id=$2 WHERE id = $3 returning *";
  const response = await client.query(SQL, [
    article.name,
    article.author_id,
    article.id
  ]);
  return response.rows[0];
};
const deleteArticle = async id => {
  console.log("made it to delete articles");
  const SQL = "DELETE FROM articles WHERE id = $1";
  await client.query(SQL, [id]);
};
const readArticle = async id => {
  console.log("made it to read article");
  const SQL = "SELECT * FROM articles WHERE id=$1";
  const response = await client.query(SQL, [id]);
  return response.rows;
};
const createArticle = async (author_id, title, body) => {
  console.log("made it to create articles");
  //needs author id input? how to reference?
  const SQL =
    "INSERT into articles(id, title, body) VALUES ($1, $2, $3, $4) returning *";
  const response = await client.query(SQL, [uuid(), author_id, title, body]);
  return response.rows;
};

module.exports = {
  sync,
  readArticles,
  readArticle,
  deleteArticle,
  createArticle,
  updateArticle,
  readAuthors,
  readAuthor,
  deleteAuthor,
  createAuthor,
  updateAuthor
};
