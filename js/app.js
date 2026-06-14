// Pioneer Logisticz Fleet Management System

let trucks = JSON.parse(localStorage.getItem("trucks")) || [];

// Add Truck
function addTruck() {

    const truckId = document.getElementById("truckId");
    const plate = document.getElementById("plate");
    const model = document.getElementById("model");
    const status = document.getElementById("status");

    if (!truckId || !plate || !model || !status) return;

    if (
        truckId.value === "" ||
        plate.value === "" ||
        model.value === ""
    ) {
        alert("Please fill in all fields.");
        return;
    }

    trucks.push({
        truckId: truckId.value,
        plate: plate.value,
        model: model.value,
        status: status.value
    });

    localStorage.setItem(
        "trucks",
        JSON.stringify(trucks)
    );

    truckId.value = "";
    plate.value = "";
    model.value = "";
    status.value = "Available";

    displayTrucks();
    updateDashboard();
}

// Display Trucks
function displayTrucks() {

    const table = document.getElementById("truckTable");

    if (!table) return;

    table.innerHTML = "";

    trucks.forEach((truck, index) => {

        table.innerHTML += `
        <tr>
            <td>${truck.truckId}</td>
            <td>${truck.plate}</td>
            <td>${truck.model}</td>
            <td>${truck.status}</td>
            <td>
                <button onclick="deleteTruck(${index})">
                    Delete
                </button>
            </td>
        </tr>
        `;
    });
}

// Delete Truck
function deleteTruck(index) {

    trucks.splice(index, 1);

    localStorage.setItem(
        "trucks",
        JSON.stringify(trucks)
    );

    displayTrucks();
    updateDashboard();
}

// Dashboard Counter
function updateDashboard() {

    const totalTrucks =
        document.getElementById("totalTrucks");

    if (totalTrucks) {
        totalTrucks.textContent = trucks.length;
    }
}

// Load Everything
displayTrucks();
updateDashboard();
// ======================
// DRIVER MANAGEMENT
// ======================

let drivers =
JSON.parse(localStorage.getItem("drivers")) || [];

function addDriver() {

    const name =
    document.getElementById("driverName");

    const phone =
    document.getElementById("driverPhone");

    const license =
    document.getElementById("driverLicense");

    if (!name || !phone || !license) return;

    if (
        name.value === "" ||
        phone.value === "" ||
        license.value === ""
    ) {
        alert("Please fill all fields");
        return;
    }

    drivers.push({
        name: name.value,
        phone: phone.value,
        license: license.value
    });

    localStorage.setItem(
        "drivers",
        JSON.stringify(drivers)
    );

    name.value = "";
    phone.value = "";
    license.value = "";

    displayDrivers();
}

function displayDrivers() {

    const table =
    document.getElementById("driverTable");

    if (!table) return;

    table.innerHTML = "";

    drivers.forEach((driver,index)=>{

        table.innerHTML += `
        <tr>
            <td>${driver.name}</td>
            <td>${driver.phone}</td>
            <td>${driver.license}</td>
            <td>
                <button onclick="deleteDriver(${index})">
                Delete
                </button>
            </td>
        </tr>
        `;
    });
}

function deleteDriver(index){

    drivers.splice(index,1);

    localStorage.setItem(
        "drivers",
        JSON.stringify(drivers)
    );

    displayDrivers();
}

displayDrivers();
