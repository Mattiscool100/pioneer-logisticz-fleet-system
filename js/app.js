// Pioneer Logisticz Fleet Management System

let trucks = JSON.parse(localStorage.getItem("trucks")) || [];

// Add Truck
function addTruck() {

    const truckId = document.getElementById("truckId").value;
    const plate = document.getElementById("plate").value;
    const model = document.getElementById("model").value;
    const status = document.getElementById("status").value;

    if (!truckId || !plate || !model) {
        alert("Please fill in all fields.");
        return;
    }

    const truck = {
        truckId: truckId,
        plate: plate,
        model: model,
        status: status
    };

    trucks.push(truck);

    localStorage.setItem("trucks", JSON.stringify(trucks));

    document.getElementById("truckId").value = "";
    document.getElementById("plate").value = "";
    document.getElementById("model").value = "";
    document.getElementById("status").value = "Available";

    displayTrucks();
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

    if (confirm("Delete this truck?")) {

        trucks.splice(index, 1);

        localStorage.setItem(
            "trucks",
            JSON.stringify(trucks)
        );

        displayTrucks();
    }
}

// Dashboard Statistics
function updateDashboard() {

    const totalTrucks = document.getElementById("totalTrucks");

    if (totalTrucks) {
        totalTrucks.textContent = trucks.length;
    }
}

// Load Data
displayTrucks();
updateDashboard();
