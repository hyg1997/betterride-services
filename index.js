'use strict';

const db = require('./db');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

// NOTE: We implement only GET handlers here, because:
//
// 1. This demo is to be tested by typing URL-s manually in the browser;
// 2. The demo's focus is on a proper database layer, not a web server.

//////////////////////////////////////////////
// Organizations Web API
//////////////////////////////////////////////
GET('/organizations/', () => db.organizations.all());
GET('/organizations/total', () => db.organizations.total());
GET('/organization/:id', req => db.organizations.findById(req.params.id));
GET('/organization', req => db.organizations.findByName({name: req.query.name}));
GET('/organization', req => db.organizations.findByToken({token: req.query.token}));
POST('/organization/', req => db.organizations.add(req.body));

//////////////////////////////////////////////
// Supervisors Web API
//////////////////////////////////////////////
GET('/supervisors/', () => db.supervisors.all());
GET('/supervisors/total', () => db.supervisors.total());
GET('/supervisor/:id', req => db.supervisors.findById(req.params.id));
GET('/supervisor', req => db.supervisors.findByName({name: req.query.name}));
POST('/supervisors/', req => db.supervisors.add(req.body));
DELETE('/supervisor/:id', req => db.supervisors.remove(req.params.id));


function GET(url, handler) {
    app.get(url, (req, res) => {
        handler(req)
            .then(data => {
                res.json({
                    response: 200,
                    data
                });
            })
            .catch(error => {
                res.json({
                    response: 400,
                    error: error.message || error
                });
            });
    });
}

function POST(url, handler) {
    app.post(url, (req, res) => {
        handler(req)
            .then(data => {
                res.json({
                    response: 201,
                    data
                });
            })
            .catch(error => {
                res.json({
                    response: 400,
                    error: error.message || error
                });
            });
    });
}

function DELETE(url, handler) {
    app.delete(url, (req, res) => {
        handler(req)
            .then(() => {
                res.json({
                    response: 204
                });
            })
            .catch(error => {
                res.json({
                    response: 400,
                    error: error.message || error
                });
            });
    });
}

const port = 323;

app.listen(port, () => {
    console.log('\nReady on http://localhost:' + port);
});
