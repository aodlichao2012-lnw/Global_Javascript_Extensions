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
})