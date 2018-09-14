'use strict';

const sql = require('../sql').organization;

const cs = {}; // Reusable ColumnSet objects.

/*
 This repository mixes hard-coded and dynamic SQL, primarily to show a diverse example of using both.
 */

class OrganizationRepository {
    constructor(db, pgp) {
        this.db = db;
        this.pgp = pgp;

        // set-up all ColumnSet objects, if needed:
        createColumnsets(pgp);
    }

    // Adds a new user, and returns the new object;
    add(values) {
        return this.db.one(sql.add,[values.name,values.token]);
    }

    // Tries to find a user from id;
    findById(id) {
        return this.db.oneOrNone('SELECT * FROM organization WHERE id = $1', +id);
    }

    // Tries to find a user from name;
    findByName(name) {
        return this.db.oneOrNone('SELECT * FROM organization WHERE name = $1', name);
    }

    // Tries to find a user from token;
    findByToken(token) {
        return this.db.oneOrNone('SELECT * FROM organization WHERE token = $1', token);
    }

    // Returns all user records;
    all() {
        return this.db.any('SELECT * FROM organization');
    }

    // Returns the total number of users;
    total() {
        return this.db.one('SELECT count(*) FROM organization', [], a => +a.count);
    }
}

//////////////////////////////////////////////////////////
// Example of statically initializing ColumnSet objects:

function createColumnsets(pgp) {
    // create all ColumnSet objects only once:
    if (!cs.insert) {
        // Type TableName is useful when schema isn't default "public" ,
        // otherwise you can just pass in a string for the table name.
        const table = new pgp.helpers.TableName({table: 'organization', schema: 'public'});

        cs.insert = new pgp.helpers.ColumnSet(['name','token'], {table});
        cs.update = cs.insert.extend(['?id']);
    }
    return cs;
}

module.exports = OrganizationRepository;
