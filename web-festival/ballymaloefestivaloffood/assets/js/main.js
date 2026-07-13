document.addEventListener("componentsLoaded", () => {
  const video = document.querySelector(".home-hero__video");

  if (!video) {
    return;
  }

  const playPromise = video.play();

  if (playPromise !== undefined) {
    playPromise.catch(() => {
      // Trình duyệt có thể chặn autoplay.
      // Poster vẫn được hiển thị làm ảnh nền.
    });
  }
});
