// ===== GENERATE REPORTS =====
function generateReports() {
    const storage = {
        trucks: JSON.parse(localStorage.getItem('trucks')) || [],
        drivers: JSON.parse(localStorage.getItem('drivers')) || [],
        trips: JSON.parse(localStorage.getItem('trips')) || [],
        maintenance: JSON.parse(localStorage.getItem('maintenance')) || [],
        fuel: JSON.parse(localStorage.getItem('fuel')) || []
    };

    // Fleet Statistics
    document.getElementById('reportTotalTrucks').textContent = storage.trucks.length;
    document.getElementById('reportTotalDrivers').textContent = storage.drivers.length;
    document.getElementById('reportTotalTrips').textContent = storage.trips.length;
    document.getElementById('reportTotalMaintenance').textContent = storage.maintenance.length;

    // Trip Statistics
    const tripsDelivered = storage.trips.filter(t => t.tripStatus === 'Delivered').length;
    const tripsInTransit = storage.trips.filter(t => t.tripStatus === 'In Transit').length;
    const tripsScheduled = storage.trips.filter(t => t.tripStatus === 'Scheduled').length;
    const tripsCancelled = storage.trips.filter(t => t.tripStatus === 'Cancelled').length;

    document.getElementById('reportTripsDelivered').textContent = tripsDelivered;
    document.getElementById('reportTripsInTransit').textContent = tripsInTransit;
    document.getElementById('reportTripsScheduled').textContent = tripsScheduled;
    document.getElementById('reportTripsCancelled').textContent = tripsCancelled;

    // Fuel Expenses
    const totalFuelLiters = storage.fuel.reduce((sum, f) => sum + f.litersPurchased, 0);
    const totalFuelCost = storage.fuel.reduce((sum, f) => sum + f.fuelCost, 0);
    const avgFuelCost = totalFuelLiters > 0 ? (totalFuelCost / totalFuelLiters).toFixed(0) : 0;

    document.getElementById('reportTotalFuelLiters').textContent = totalFuelLiters.toFixed(1) + ' L';
    document.getElementById('reportTotalFuelCost').textContent = totalFuelCost.toLocaleString() + ' TZS';
    document.getElementById('reportAvgFuelCost').textContent = avgFuelCost.toLocaleString() + ' TZS';

    // Maintenance Costs
    const maintenanceCount = storage.maintenance.length;
    const totalMaintenanceCost = storage.maintenance.reduce((sum, m) => sum + parseFloat(m.estimatedCost || 0), 0);
    const scheduledMaintenance = storage.maintenance.filter(m => m.status === 'Scheduled').length;

    document.getElementById('reportMaintenanceCount').textContent = maintenanceCount;
    document.getElementById('reportMaintenanceCost').textContent = totalMaintenanceCost.toLocaleString() + ' TZS';
    document.getElementById('reportScheduledMaintenance').textContent = scheduledMaintenance;
}

// ===== EXPORT TO CSV =====
function exportToCSV() {
    const storage = {
        trucks: JSON.parse(localStorage.getItem('trucks')) || [],
        drivers: JSON.parse(localStorage.getItem('drivers')) || [],
        trips: JSON.parse(localStorage.getItem('trips')) || [],
        maintenance: JSON.parse(localStorage.getItem('maintenance')) || [],
        fuel: JSON.parse(localStorage.getItem('fuel')) || []
    };

    let csv = 'Pioneer Logisticz - Fleet Management Report\n';
    csv += 'Generated: ' + new Date().toLocaleString() + '\n\n';

    // Trucks
    csv += 'TRUCKS\n';
    csv += 'Truck ID,License Plate,Model,Status\n';
    storage.trucks.forEach(truck => {
        csv += `${truck.truckId},${truck.plate},${truck.model},${truck.status}\n`;
    });

    csv += '\nDRIVERS\n';
    csv += 'Name,Phone,License Number\n';
    storage.drivers.forEach(driver => {
        csv += `${driver.driverName},${driver.driverPhone},${driver.driverLicense}\n`;
    });

    csv += '\nTRIPS\n';
    csv += 'Trip ID,Truck,Driver,Origin,Destination,Cargo,Status\n';
    storage.trips.forEach(trip => {
        csv += `${trip.tripId},${trip.assignedTruck},${trip.assignedDriver},${trip.origin},${trip.destination},${trip.cargoDescription},${trip.tripStatus}\n`;
    });

    csv += '\nFUEL RECORDS\n';
    csv += 'Truck ID,Date,Liters,Cost (TZS),Odometer\n';
    storage.fuel.forEach(fuel => {
        csv += `${fuel.fuelTruckId},${fuel.fuelDate},${fuel.litersPurchased},${fuel.fuelCost},${fuel.odometerReading}\n`;
    });

    csv += '\nMAINTENANCE RECORDS\n';
    csv += 'Truck ID,Service Type,Date,Cost (TZS),Status\n';
    storage.maintenance.forEach(maint => {
        csv += `${maint.truckId},${maint.maintenanceType},${maint.maintenanceDate},${maint.estimatedCost},${maint.status}\n`;
    });

    // Create download
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv));
    element.setAttribute('download', 'Pioneer_Logisticz_Report_' + new Date().getTime() + '.csv');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    alert('Report exported successfully!');
}

// ===== PRINT REPORT =====
function printReport() {
    window.print();
}

@media print {
    .sidebar {
        display: none;
    }
    .main {
        margin-left: 0;
        width: 100%;
    }
}
