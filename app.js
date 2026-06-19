let units = JSON.parse(localStorage.getItem("units")) || [];

function saveData(){
    localStorage.setItem("units", JSON.stringify(units));
}

// Create units first time
if (units.length === 0) {

    for (let i = 1; i <= 19; i++) {
        units.push({
            building: "مخرج 25",
            unitNumber: `25-${String(i).padStart(2,'0')}`,
            status: "Vacant",
            tenantName: "",
            phone: "",
            rent: "",
            dueDate: ""
        });
    }

    for (let i = 1; i <= 17; i++) {
        units.push({
            building: "مخرج 28",
            unitNumber: `28-${String(i).padStart(2,'0')}`,
            status: "Vacant",
            tenantName: "",
            phone: "",
            rent: "",
            dueDate: ""
        });
    }

    saveData();
}

// Show units
function showUnits(building){

    let html = "";

    units.filter(u => u.building === building)
    .forEach((u,index)=>{

        html += `
        <div class="card">
            <b>${u.unitNumber}</b><br>

            Status: ${u.status}<br>
            Tenant: ${u.tenantName || "-"}<br>
            Rent: ${u.rent || 0} ريال<br>

            <button onclick="editUnit('${u.unitNumber}')">
                Edit
            </button>
        </div>
        `;
    });

    document.getElementById("unitsContainer").innerHTML = html;
}

// Edit unit
function editUnit(unitNumber){

    let unit = units.find(u => u.unitNumber === unitNumber);

    let name = prompt("Tenant Name:", unit.tenantName);
    let phone = prompt("Phone:", unit.phone);
    let rent = prompt("Rent:", unit.rent);
    let due = prompt("Due Date:", unit.dueDate);

    unit.tenantName = name;
    unit.phone = phone;
    unit.rent = rent;
    unit.dueDate = due;

    // Auto status change
    if(name && name.trim() !== ""){
        unit.status = "Occupied";
    } else {
        unit.status = "Vacant";
    }

    saveData();
    updateDashboard();
    showUnits(unit.building);
}

// Dashboard
function updateDashboard(){

    document.getElementById("totalUnits").innerText = units.length;

    document.getElementById("occupiedUnits").innerText =
        units.filter(u => u.status === "Occupied").length;

    document.getElementById("vacantUnits").innerText =
        units.filter(u => u.status === "Vacant").length;
}

// Load default view
updateDashboard();
