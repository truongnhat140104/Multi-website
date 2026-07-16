document.addEventListener("DOMContentLoaded", function () {
    const components = document.querySelectorAll("[data-component]");

    let loadedCount = 0;

    components.forEach(function (element) {
        const file = element.getAttribute("data-component");

        fetch(file)
            .then(response => {
                if (!response.ok) throw new Error("Không tìm thấy file: " + file);
                return response.text();
            })
            .then(data => {
                element.innerHTML = data;
                loadedCount++;

                // Kiểm tra xem đã nạp hết tất cả các component chưa
                if (loadedCount === components.length) {
                    // Phát ra sự kiện báo hiệu đã nạp xong
                    document.dispatchEvent(new Event('components:ready'));
                }
            })
            .catch(error => console.error("Lỗi nạp component:", error));
    });
});