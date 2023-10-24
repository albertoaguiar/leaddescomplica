const connection = require("./connection");

const get = async (id) => {

    let query = '';
    if(id) {
        query = `SELECT id, name, phone, email, created_at FROM leads WHERE id=${id}`;
    } else {
        query = 'SELECT id, name, phone, email, created_at FROM leads';
    }
    const leads = await connection.execute(query);

    return leads;

};

const insert = async (lead) => {
    const {name, email, phone} = lead;
    const dateUTC = new Date(Date.now());

    const query = 'INSERT INTO leads(name, email, phone, created_at) VALUES (?, ?, ?, ?)';

    const [created] = await connection.execute(query, [name, email, phone, dateUTC]);

    return {id: created.insertId};
};

const deleteLead = async (id) => {
    const removedLead = await connection.execute('DELETE FROM leads WHERE id=?', [id]);
    return removedLead;
};

module.exports = {
    get,
    insert,
    deleteLead
};