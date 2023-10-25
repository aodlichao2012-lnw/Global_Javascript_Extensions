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