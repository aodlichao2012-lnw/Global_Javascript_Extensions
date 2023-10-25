function openModal(){
    document.getElementById("openModal").addEventListener("click", function() {
        document.getElementById("myModal").style.display = "block";
    });
    
    // เมื่อคลิกปุ่มปิด (x)
    document.getElementById("closeModal").addEventListener("click", function() {
        document.getElementById("myModal").style.display = "none";
    });
    
    // เมื่อผู้ใช้คลิกพื้นหลังนอก Modal
    window.onclick = function(event) {
        var modal = document.getElementById("myModal");
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
}
function CreateTables(headers , values , tablename , classname){
    document.addEventListener("DOMContentLoaded", function() {
        // สร้างตาราง
        var table = document.createElement("table");
        table.className = classname;
        // สร้างหัวของตาราง
        var thead = document.createElement("thead");
        thead.className = classname;
        var headerRow = thead.insertRow();
        // var headers = ["Header 1", "Header 2", "Header 3"];
        for (var i = 0; i < headers.length; i++) {
            var headerCell = document.createElement("th");
            headerCell.textContent = headers[i];
            headerRow.appendChild(headerCell);
        }

        // สร้างเนื้อของตาราง
        var tbody = document.createElement("tbody");
        tbody.className = classname;
        for (var i = 1; i <= 3; i++) {
            var row = tbody.insertRow();
            for (var j = 1; j <= 3; j++) {
                var cell = row.insertCell();
                cell.textContent = values[i][j];
            }
        }

        // เพิ่มหัวและเนื้อของตารางเข้ากับตาราง
        table.appendChild(thead);
        table.appendChild(tbody);

        // เพิ่มตารางลงในเอกสาร
        var tableContainer = document.getElementById(tablename);
        tableContainer.appendChild(table);
    });
}
function toggle(myElement){
    var element = document.getElementById(myElement);

if (element.style.display === "none") {
    element.style.display = "block";
} else {
    element.style.display = "none";
}
}
