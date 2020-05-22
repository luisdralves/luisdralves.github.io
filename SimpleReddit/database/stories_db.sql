CREATE TABLE users (
    id_user INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR NOT NULL,
    password VARCHAR NOT NULL
);
CREATE TABLE stories (
    id_story INTEGER PRIMARY KEY,
    id_user VARCHAR REFERENCES users NOT NULL,
    published DATE NOT NULL,
    title VARCHAR NOT NULL,
    brief_intro VARCHAR NOT NULL,
    storie_text VARCHAR NOT NULL,
    plus INTEGER NOT NULL
);
CREATE TABLE comments (
    id_comment INTEGER,
    id_story INTEGER,
    id_user INTEGER REFERENCES users NOT NULL,
    published DATE NOT NULL,
    comment_text VARCHAR NOT NULL,
    plus INTEGER NOT NULL,
    PRIMARY KEY(id_comment, id_story)
);

CREATE TABLE comment_upvotes (
    id_comment INTEGER REFERENCES comments NOT NULL,
    id_story INTEGER REFERENCES comments NOT NULL,
    id_user VARCHAR REFERENCES users NOT NULL,
    PRIMARY KEY(id_comment, id_story, id_user)
);

CREATE TABLE comment_downvotes (
    id_comment INTEGER REFERENCES comments NOT NULL,
    id_story INTEGER REFERENCES comments NOT NULL,
    id_user VARCHAR REFERENCES users NOT NULL,
    PRIMARY KEY(id_comment, id_story, id_user)
);

CREATE TABLE story_upvotes (
    id_story INTEGER REFERENCES comments NOT NULL,
    id_user VARCHAR REFERENCES users NOT NULL,
    PRIMARY KEY(id_story, id_user)
);

CREATE TABLE story_downvotes (
    id_story INTEGER REFERENCES comments NOT NULL,
    id_user VARCHAR REFERENCES users NOT NULL,
    PRIMARY KEY(id_story, id_user)
);

INSERT INTO users (username, password) VALUES(
    'Ben1',
    '$2y$10$KX8Y6B.hTt8/Q5nOZ7UYE.DLA4daQebEfTUEgQjo2O9ChLqusLcC2'
);
INSERT INTO users (username, password) VALUES(
    'Ben2',
    '$2y$10$rymZ.pE.SmfSHHONEwid4OBr7qg/FmbWKJMFpYle2Wh/4jbq5RkS6'
);
INSERT INTO users (username, password) VALUES(
    'Ben3',
    '$2y$10$gjJ9rz9Kwu2o/u1Aojkqy.ObrCEReIFObk0NX61givwZJzXP.v2oe'
);

INSERT INTO stories VALUES(
    1,
    1,
    '2007-01-01 10:00:00',
    'Lorem ipsum dolor sit amet',
    'Aenean sed euismod risus. Sed laoreet tellus eu sem tempus commodo. Curabitur ultricies mauris vitae enim accumsan sollicitudin.',
    'Phasellus tincidunt ipsum quis libero finibus, quis vulputate neque interdum. Sed et vehicula dui. Vivamus tristique ante at lorem tincidunt fermentum. Aliquam erat volutpat. Cras ut dolor bibendum, viverra sem eget, laoreet mi. Mauris et augue sit amet odio dapibus accumsan. Interdum et malesuada fames ac ante ipsum primis in faucibus. Phasellus vitae quam auctor, mattis nisi vel, sodales ipsum. Ut ac ullamcorper dolor. Cras ultricies risus eget nunc laoreet, vehicula vestibulum felis eleifend. Fusce ornare tortor ante, eu vulputate elit pellentesque at.',
    1
);
INSERT INTO stories VALUES(
    2,
    3,
    '2007-04-05 13:45:12',
    'Proin libero ipsum, porttitor in nunc sit amet',
    'Quisque et quam tempor, tempus augue id, ullamcorper nisl. Class aptent taciti sociosqu ad litora torquent per conubia nostra',
    'Morbi sit amet dignissim nisl. Nam ornare risus eu erat vehicula pretium. Donec ut faucibus ex, nec ultricies nunc. Ut purus felis, vehicula vel elit congue, placerat cursus nunc. Vestibulum gravida orci id ligula placerat, eu pulvinar sem pharetra. Proin pulvinar, ipsum at molestie condimentum, ligula ante cursus ligula, congue blandit ex libero nec ipsum. Donec sit amet tortor hendrerit, mattis est eu, scelerisque nibh. Mauris vitae eros velit. Integer vitae semper mauris. Proin ornare ex quis diam feugiat, a euismod quam fermentum. Nam lobortis ultricies interdum.',
    1
);

INSERT INTO comments VALUES(
    1,
    1,
    2,
    '2007-01-01 12:34:10',
    'Suspendisse vitae nisl lectus. Etiam hendrerit.',
    1
);
INSERT INTO comments VALUES(
    2,
    1,
    1,
    '2007-01-01 12:38:34',
    'Non iaculis nisl dui id augue..',
    1
);
INSERT INTO comments VALUES(
    3,
    1,
    2,
    '2007-01-01 13:12:37',
    'In ultrices diam elit. Aenean nunc eros, dapibus at nisl non, ultrices facilisis purus.',
    1
);

INSERT INTO comments VALUES(
    1,
    2,
    1,
    '2007-04-05 17:34:11',
    'Aliquam eget mauris massa. Vestibulum nisi velit, sollicitudin eu odio quis, fermentum lobortis libero.',
    1
);

INSERT INTO comment_upvotes VALUES(1,1,2);
INSERT INTO comment_upvotes VALUES(2,1,1);
INSERT INTO comment_upvotes VALUES(3,1,2);
INSERT INTO comment_upvotes VALUES(1,2,1);

INSERT INTO story_upvotes VALUES(1,1);
INSERT INTO story_upvotes VALUES(2,3);