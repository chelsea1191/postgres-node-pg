DROP TABLE IF EXISTS articles;
DROP TABLE IF EXISTS authors;

CREATE TABLE authors
(
  id UUID PRIMARY KEY,
  first_name VARCHAR,
  last_name VARCHAR,
  date_created TIMESTAMP default CURRENT_TIMESTAMP
);

CREATE TABLE articles
(
  id UUID PRIMARY KEY,
  title VARCHAR,
  body VARCHAR,
  date_created TIMESTAMP default CURRENT_TIMESTAMP,
  author_id UUID references authors(id)
);
