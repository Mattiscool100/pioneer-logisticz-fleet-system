// ===== STORAGE MANAGEMENT =====
const storage = {
    trucks: JSON.parse(localStorage.getItem('trucks')) || [],
    drivers: JSON.parse(localStorage.getItem('drivers')) || [],
    trips: JSON.parse(localStorage.getItem('trips')) || [],
    maintenance: JSON.parse(localStorage.getItem('maintenance')) || [],
    fuel: JSON.parse(localStorage.getItem('fuel')) || []
};

// Save to localStorage
function saveToStorage() {
    localStorage.setItem('trucks', JSON.stringify(storage.trucks));
    localStorage.setItem('drivers', JSON.stringify(storage.drivers));
    localStorage.setItem('trips', JSON.stringify(storage.trips));
    localStorage.setItem('maintenance', JSON.stringify(storage.maintenance));
    localStorage.setItem('fuel', JSON.stringify(storage.fuel));
}

// ===== TRUCK MANAGEMENT =====
function addTruck() {
    const truckId = document.getElementById('truckId')?.value.trim();
    const plate = document.getElementById('plate')?.value.trim();
    const model = document.getElementById('model')?.value.trim();
    const status = document.getElementById('status')?.value || 'Available';

    if (!truckId || !plate || !model) {
        showAlert('Please fill in all truck fields', 'error');
        return;
    }

    // Check if truck already exists
    if (storage.trucks.find(t => t.truckId === truckId)) {
        showAlert('Truck ID already exists', 'error');
        return;
    }

    storage.trucks.push({ truckId, plate, model, status });
    saveToStorage();
    showAlert('Truck added successfully!', 'success');
    
    // Clear form
    document.getElementById('truckId').value = '';
    document.getElementById('plate').value = '';
    document.getElementById('model').value = '';
    document.getElementById('status').value = 'Available';
    
    loadTrucks();
    updateDashboard();
}

