
INSERT INTO ${schema~}.organization(name, token)
VALUES($1, $2)
RETURNING *
