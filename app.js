console.log("Druze Real Estate");
// Load existing data
let units = JSON.parse(localStorage.getItem("units")) || [];

// First run: Create 36 units automatically
if (units.length === 0) {

    // Exit 25
    for (let i = 1; i <= 19; i++) {
        units.push({
            building: "مخرج 25",
            unitNumber: `25-${String(i).padStart(2, '0')}`,
            status: "Vacant",
            tenantName: "",
            phone: "",
            rent: "",
            dueDate: "",
            contractStart: "",
            contractEnd: "",
            notes: ""
        });
    }

    // Exit 28
    for (let i = 1; i <= 17; i++) {
        units.push({
            building: "مخرج 28",
            unitNumber: `28-${String(i).padStart(2, '0')}`,
            status: "Vacant",
            tenantName: "",
            phone: "",
            rent: "",
            dueDate: "",
            contractStart: "",
            contractEnd: "",
            notes: ""
        });
    }

    localStorage.setItem("units", JSON.stringify(units));
}

// Dashboard counts
updateDashboard();

function updateDashboard() {

    const total = units.length;

    const occupied = units.filter(
        u => u.status === "Occupied"
    ).length;

    const vacant = units.filter(
        u => u.status === "Vacant"
    ).length;

    document.getElementById("totalUnits").innerText = total;
    document.getElementById("occupiedUnits").innerText = occupied;
    document.getElementById("vacantUnits").innerText = vacant;
}

function showUnits(building) {

    let html = "";

    units
        .filter(u => u.building === building)
        .forEach(u => {

            html += `
            <div class="card">
                <strong>${u.unitNumber}</strong><br>

                Status:
                ${u.status}<br>

                Tenant:
                ${u.tenantName || "-"}<br>

                Rent:
                ${u.rent || "-"} ريال
            </div>
            `;
        });

    document.getElementById("unitsContainer").innerHTML = html;
}
