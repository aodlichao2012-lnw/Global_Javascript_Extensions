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
    function dropAnddrag_upload_file(dropArea_id , fileToUpload_id){
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
        if (file.type.indexOf(type) === 0) {
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
    function push_and_show_arr_values_last_length(element , element_taget){
        let test_arr = [];
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
    function addNewElement(element ,element_taget, type_element, class_ = [] , name_attr = [] , data_attr = [], text = []){
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
    function GetSessionStroeless_arrary(cookienamearr = []){
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
    function SetSessionStroeless_fromFromData(cookienamearr = [] , columname){
        let data_fromdata = new FormData();
        for(i =0; i < cookienamearr.length; i ++){
            data_fromdata.append(columname[i],cookienamearr[i])
            sessionStorage.setItem(columname[i],cookienamearr[i])
        }
        return data_fromdata;
    }
    function Redirect_without_reload(className ,element_taget ){
    $(className).on("click", function(e) {
        e.preventDefault(); // ยกเลิกการโหลดหน้าเว็บใหม่
    
        var url = $(this).attr("href");
    
        // ดึงเนื้อหาใหม่โดยใช้ Ajax
        $.ajax({
            url: url,
            success: function(data) {
            // เมื่อ Ajax เสร็จสิ้น, แสดงเนื้อหาใหม่ใน container
            $(element_taget).html(data);
            }
            });
        });
    }
    function Redirect_without_reload_and_authen(className_from_href_tag_a ,element_taget , url_sigin){
        $(className_from_href_tag_a).on('click', function (e) {
            $.ajax({
                url: url_sigin, type: 'GET', success: function (e) {
                    let data = e
                    if (data == "200") {
                        let urls = $(this).attr('href');
                        e.preventDefault();

                        $.ajax({
                            url: urls,
                            success: function (e) {
                                alert(data)
                                $(element_taget).html(data)
                            }})
                        }
                    }
                }
            )
        })
    }
    function Drag_and_drop_copy_element(element , element_taget ,element_attr_add_id = [] , element_attr_add_data = [] , class_ = [], text = []){
        $(element).on('dragstart',function(e){
            let send_element = $(this)
            e.originalEvent.dataTransfer.setData("text/plain" , send_element.prop("outerHTML"))
        })

        $(element_taget).on('dragover', function(e) {
            e.preventDefault();
            $(this).addClass('dragover');
        });
        
        // เมื่อย้ายเมาส์ออกจาก dropArea
        $(element_taget).on('dragleave', function(e) {
            e.preventDefault();
            $(this).removeClass('dragover');
        });
        
        // เมื่อมีการวางไฟล์ลงบน dropArea
        $(element_taget).on('drop', function(e) {
            e.preventDefault();
            $(this).removeClass('dragover');
            
        let arr_ = e.originalEvent.dataTransfer.getData("text/plain");
        let element = $(arr_)
        for(i =0; i < class_.length;i++){
            newdiv.addClass(class_[i])
        }
        for(i =0; i < element_attr_add_id.length; i++){
            newdiv.attr(element_attr_add_id[i],element_attr_add_data[i])
        }
        for(i =0; i < text.length; i++){
            newdiv.text(text)
        }
        console.log(element)
        $(this).append(element)

    })
    }
    //ฟังก์ชั่นนี้ต้องมี jqueryUI มาเสริมด้วย ถึงจะสามารถ ใช้งานได้
    function Year_dropdwon_and_typing(element){
        jQuery(function ($) {
            let currentYear = (new Date()).getFullYear();
            ////Loop and add the Year values to DropDownList.
            let year_arr = [];
            for (let i = 2500; i <= currentYear + 543; i++) {

                year_arr.push("" + i + "");
            }
            $(element).autocomplete({
                source: function (request, response) {
                    let searchTerm = request.term.toLowerCase(); // รับคำที่พิมพ์
                    let filteredYears = year_arr.filter(function (year) {
                        return year.toString().includes(searchTerm);
                    });
                    response(filteredYears);
                }
            });
        })
    }
    function Keep_data_from_Socket(url,port, element_target){
        const socket = new WebSocket(`ws://${url}:${port}`); // WebSocket URL

        socket.onopen = function (event) {
            console.log("WebSocket connection opened.");
            socket.send("Hello, Server!"); // Send data to the server
        };

        socket.onmessage = function (event) {
            console.log("Received data from server: " + event.data);
            $(element_target).val(event.data);
        };

        socket.onclose = function (event) {
            if (event.wasClean) {
                console.log("WebSocket connection closed cleanly, code=" + event.code + ", reason=" + event.reason);
            } else {
                console.error("WebSocket connection closed with an error.");
            }
        };

        socket.onerror = function (error) {
            console.error("WebSocket error: " + error);
        };
    }
    function Keep_data_from_SignalR_2_0(data_to_send, element_taget){
           // ตรวจสอบสถานะของการเชื่อมต่อก่อนที่จะสร้าง connection ใหม่
        if ($.connection.hub && $.connection.hub.state === $.signalR.connectionState.connected) {
            console.log("Already connected");
            return;
        }
        // สร้าง connection ใหม่
        chatHub = $.connection.chatHub;
        // เพิ่ม event handler สำหรับการรับข้อความ
        chatHub.client.ReceiveData = function (status) {
        /*  console.log("Received status: " + status);*/
            $(element_target).text(status);
        };

        $.connection.hub.reconnect = true;

        // ตั้งค่า keepAlive และเวลาที่ต้องการทดสอบการเชื่อมต่อ
        $.connection.hub.keepAlive = 500;

        // เริ่ม connection
        $.connection.hub.start({ transport: ['serverSentEvents', 'longPolling'], waitForPageLoad: false, pingInterval: 1000 }).done(function () {
            console.log("Connected to SignalR Hub");
            // ส่งข้อมูลไปยังเซิร์ฟเวอร์
            console.log(`SignalR connection transport used is "${$.connection.hub.transport.name}"`);

            // ใช้ setInterval เพื่อเรียก chatHub.server.requestData ทุก 10 วินาที
            setInterval(function () {
                chatHub.server.requestData(data_to_send);
            }, 2000);
        });
    }
})
