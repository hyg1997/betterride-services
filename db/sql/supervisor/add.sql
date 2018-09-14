INSERT INTO ${schema~}.supervisor(name,lastname,email,username,password,id_organization)
VALUES($1, $2, $3, $4, $5, $6)
RETURNING *
