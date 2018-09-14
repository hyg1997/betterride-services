
INSERT INTO ${schema~}.organization(name, token)
VALUES(${organizationtName}, ${organizationToken})
RETURNING *
