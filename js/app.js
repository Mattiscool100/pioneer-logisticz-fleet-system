let trucks = JSON.parse(localStorage.getItem("trucks")) || [];

function addTruck() {
    const truckId = document.getElementById("truckId").value;
    const plate = document.getElementById("plate").value;
    const model = document.getElementById("model").value;
    const status = document.getElementById("status").value;

    const truck = {
        truckId,
        plate,
        model,
        status
    };

    trucks.push(truck);

    localStorage.setItem("trucks", JSON.stringify(trucks));

    displayTrucks();
}

function displayTrucks() {
    const table = document.getElementById("truckTable");

    if (!table) return;

    table.innerHTML = "";

    trucks.forEach(truck => {
        table.innerHTML += `
            <tr>
                <td>${truck.truckId}</td>
                <td>${truck.plate}</td>
                <td>${truck.model}</td>
                <td>${truck.status}</td>
            </tr>
        `;
    });
}
