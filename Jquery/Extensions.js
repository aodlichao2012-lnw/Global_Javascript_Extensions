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
    function NewTab(link){
        window.open(link)
    }
    function redirect(link){
        window.location.href = link;
    }
    function dropAnddrag(dropArea){
        $(dropArea).on('dragover', function(e) {
            e.preventDefault();
            $(this).addClass('dragover');
        });
        
        // เมื่อย้ายเมาส์ออกจาก dropArea
        $(dropArea).on('dragleave', function(e) {
            e.preventDefault();
            $(this).removeClass('dragover');
        });
        
        // เมื่อมีการวางไฟล์ลงบน dropArea
        $(dropArea).on('drop', function(e) {
            e.preventDefault();
            $(this).removeClass('dragover');
        
          var files = e.originalEvent.dataTransfer.files; // รับรายการไฟล์ที่ลากมา
        
          // เรียกใช้ฟังก์ชันที่จะอัปโหลดไฟล์
            uploadFiles(files);
        });
        
        // เมื่อมีการเลือกไฟล์ผ่าน input file
        $('#fileInput').on('change', function() {
          var files = this.files; // รับรายการไฟล์ที่ถูกเลือก
        
          // เรียกใช้ฟังก์ชันที่จะอัปโหลดไฟล์
            uploadFiles(files);
        });
    }
    function uploadFiles(files , imagePreview) {
        // ตรวจสอบว่ามีไฟล์หรือไม่
        if (files.length > 0) {
          var file = files[0]; // เลือกไฟล์แรกเท่านั้น
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
    function ajaxPool (request){
        requests: [];

        add : function a (request) {
            this.requests.push(request);
        }
        // เมื่อ request เสร็จสิ้น
        remove: function b(request) {
            var index = this.requests.indexOf(request);
            if (index !== -1) {
            this.requests.splice(index, 1);
            }
        }
        // ยกเลิกทุก requests ที่ค้างอยู่ใน "pool"
        cancelAll: function z( ) {
            $.each(this.requests, function(index, request) {
            request.abort();
            });
            this.requests = [];
        }
    }
    function ajax_(url,type,data,processData,contentType){
        requst1 =  $.ajax({
            url:url,
            type:type,
            data:data,
            processData: processData,
            contentType: contentType,
            success: function(response) {
                return response;
                // สิ่งที่คุณต้องการทำเมื่อส่งข้อมูลสำเร็จ
            },
            error: function(xhr, status, error) {
                return error
                // สิ่งที่คุณต้องการทำเมื่อเกิดข้อผิดพลาด
            }
        })
        ajaxPool.add(requst1)
        ajaxPool.remove(requst1)
        ajaxPool.cancelAll();
    }
})