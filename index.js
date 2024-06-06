const ExcelJS = require('exceljs');

async function readExcelFile(filePath) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet(1);
    
    let rows = [];

    // Get the header row
    const headerRow = worksheet.getRow(1).values;
    
    worksheet.eachRow((row, rowNumber) => {
        if (rowNumber === 1) return; // Skip the header row
        
        let rowObject = {};
        row.values.forEach((value, index) => {
            const columnName = headerRow[index];
            rowObject[columnName] = value;
        });
        rows.push(rowObject);
    });

    return rows;
}

const filePath = 'MOCK_DATA.xlsx';

readExcelFile(filePath).then(rows => {
    console.log(rows);
}).catch(err => {
    console.error(err);
});
