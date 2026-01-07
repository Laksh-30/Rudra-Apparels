document.addEventListener("DOMContentLoaded", () => {
  const sliders = document.querySelectorAll(".card-slider");

  sliders.forEach(slider => {
    const images = slider.querySelectorAll("img");
    let currentIndex = 0;

    if (images.length <= 1) return;

    setInterval(() => {
      images[currentIndex].classList.remove("active");
      currentIndex = (currentIndex + 1) % images.length;
      images[currentIndex].classList.add("active");
    }, 3000);
  });
});


document.addEventListener("click", (e) => {
  const card = e.target.closest(".product-card");

  // Close all cards when clicking outside
  document.querySelectorAll(".product-card.active").forEach(c => {
    if (c !== card) c.classList.remove("active");
  });

  if (!card) return;

  card.classList.toggle("active");
});


// document.querySelectorAll('.category-card[href^="#"]').forEach(card => {
//   card.addEventListener("click", e => {
//     const targetId = card.getAttribute("href").slice(1);
//     const target = document.getElementById(targetId);
//     if (!target) return;

//     e.preventDefault();

//     const headerOffset = document.querySelector(".main-header")?.offsetHeight || 80;
//     const y = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;

//     window.scrollTo({ top: y, behavior: "smooth" });
//   });
// });