function loadTrucks() {
    const tbody = document.getElementById('truckTable');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    storage.trucks.forEach(truck => {
        const row = `
            <tr>
                <td>${truck.truckId}</td>
                <td>${truck.plate}</td>
                <td>${truck.model}</td>
                <td><span class="status-${truck.status.toLowerCase().replace(' ', '-')}">${truck.status}</span></td>
                <td><button onclick="deleteTruck('${truck.truckId}')">Delete</button></td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

function deleteTruck(truckId) {
    if (confirm('Are you sure you want to delete this truck?')) {
        storage.trucks = storage.trucks.filter(t => t.truckId !== truckId);
        saveToStorage();
        showAlert('Truck deleted successfully!', 'success');
        loadTrucks();
        updateDashboard();
    }
}

// ===== DRIVER MANAGEMENT =====
function addDriver() {
    const driverName = document.getElementById('driverName')?.value.trim();
    const driverPhone = document.getElementById('driverPhone')?.value.trim();
    const driverLicense = document.getElementById('driverLicense')?.value.trim();

    if (!driverName || !driverPhone || !driverLicense) {
        showAlert('Please fill in all driver fields', 'error');
        return;
    }

    // Check if driver already exists
    if (storage.drivers.find(d => d.driverLicense === driverLicense)) {
        showAlert('Driver license already exists', 'error');
        return;
    }

    storage.drivers.push({ driverName, driverPhone, driverLicense });
    saveToStorage();
    showAlert('Driver added successfully!', 'success');
    
    // Clear form
    document.getElementById('driverName').value = '';
    document.getElementById('driverPhone').value = '';
    document.getElementById('driverLicense').value = '';
    
    loadDrivers();
    updateDashboard();
}

function loadDrivers() {
    const tbody = document.getElementById('driverTable');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    storage.drivers.forEach((driver, index) => {
        const row = `
            <tr>
                <td>${driver.driverName}</td>
                <td>${driver.driverPhone}</td>
                <td>${driver.driverLicense}</td>
                <td><button onclick="deleteDriver(${index})">Delete</button></td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

function deleteDriver(index) {
    if (confirm('Are you sure you want to delete this driver?')) {
        storage.drivers.splice(index, 1);
        saveToStorage();
        showAlert('Driver deleted successfully!', 'success');
        loadDrivers();
        updateDashboard();
    }
}

// ===== TRIP MANAGEMENT =====
function addTrip() {
    const tripId = document.getElementById('tripId')?.value.trim();
    const origin = document.getElementById('origin')?.value.trim();
    const destination = document.getElementById('destination')?.value.trim();
    const assignedTruck = document.getElementById('assignedTruck')?.value.trim();
    const assignedDriver = document.getElementById('assignedDriver')?.value.trim();
    const cargoDescription = document.getElementById('cargoDescription')?.value.trim();
    const tripDate = document.getElementById('tripDate')?.value;
    const tripStatus = document.getElementById('tripStatus')?.value || 'Scheduled';

    if (!tripId || !origin || !destination || !assignedTruck || !assignedDriver || !cargoDescription || !tripDate) {
        showAlert('Please fill in all trip fields', 'error');
        return;
    }

    // Check if trip already exists
    if (storage.trips.find(t => t.tripId === tripId)) {
        showAlert('Trip ID already exists', 'error');
        return;
    }

    storage.trips.push({ 
        tripId, 
        origin, 
        destination, 
        assignedTruck, 
        assignedDriver, 
        cargoDescription, 
        tripDate, 
        tripStatus 
    });
    saveToStorage();
    showAlert('Trip created successfully!', 'success');
    
    // Clear form
    document.getElementById('tripId').value = '';
    document.getElementById('origin').value = '';
    document.getElementById('destination').value = '';
    document.getElementById('assignedTruck').value = '';
    document.getElementById('assignedDriver').value = '';
    document.getElementById('cargoDescription').value = '';
    document.getElementById('tripDate').value = '';
    document.getElementById('tripStatus').value = 'Scheduled';
    
    loadTrips();
    updateDashboard();
}

function loadTrips() {
    const tbody = document.getElementById('tripTable');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    storage.trips.forEach(trip => {
        const route = `${trip.origin} → ${trip.destination}`;
        const row = `
            <tr>
                <td>${trip.tripId}</td>
                <td>${trip.assignedTruck}</td>
                <td>${trip.assignedDriver}</td>
                <td>${route}</td>
                <td>${trip.cargoDescription}</td>
                <td><span class="status-${trip.tripStatus.toLowerCase().replace(' ', '-')}">${trip.tripStatus}</span></td>
                <td><button onclick="deleteTrip('${trip.tripId}')">Delete</button></td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

function deleteTrip(tripId) {
    if (confirm('Are you sure you want to delete this trip?')) {
        storage.trips = storage.trips.filter(t => t.tripId !== tripId);
        saveToStorage();
        showAlert('Trip deleted successfully!', 'success');
        loadTrips();
        updateDashboard();
    }
}

// ===== MAINTENANCE MANAGEMENT =====
function scheduleMaintenance() {
    const truckId = document.getElementById('maintenanceTruckId')?.value.trim();
    const maintenanceType = document.getElementById('maintenanceType')?.value || 'Oil Change';
    const maintenanceDate = document.getElementById('maintenanceDate')?.value;
    const estimatedCost = document.getElementById('estimatedCost')?.value.trim();
    const maintenanceNotes = document.getElementById('maintenanceNotes')?.value.trim();

    if (!truckId || !maintenanceDate || !estimatedCost) {
        showAlert('Please fill in all required maintenance fields', 'error');
        return;
    }

    storage.maintenance.push({ 
        truckId, 
        maintenanceType, 
        maintenanceDate, 
        estimatedCost,
        maintenanceNotes,
        status: 'Scheduled'
    });
    saveToStorage();
    showAlert('Maintenance scheduled successfully!', 'success');
    
    // Clear form
    document.getElementById('maintenanceTruckId').value = '';
    document.getElementById('maintenanceType').value = 'Oil Change';
    document.getElementById('maintenanceDate').value = '';
    document.getElementById('estimatedCost').value = '';
    document.getElementById('maintenanceNotes').value = '';
    
    loadMaintenance();
    updateDashboard();
}

function loadMaintenance() {
    const tbody = document.getElementById('maintenanceTable');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    storage.maintenance.forEach((maint, index) => {
        const row = `
            <tr>
                <td>${maint.truckId}</td>
                <td>${maint.maintenanceType}</td>
                <td>${formatDate(maint.maintenanceDate)}</td>
                <td>${maint.estimatedCost} TZS</td>
                <td><span class="status-${maint.status.toLowerCase().replace(' ', '-')}">${maint.status}</span></td>
                <td><button onclick="deleteMaintenance(${index})">Delete</button></td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

function deleteMaintenance(index) {
    if (confirm('Are you sure you want to delete this maintenance record?')) {
        storage.maintenance.splice(index, 1);
        saveToStorage();
        showAlert('Maintenance record deleted successfully!', 'success');
        loadMaintenance();
        updateDashboard();
    }
}

// ===== FUEL MANAGEMENT =====
function recordFuel() {
    const fuelTruckId = document.getElementById('fuelTruckId')?.value.trim();
    const fuelDate = document.getElementById('fuelDate')?.value;
    const litersPurchased = parseFloat(document.getElementById('litersPurchased')?.value);
    const fuelCost = parseFloat(document.getElementById('fuelCost')?.value);
    const odometerReading = parseFloat(document.getElementById('odometerReading')?.value);

    if (!fuelTruckId || !fuelDate || !litersPurchased || !fuelCost || !odometerReading) {
        showAlert('Please fill in all fuel fields', 'error');
        return;
    }

    storage.fuel.push({ 
        fuelTruckId, 
        fuelDate, 
        litersPurchased,
        fuelCost,
        odometerReading
    });
    saveToStorage();
    showAlert('Fuel record saved successfully!', 'success');
    
    // Clear form
    document.getElementById('fuelTruckId').value = '';
    document.getElementById('fuelDate').value = '';
    document.getElementById('litersPurchased').value = '';
    document.getElementById('fuelCost').value = '';
    document.getElementById('odometerReading').value = '';
    
    loadFuel();
    updateDashboard();
}

function loadFuel() {
    const tbody = document.getElementById('fuelTable');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    storage.fuel.forEach((fuel, index) => {
        const row = `
            <tr>
                <td>${fuel.fuelTruckId}</td>
                <td>${formatDate(fuel.fuelDate)}</td>
                <td>${fuel.litersPurchased} L</td>
                <td>${fuel.fuelCost} TZS</td>
                <td>${fuel.odometerReading} KM</td>
                <td><button onclick="deleteFuel(${index})">Delete</button></td>
            </tr>
        `;
        tbody.innerHTML += row;
    });

    updateFuelSummary();
}

function deleteFuel(index) {
    if (confirm('Are you sure you want to delete this fuel record?')) {
        storage.fuel.splice(index, 1);
        saveToStorage();
        showAlert('Fuel record deleted successfully!', 'success');
        loadFuel();
        updateDashboard();
    }
}

// ===== DASHBOARD UPDATES =====
function updateDashboard() {
    // Total Trucks
    const totalTrucksEl = document.getElementById('totalTrucks');
    if (totalTrucksEl) totalTrucksEl.textContent = storage.trucks.length;

    // Trip statistics
    if (document.getElementById('totalTrips')) {
        document.getElementById('totalTrips').textContent = storage.trips.length;
    }
    if (document.getElementById('tripsInTransit')) {
        document.getElementById('tripsInTransit').textContent = storage.trips.filter(t => t.tripStatus === 'In Transit').length;
    }
    if (document.getElementById('tripsLoading')) {
        document.getElementById('tripsLoading').textContent = storage.trips.filter(t => t.tripStatus === 'Loading').length;
    }
    if (document.getElementById('tripsDelivered')) {
        document.getElementById('tripsDelivered').textContent = storage.trips.filter(t => t.tripStatus === 'Delivered').length;
    }
}

function updateFuelSummary() {
    const totalFuel = storage.fuel.reduce((sum, f) => sum + f.litersPurchased, 0);
    const totalCost = storage.fuel.reduce((sum, f) => sum + f.fuelCost, 0);
    const avgCost = totalFuel > 0 ? (totalCost / totalFuel).toFixed(0) : 0;

    const totalFuelEl = document.getElementById('totalFuel');
    const totalFuelCostEl = document.getElementById('totalFuelCost');
    const avgCostPerLiterEl = document.getElementById('avgCostPerLiter');

    if (totalFuelEl) totalFuelEl.textContent = totalFuel.toFixed(1);
    if (totalFuelCostEl) totalFuelCostEl.textContent = totalCost.toLocaleString();
    if (avgCostPerLiterEl) avgCostPerLiterEl.textContent = avgCost.toLocaleString();
}

// ===== UTILITY FUNCTIONS =====
function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    alertDiv.style.position = 'fixed';
    alertDiv.style.top = '20px';
    alertDiv.style.right = '20px';
    alertDiv.style.zIndex = '9999';
    alertDiv.style.minWidth = '300px';
    document.body.appendChild(alertDiv);

    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}

function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
}

// ===== INITIALIZE PAGE =====
function initPage() {
    loadTrucks();
    loadDrivers();
    loadTrips();
    loadMaintenance();
    loadFuel();
    updateDashboard();
}

// Load data when page loads
document.addEventListener('DOMContentLoaded', initPage);
