// ====== БУРГЕР-МЕНЮ ======
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');
const closeMenuBtn = document.querySelector('.menu_close'); 

function toggleBurgerMenu() {
  menu.classList.toggle('active');

  if (menu.classList.contains('active')) {
    menu.style.display = 'block';
    setTimeout(() => menu.style.opacity = '1', 10);
  } else {
    menu.style.opacity = '0';
    setTimeout(() => menu.style.display = 'none', 300);
  }
}

function closeMenu() {
  menu.classList.remove('active');
  menu.style.opacity = '0';
  setTimeout(() => menu.style.display = 'none', 300);
}

burger.addEventListener('click', toggleBurgerMenu);
closeMenuBtn.addEventListener('click', closeMenu);




// ====== Функція для модальних вікон ======
function setupModal(openBtnId, modalId, closeBtnId) {
  const modal = document.getElementById(modalId);
  const openBtn = document.getElementById(openBtnId);
  const closeBtn = document.getElementById(closeBtnId);

  if (!modal || !openBtn || !closeBtn) return;

  openBtn.addEventListener("click", function (e) {
    e.preventDefault();
    modal.style.display = "flex";
    setTimeout(() => modal.style.opacity = "1", 10);
  });

  closeBtn.addEventListener("click", function () {
    modal.style.opacity = "0";
    setTimeout(() => modal.style.display = "none", 300);
  });

  window.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.style.opacity = "0";
      setTimeout(() => modal.style.display = "none", 300);
    }
  });
}

// Викликаємо функцію для кожного модального вікна
document.addEventListener("DOMContentLoaded", function () {
  setupModal("openModal", "modal", "close-modal");  // Безкоштовний урок
  setupModal("question_modal", "modal2", "close-modal2"); // Питання
  setupModal("vacancy_modal", "modal3", "close-modal3"); // Питання
}); 



// ====== Плавна прокрутка до якоря ======
document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".header");
  const footer = document.querySelector("footer"); // Замініть на клас вашого футера

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          header.style.opacity = "0";
          header.style.pointerEvents = "none"; // Щоб він не займав місце
        } else {
          header.style.opacity = "1";
          header.style.pointerEvents = "auto";
        }
      });
    },
    { threshold: 0.1 } // Відсоток видимості футера перед реакцією
  );

  observer.observe(footer);
});
