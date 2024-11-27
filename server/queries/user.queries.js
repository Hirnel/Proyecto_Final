module.exports = {
    getAllUsers: 'SELECT * FROM users;',
    getUserByEmail: 'SELECT * FROM users WHERE email = $1;',
    createUser: 'INSERT INTO users (username, email, password, img) VALUES ($1, $2, $3, $4);',
    updateUserByEmail: `
        UPDATE users 
        SET username = $1, email = $2, password = $3, img = $4
        WHERE email = $5;
    `,
    deleteUserByEmail: 'DELETE FROM users WHERE email = $1;',
};
