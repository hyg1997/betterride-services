/*
    All data tables creation
*/

CREATE TABLE public.organization
(
    id SERIAL PRIMARY KEY ,
    name text NOT NULL,
    token text NOT NULL
);

CREATE TABLE public.supervisor
(
    id SERIAL PRIMARY KEY,
    name text NOT NULL,
    lastname text NOT NULL,
    email text,
    username text,
    password text,
    id_organization INTEGER REFERENCES organization(id)
);

CREATE TABLE public.operator
(
    id SERIAL PRIMARY KEY,
    name text NOT NULL,
    lastname text NOT NULL,
    email text ,
    username text,
    password text,
    id_organization INTEGER REFERENCES organization(id)

);

CREATE TABLE public.project 
(
    id SERIAL PRIMARY KEY,
    Date text,
    name text NOT NULL,
    id_supervisor INTEGER REFERENCES supervisor(id)
);

CREATE TABLE public.junction 
(
    id SERIAL PRIMARY KEY,
    id_project  INTEGER REFERENCES project(id)
);

CREATE TABLE public.session 
(
     id SERIAL PRIMARY KEY,
     date text,
     start_time text,
     end_time text,
     id_junction INTEGER REFERENCES junction(id)
);
CREATE TABLE public.avenue 
(
    id SERIAL PRIMARY KEY,
    name text NOT NULL,

);
CREATE TABLE public.lane
(
    id SERIAL PRIMARY KEY,
    description text,
    id_avenue INTEGER REFERENCES avenue(id)
);

CREATE TABLE public.lanes_count 
(
    id SERIAL PRIMARY KEY,
    id_operator INTEGER REFERENCES operator(id),
    id_lane INTEGER REFERENCES lane(id),
    id_session INTEGER REFERENCES session(id)
);

CREATE TABLE public.cars_count 
(
        id SERIAL PRIMARY KEY,
        hour text,
        type text,
        turn text,
        id_lanes_count INTEGER REFERENCES lanes_count(id)
);
