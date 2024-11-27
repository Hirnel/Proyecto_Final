const queries = {
    getAuthorByEmail: `
    SELECT name,surname,image,email
    FROM authors
    WHERE email=$1;`,
    getAllAuthors: `SELECT a.name,a.surname,a.image,a.email 
    FROM authors AS a
    ORDER BY a.name;`,
    createEntry: `INSERT INTO entries(title,content,id_author,category) 
    VALUES ($1,$2,
    (SELECT id_author FROM authors WHERE email=$3),$4)
    `,
    updateEntryByTitle: `UPDATE entries
    SET title = $1, content = $2, category = $3
    WHERE title = $4
    RETURNING *;`,
    deleteEntryByTitle: `DELETE FROM entries
    WHERE title = $1
    RETURNING *;
    `,
    
}
module.exports = queries;