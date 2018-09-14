/*
    All data tables creation
*/

CREATE TABLE ${schema~}.organization
(
    id INTEGER PRIMARY KEY,
    name text NOT NULL,
    token text NOT NULL
);

CREATE TABLE ${schema~}.supervisor
(
    id INTEGER PRIMARY KEY,
    name text NOT NULL,
    lastname text NOT NULL,
    email text,
    username text,
    password text,
    id_organization INTEGER REFERENCES organization(id)
);

CREATE TABLE ${schema~}.operator
(
    id INTEGER PRIMARY KEY,
    name text NOT NULL,
    lastname text NOT NULL,
    email text ,
    username text,
    password text,
    id_organization INTEGER REFERENCES organization(id)

);

CREATE TABLE ${schema~}.project 
(
    id INTEGER PRIMARY KEY,
    Date text,
    name text NOT NULL,
    id_supervisor INTEGER REFERENCES supervisor(id)
);

CREATE TABLE ${schema~}.junction 
(
    id INTEGER PRIMARY KEY,
    id_project  INTEGER REFERENCES project(id)
);

CREATE TABLE ${schema~}.session 
(
     id INTEGER PRIMARY KEY,
     date text,
     start_time text,
     end_time text,
     id_junction INTEGER REFERENCES junction(id)
);
CREATE TABLE ${schema~}.avenue 
(
    id INTEGER PRIMARY KEY,
    name text NOT NULL,

);
CREATE TABLE ${schema~}.lane
(
    id INTEGER PRIMARY KEY,
    description text,
    id_avenue INTEGER REFERENCES avenue(id)
);

CREATE TABLE ${schema~}.lanes_count 
(
    id INTEGER PRIMARY KEY,
    id_operator INTEGER REFERENCES operator(id),
    id_lane INTEGER REFERENCES lane(id),
    id_session INTEGER REFERENCES session(id)
);

CREATE TABLE ${schema~}.cars_count 
(
        id INTEGER PRIMARY KEY,
        hour text,
        type text,
        turn text,
        id_lanes_count INTEGER REFERENCES lanes_count(id)
);



