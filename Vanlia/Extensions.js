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
function NewTab(link){
    window.open(link)
}
function redirect(link){
    window.location.href = link;
}
function alert_(title,txt,cancelButtonText ,showCancelButton,confirmButtonText,customClass_confirmButton) {
    Swal.fire({
        title: title,
        text: txt,
        confirmButtonText: confirmButtonText,
        showCancelButton: showCancelButton,
        cancelButtonText: cancelButtonText,
        customClass: {
            confirmButton: customClass_confirmButton // ใช้คลาส CSS ที่คุณสร้าง
        }
    });
}
function uploadFiles(fileInput , imagePreview) {
    // ตรวจสอบว่ามีไฟล์หรือไม่
    if (fileInput.length > 0) {
      var file = fileInput[0]; // เลือกไฟล์แรกเท่านั้น
      // ตรวจสอบว่าไฟล์เป็นรูปภาพหรือไม่ (อื่นๆ สามารถตรวจสอบได้ด้วย)
    if (file.type.indexOf('image') === 0) {
        var reader = new FileReader();
        reader.onload = function(e) {
        var imageUrl = e.target.result;
          // ทำสิ่งที่คุณต้องการกับ URL ของรูปภาพ, เช่นแสดงรูปภาพในหน้าเว็บ
        $(imagePreview).attr('src', imageUrl);
        };
        reader.readAsDataURL(file); // อ่านไฟล์เป็น Data URL
    } else {
        alert_('แจ้งเตือน','โปรดเลือกรูปภาพเท่านั้น',false,false,true);
    }
}
}
function dropAnddrag(fileInput,imagePreview){
    const fileInput = document.getElementById(fileInput);
    const imagePreview = document.getElementById(imagePreview);
    
    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        
        if (file) {
            const reader = new FileReader();
            
            reader.onload = (e) => {
                imagePreview.src = e.target.result;
            };
            
            reader.readAsDataURL(file);
        } else {
            imagePreview.src = '';
        }
    });
    // แสดงรูปภาพที่ถูกลากและวางลงในหน้าเว็บ
    document.body.addEventListener('dragover', (event) => {
        event.preventDefault();
    });
    document.body.addEventListener('drop', (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imagePreview.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
}
function getCookie(cookieName) {
    var name = cookieName + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookieArray = decodedCookie.split(';');
    for (var i = 0; i < cookieArray.length; i++) {
        var cookie = cookieArray[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) == 0) {
            return cookie.substring(name.length, cookie.length).replace(/\+/g, ' ');
        }
    }
    return "";
}
function GetSessionStroeless_arrary(cookienamearr){
    let arr_values = []
    for(i =0; i < cookienamearr.length; i++){
        arr_values.push(sessionStorage.getItem(cookienamearr[i]))
    }
    return arr_values;
}
function SetSessionStroeless_arrary(cookienamearr , columname){
    for(i =0; i < cookienamearr.length; i++){
    sessionStorage.setItem(columname[i],cookienamearr[i])
    }
}
function SetSessionStroeless_fromFromData(cookienamearr , columname){
    let data_fromdata = new FormData();
    for(i =0; i < cookienamearr.length; i ++){
        data_fromdata.append(columname[i],cookienamearr[i])
        sessionStorage.setItem(columname[i],cookienamearr[i])
    }
}