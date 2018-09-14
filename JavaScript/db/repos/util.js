'use strict';

const sql = require('../sql').util;

/*
 This repository mixes hard-coded and dynamic SQL, primarily to show a diverse example of using both.
 */

class UtilRepository {
    constructor(db) {
        this.db = db;
    }

    // Creates the table;
    create() {
        return this.db.none(sql.create);
    }
}

module.exports = OrganizationRepository;
