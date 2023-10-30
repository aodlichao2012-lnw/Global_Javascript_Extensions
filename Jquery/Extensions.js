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
    function dropAnddrag(dropArea_id , fileToUpload_id){
        $(dropArea_id).on('dragover', function(e) {
            e.preventDefault();
            $(this).addClass('dragover');
        });
        
        // เมื่อย้ายเมาส์ออกจาก dropArea
        $(dropArea_id).on('dragleave', function(e) {
            e.preventDefault();
            $(this).removeClass('dragover');
        });
        
        // เมื่อมีการวางไฟล์ลงบน dropArea
        $(dropArea_id).on('drop', function(e) {
            e.preventDefault();
            $(this).removeClass('dragover');
        
          var files = e.originalEvent.dataTransfer.files; // รับรายการไฟล์ที่ลากมา
        
          // เรียกใช้ฟังก์ชันที่จะอัปโหลดไฟล์
            uploadFiles(files);
        });
        //    // เมื่อมีการวางelment
        // $(dropArea_id).on('drop', function(e) {
        //     e.preventDefault();
        //     $(this).removeClass('dragover');
        
        //   var files = e.originalEvent.dataTransfer.files; // รับรายการไฟล์ที่ลากมา
        
        //   // เรียกใช้ฟังก์ชันที่จะอัปโหลดไฟล์
        //     uploadFiles(files);
        // });
        // เมื่อมีการเลือกไฟล์ผ่าน input file
        $(fileToUpload_id).on('change', function() {
          var files = this.files; // รับรายการไฟล์ที่ถูกเลือก
        
          // เรียกใช้ฟังก์ชันที่จะอัปโหลดไฟล์
            uploadFiles(files);
        });
    }
    function uploadFiles(files ,type, imagePreview_id) {
        // ตรวจสอบว่ามีไฟล์หรือไม่
        if (files.length > 0) {
        foreach(item in files)
        {
            var file = item; 
          // ตรวจสอบว่าไฟล์เป็นรูปภาพหรือไม่ (อื่นๆ สามารถตรวจสอบได้ด้วย)
        if (file.type.indexOf('image') === 0) {
            var reader = new FileReader();
            reader.onload = function(e) {
            let imagePreview = imagePreview_id;
            var imageUrl = e.target.result;
              // ทำสิ่งที่คุณต้องการกับ URL ของรูปภาพ, เช่นแสดงรูปภาพในหน้าเว็บ
            $(imagePreview).attr('src', imageUrl);
            };
            reader.readAsDataURL(file); // อ่านไฟล์เป็น Data URL
            let formdata = new FormData();
            formdata.append("files_fileToUpload_name" ,'fileToUpload');
            formdata.append("size",10);
            formdata.append("fileToUpload",file)
            console.log(files)

            // ajax_('Exten.php', 'POST', formdata
            //     , 'upload', function(response) {
            //     // สิ่งที่คุณต้องการทำเมื่อส่งข้อมูลสำเร็จ
            // }, function(error) {
            //     // สิ่งที่คุณต้องการทำเมื่อเกิดข้อผิดพลาด
            // },false,false);

            } else {
                alert('แจ้งเตือน');
            }
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
    function ajax_(url, type, data, action, successCallback, errorCallback, processData = true, contentType = null) {
        $.ajax({
            url: url,
            type: type,
            data: {
                action: action,
                data: data
            },
            processData: processData,
            contentType: contentType,
            success: function (response) {
                if (successCallback) {
                    successCallback(response);
                }
            },
            error: function (xhr, status, error) {
                if (errorCallback) {
                    errorCallback(error);
                }
            }
        });
    }
    function ajax_FromData(url, type, data, action, successCallback, errorCallback, processData = true, contentType = null) {
        $.ajax({
            url: url,
            type: type,
            data: data,
            processData: processData,
            contentType: contentType,
            success: function (response) {
                if (successCallback) {
                    successCallback(response);
                }
            },
            error: function (xhr, status, error) {
                if (errorCallback) {
                    errorCallback(error);
                }
            }
        });
    }
    function push_and_show_values_last_length(element , element_taget){
        $(element).on('change',function(e){
            $(this).each(function(){
                test_arr.push($(this).val())
            })
            for(i =0; i < test_arr.length; i++){
                    $(element_taget).append( test_arr[count])
                    count = test_arr.length;
                }
            })
    }
    function push_and_show_values_each_of_element(element , element_taget){
        let element =  $(element)
        element.on('change',function(e){
            $(element_taget).append($(this).val())
        })
    }
    function push_value_on_server(element , columname , url , action){
        let arr_values_from_attr = $(element)
        let data = new FormData();
        arr_values_from_attr.each(function(e){
            data.append(columname,$(this).val())
        })
        ajax_FromData(url,'POST',data,action,function(e){ alert_("Success","Success!!","OK")} , function(e){
            alert_("Error",e.text(),"OK")
        })
    }
    function addNewElement(element ,element_taget, type_element, class_ , name_attr , data_attr , text){
        let create = $(element)
        create.on('click',function(e){
            let newdiv = $(type_element)
            for(i =0; i < class_.length;i++){
                newdiv.addClass(class_[i])
            }
            for(i =0; i < name_attr.length; i++){
                newdiv.attr(name_attr[i],data_attr[i])
            }
            for(i =0; i < text.length; i++){
                newdiv.text(text)
            }
            newdiv.text("แท็บใหม่")
            $(element_taget).append(newdiv)
        })
    }
    function removeElement(element , name_attr){
        $(element).on('click',function(e){
            let element_for_remove = $(name_attr)
            if(element_for_remove.last().length > 0){
                element_for_remove.last().remove();
            }
        })
    }
})
