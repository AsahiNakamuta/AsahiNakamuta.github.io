document.addEventListener("DOMContentLoaded", function () {
  // ハンバーガーメニュー
  const ham = document.getElementById("js-hamburger");
  const nav = document.getElementById("js-globalnav");
  const main = document.getElementById("js-main");  // 存在しない場合もあるのでnullチェック

  ham?.addEventListener("click", function () {
    ham.classList.toggle("_active");
    nav.classList.toggle("_active"); // CSS側での表示切替用に"_active"クラスを利用
    if (main) {
      main.classList.toggle("_darker");
    }
  });

  // 子メニュー表示
  const parentMenu = document.querySelectorAll("._has-child > a");
  parentMenu.forEach(menu => {
    menu.addEventListener("click", function (e) {
      e.preventDefault();
      this.nextElementSibling.classList.toggle("active");
    });
  });

  // ページUPボタンの制御
  const PageUpBtn = document.getElementById('js-pageup');
  window.addEventListener("scroll", function () {
    PageUpBtn?.classList.toggle("_active", window.scrollY > 300);
  });
  PageUpBtn?.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // ページ内リンクのスムーズスクロール
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const href = this.getAttribute('href');
      if (href === '#') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      } else {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
});
