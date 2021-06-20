import parseStrict from '../objectUtil/parseStrict.js';

class Person {
	empName = 'test';
	desc = '';
}

class Company {
	name: string = '';
	employees = [new Person()];

	display() {
		console.log('Name:' + this.name);
		this.employees.forEach((emp, idx) => {
			console.log('Employee ' + idx + ': ' + emp.empName);
		});
	}
}

var test = {
	name: 'test',
	employees: [
		{ empName: 'empName1', desc: 0 },
		{ empName: 'empName2' },
		{ empName: 'empName3,' }
	]
}

var res = parseStrict(test, new Company());

console.log(res);
