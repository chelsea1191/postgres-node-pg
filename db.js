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

///////////////////////author methods
const readAuthors = async () => {
  //console.log("made it to read authors");
  const SQL = "SELECT * FROM authors";
  const response = await client.query(SQL);
  return response.rows;
};
const deleteAuthor = async id => {
  //console.log("made it to delete authors");
  const SQL = "DELETE FROM authors WHERE id = $1";
  await client.query(SQL, [id]);
};
const updateAuthor = async author => {
  console.log("made it to update authors");
  const SQL = "UPDATE authors set first_name = $1 WHERE id = $2 returning *";
  const response = await client.query(SQL, [author.first_name, author.id]);
  return response.rows[0];
};
const readAuthor = async id => {
  //console.log("made it to read author");
  const SQL = "SELECT * FROM authors WHERE id = $1";
  const response = await client.query(SQL, [id]);
  return response.rows;
};
const createAuthor = async (first_name, last_name) => {
  //console.log("made it to create authors");
  const SQL =
    "INSERT into authors(id, first_name, last_name) values($1, $2, $3) returning *";
  const response = await client.query(SQL, [uuid(), first_name, last_name]);
  return response.rows[0];
};

//////////////////////////article methods
// const readArticles = async () => {
//   console.log("made it to read articles");
//   const SQL = "SELECT * FROM articles";
//   const response = await client.query(SQL);
//   return response.rows;
// };
// const updateArticle = async article => {
//   console.log("made it to update articles");
//   const SQL =
//     "UPDATE articles set name = $1, author_id=$2 WHERE id = $3 returning *";
//   const response = await client.query(SQL, [
//     article.name,
//     article.author_id,
//     article.id
//   ]);
//   return response.rows[0];
// };
// const deleteArticle = async id => {
//   console.log("made it to delete articles");
//   const SQL = "DELETE FROM articles WHERE id = $1";
//   await client.query(SQL, [id]);
// };
// const readArticle = async id => {
//   console.log("made it to read article");
//   const SQL = "SELECT * FROM articles WHERE id=$1";
//   const response = await client.query(SQL, [id]);
//   return response.rows[0];
// };
// const createArticle = async (first_name, last_name, title, body) => {
//   console.log("made it to create articles");
//   //needs author id input? how to reference?
//   const SQL =
//     "INSERT into articles(id, title, body) VALUES ($1, $2, $3) returning *";
//   const response = await client.query(SQL, [uuid(), title, body]);
//   return response.rows[0];
//};

module.exports = {
  sync,
  // readArticles,
  // readArticle,
  // deleteArticle,
  // createArticle,
  // updateArticle,
  readAuthors,
  readAuthor,
  deleteAuthor,
  createAuthor,
  updateAuthor
};

// INSERT INTO authors
//   (first_name, last_name) VALUES('Karin', 'Abarbanel');
// INSERT INTO authors
//   (first_name, last_name) VALUES("Amy", "Jones");
// INSERT INTO authors
//   (first_name, last_name) VALUES("Elizabeth", "Atkinson");
// INSERT INTO authors
//   (first_name, last_name) VALUES("Jeanne", "Bowerman");
// INSERT INTO articles
//   (title, body) VALUES("Will's Way", "Four Timely Craft Tips");
// INSERT INTO articles
//   (title, body) VALUES("Vintage WD", "When Research Is a Monster");
// INSERT INTO articles
//   (title, body) VALUES("Shed Your Shame", "Overcoming Writing Fears");
// INSERT INTO articles
//   (title, body) VALUES("Screenwriter and Novelist", "Turned YA Author, Author Spotlight");
