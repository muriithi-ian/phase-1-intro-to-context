// Your code here
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
	return {
		firstName,
		familyName,
		title,
		payPerHour,
		timeOutEvents: [],
		timeInEvents: [],
	};
}

function createEmployeeRecords(employeeRecordRows) {
	return employeeRecordRows.map((row) => createEmployeeRecord(row));
}

function createTimeInEvent(employeeRecord, dateStamp) {
	const [date, time] = dateStamp.split(" ");

	employeeRecord.timeInEvents.push({
		type: "TimeIn",
		date,
		hour: parseInt(time),
	});
	return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateStamp) {
	const [date, time] = dateStamp.split(" ");

	employeeRecord.timeOutEvents.push({
		type: "TimeOut",
		date,
		hour: parseInt(time),
	});
	return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, soughtDate) {
	const timeIn = employeeRecord.timeInEvents.find(
		(time) => time.date === soughtDate
	);
	const timeOut = employeeRecord.timeOutEvents.find(
		(time) => time.date === soughtDate
	);

	// console.log(timeIn, timeOut);

	return parseInt((timeOut.hour - timeIn.hour) / 100);
}

//
// cRecord = createEmployeeRecord(["Julius", "Caesar", "General", 1000]);
// updatedBpRecord = createTimeInEvent(cRecord, "0044-03-15 0900");
// updatedBpRecord = createTimeOutEvent(cRecord, "0044-03-15 1100");
// console.log(hoursWorkedOnDate(cRecord, "0044-03-15"));
//

function wagesEarnedOnDate(employeeRecord, soughtDate) {
	return (
		hoursWorkedOnDate(employeeRecord, soughtDate) *
		parseFloat(employeeRecord.payPerHour)
	);
}

function allWagesFor(employeeRecord) {
	return employeeRecord.timeInEvents.reduce((accumulator, event) => {
		return accumulator + wagesEarnedOnDate(employeeRecord, event.date);
	}, 0);
}

// cRecord = createEmployeeRecord(["Julius", "Caesar", "General", 27]);
// // Earns 324
// updatedBpRecord = createTimeInEvent(cRecord, "0044-03-14 0900");
// updatedBpRecord = createTimeOutEvent(cRecord, "0044-03-14 2100");
// // Earns 54
// updatedBpRecord = createTimeInEvent(cRecord, "0044-03-15 0900");
// updatedBpRecord = createTimeOutEvent(cRecord, "0044-03-15 1100");
// console.log(allWagesFor(cRecord));

function calculatePayroll(arrayOfEmployeeRecords) {
	return arrayOfEmployeeRecords.reduce((accumulator, currentValue) => {
		return accumulator + allWagesFor(currentValue);
	}, 0);
}
