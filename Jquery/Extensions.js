$(document).ready(function(){
    function openModal(){
        $("#openModal").on("click", function() {
            $("#myModal").css("display", "block");
        });
        
        // เมื่อคลิกปุ่มปิด (x)
        $("#closeModal").on("click", function() {
            $("#myModal").css("display", "none");
        });
        
        // เมื่อผู้ใช้คลิกพื้นหลังนอก Modal
        window.onclick = function(event) {
            if (event.target == $(this)) {
                $("#myModal").css("display", "none");
            }
        };
    }
    function CreateTables(headers , values , tablename , classname){
            // สร้างตาราง
            var table = $("<table>");
            table.addClass(classname)
            // สร้างหัวของตาราง
            var thead = $("<thead>");
            thead.addClass(classname)
            var headerRow = thead.appendTo("<tr>");
            // var headers = ["Header 1", "Header 2", "Header 3"];
            for (var i = 0; i < headers.length; i++) {
                var headerCell = $("<th>");
                headerCell.appendTo( headers[i]);
                headerRow.appendTo(headerCell);
            }
            // สร้างเนื้อของตาราง
            var tbody = $("<tbody>");
            tbody.addClass(classname)
            for (var i = 1; i <= values.length; i++) {
                var row = tbody.append("<tr>");
                for (var j = 1; j <= values.length; j++) {
                    var cell = row.appendTo("<td>");
                    cell.txt(values[i][j]) 
                }
            }
            // เพิ่มหัวและเนื้อของตารางเข้ากับตาราง
            table.appendTo(thead);
            table.appendTo(tbody);
            // เพิ่มตารางลงในเอกสาร
            var tableContainer = $(tablename);
            tableContainer.appendTo(table);
    }
    function toggle(myElement){
        $(myElement).toggle();
    }
})