const leadModel = require('../models/LeadModel');
const excelJS = require("exceljs");

const get = async (req, res) => {
    const {id} = req.params;

    const [leads] = await leadModel.get(id);
    return res.status(200).json(leads);
};

const insert = async (req, res) => {
    const created = await leadModel.insert(req.body);
    return res.status(201).json(created);
}

const deleteLead = async (req, res) => {
    const {id} = req.params;

    await leadModel.deleteLead(id);
    return res.status(204).json();
}

const exportExcel = async(req, res) => {
    const workbook = new excelJS.Workbook();
    const worksheet = workbook.addWorksheet("Leads");

    const path = "./downloads";

    // Column for data in excel. key must match data key
    worksheet.columns = [
        { header: "Id", key: "id", width: 10 }, 
        { header: "Nome", key: "name", width: 30 },
        { header: "E-mail", key: "email", width: 30 },
        { header: "Telefone", key: "phone", width: 20 }
    ];

    let [leads] = await leadModel.get();

    for (let index = 0; index < leads.length; index++) {
        worksheet.addRow(leads[index]);
        
    }

    // Cabeçalho em negrito
    worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
    });

    try {
        const data = await workbook.xlsx.writeFile(`${path}/leads_${new Date().getTime()}.xlsx`)
         .then(() => {
           res.send({
             status: "success",
             message: "Download realizado com sucesso.",
             path: `${path}/leads_${new Date().getTime()}.xlsx`,
            });
         });
    } catch (err) {
        res.send({
            status: "error",
            message: err,
        });
    }

}

module.exports = {
    get,
    insert,
    deleteLead,
    exportExcel
};