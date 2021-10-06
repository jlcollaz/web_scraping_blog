const { info } = require('console');
const fs = require('fs');

let save_info = {
    table: []
};

let student = { 
    name: 'Mike',
    age: 23, 
    gender: 'Male',
    department: 'English',
    car: 'Honda' 
};

let student2 = { 
    name: 'sadsaMike',
    age: 25, 
    gender: 'Male',
    department: 'English',
    car: 'Honda' 
};

save_info.table.push(student);
save_info.table.push(student2);
 
let data = JSON.stringify(save_info);
fs.writeFileSync('info.json', data);