'use strict';

// -----------------------------------------------------
// プログラム名：fuwaimg
// バージョン：1.4.2
// 製作者：ガタガタ（https://do.gt-gt.org/）
// 公開日：2020.11.20
// 修正日：2022.05.16
//
// このプログラムは使用・改変・再配布・販売すべて自由です。
// 報告やリンクなども必要ありません。
// ただし、利用にあたりこの注意書きは削除しないでください。
// また、あたかもプログラムを自作したかのように誤解させる言動はお控えください。
// -----------------------------------------------------

{

  // -----------------------------------------------------

  // 自分の設置されているURLの取得

  // -----------------------------------------------------

    var root;
    var scripts = document.getElementsByTagName("script");
    var i = scripts.length;
    while (i--) {
        var match = scripts[i].src.match(/(^|.*\/)fuwaimg\.js$/);
        if (match) {
            root = match[1];
            break;
        }
    }

  // -----------------------------------------------------

  // 縦いっぱいの補正

  // -----------------------------------------------------

  const setFillHeight = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  // 画面のサイズ変動があった時に高さを再計算する
  window.addEventListener('resize', setFillHeight);

  // 初期化
  setFillHeight();

  // -----------------------------------------------------

  // 要素の描写

  // -----------------------------------------------------

  const body = document.querySelector('body');

  var newElement = document.createElement('div');
  newElement.setAttribute('id','fuwaimg');
  newElement.setAttribute('class','hidden');
  body.insertBefore(newElement, body.firstChild);
  var parent = document.getElementById('fuwaimg');

  var newMask = document.createElement('div');
  newMask.setAttribute('id','fuwaimg_mask');
  var newInner = document.createElement('div');
  newInner.setAttribute('id','fuwaimg_inner');
  var newLoading = document.createElement('span');
  newLoading.setAttribute('id','fuwaimg_loading');
  var newLoadBar = document.createElement('div');
  newLoadBar.setAttribute('id','fuwaimg_loadbar');
  parent.insertBefore(newLoadBar, parent.firstChild);
  parent.insertBefore(newLoading, parent.firstChild);
  parent.insertBefore(newInner, parent.firstChild);
  parent.insertBefore(newMask, parent.firstChild);
  var loading = document.getElementById('fuwaimg_loading');
  var loadbar = document.getElementById('fuwaimg_loadbar');
  loading.textContent = 'Loading...';
  var parent2 = document.getElementById('fuwaimg_inner');

  var newFuwaimgimg = document.createElement('div');
  newFuwaimgimg.setAttribute('id','fuwaimg_img');
  var newFuwaimgimginner = document.createElement('div');
  newFuwaimgimginner.setAttribute('id','fuwaimg_imginner');
  var newFuwaimgcap = document.createElement('div');
  newFuwaimgcap.setAttribute('id','fuwaimg_caption');
  var newNext = document.createElement('a');
  newNext.setAttribute('id','fuwaimg_next');
  var newPrev = document.createElement('a');
  newPrev.setAttribute('id','fuwaimg_prev');

  parent2.insertBefore(newPrev, parent2.firstChild);
  parent2.insertBefore(newNext, parent2.firstChild);
  parent2.insertBefore(newFuwaimgcap, parent2.firstChild);
  parent2.insertBefore(newFuwaimgimg, parent2.firstChild);
  var parent3 = document.getElementById('fuwaimg_img');
  var parent4 = document.getElementById('fuwaimg_caption');
  var prevbtn = document.getElementById('fuwaimg_prev');
  var nextbtn = document.getElementById('fuwaimg_next');
  parent3.insertBefore(newFuwaimgimginner, parent3.firstChild);
  var imginner = document.getElementById('fuwaimg_imginner');

  var newFuwaCloseBtn = document.createElement('button');
  newFuwaCloseBtn.setAttribute('id','fuwaimg_close');
  parent4.insertBefore(newFuwaCloseBtn, parent4.firstChild);
  var newFuwaZoomBtn = document.createElement('button');
  newFuwaZoomBtn.setAttribute('id','fuwaimg_zoom');
  parent4.insertBefore(newFuwaZoomBtn, parent4.firstChild);
  var parent5 = document.getElementById('fuwaimg_zoom');
  var newFuwaZoomBtnIcon = document.createElement('img');
  newFuwaZoomBtnIcon.setAttribute('id','fuwaimg_zoomimg');
  newFuwaZoomBtnIcon.setAttribute('src',root+'../img/zoomin.svg');
  parent5.insertBefore(newFuwaZoomBtnIcon, parent5.firstChild);

  var close = document.getElementById('fuwaimg_close');
  var smallImgWidth = '';


  // -----------------------------------------------------

  // モーダルウインドウを表示するリンクを取得

  // -----------------------------------------------------

  const links = document.getElementsByClassName('fuwaimg');
  const linkarray = Array.from(links);
  var link = [];
  var fimgs = [];

  for (var i = 0; i < linkarray.length; i++) {
    link[i] = linkarray[i];
    fimgs[i] = linkarray[i].dataset.fimg;
  }

  var showimg;
  var ret = [];

  // -----------------------------------------------------

  // クリックイベントの設定

  // -----------------------------------------------------

  link.forEach(function(event, h) {
    var imgurl = event.href
    var newImg = document.createElement('img');
    newImg.setAttribute('src', imgurl);

    event.addEventListener('click', function(e) {
      e.preventDefault();
      var targeta = e.target.closest('a');
      var fimg = targeta.dataset.fimg;
      var caption = targeta.dataset.fcaption;
      var nexth = null;
      var prevh = null;
      parent2.style.width = '';
      parent3.style.width = '';
      parent2.style.maxWidth = '';
      parent3.style.maxWidth = '';
      parent2.style.transform = '';
      nextbtn.style.transform = '';
      prevbtn.style.transform = '';
      parent2.style.transition = '';
      nextbtn.style.transition = '';
      prevbtn.style.transition = '';
      nextbtn.style.opacity = '';
      prevbtn.style.opacity = '';

      loading.style.visibility = 'visible';
      loadbar.style.visibility = 'visible';

      // グループ内の次のメンバーを探す
      if (fimg != undefined) {
        for (var i = h+1; i < link.length; i++) {
          if(link[i].dataset.fimg == fimg ) {
            nexth = i;
            break;
          }
        }
        for (var j = h-1; j >= 0; j--) {
          if(link[j].dataset.fimg == fimg) {
            prevh = j;
            break;
          }
        }
      }

      if(nexth != null) {
        nextbtn.style.visibility = 'visible';
      } else {
        nextbtn.style.visibility = 'hidden';
      }

      if(prevh != null) {
        prevbtn.style.visibility = 'visible';
      } else {
        prevbtn.style.visibility = 'hidden';
      }

      if(parent3.querySelector('img')) {
        showimg.src = imgurl;
      } else {
        newImg.setAttribute('id','fuwaimg-showimg');
        imginner.insertBefore(newImg, imginner.firstChild);
      }

      if(parent4.querySelector('p')) {
        var text = document.getElementById('fuwaimg_caption_text');
        text.textContent = caption;
      } else {
        var newTxt = document.createElement('p');
        newTxt.textContent = caption;
        newTxt.setAttribute('id','fuwaimg_caption_text');
        parent4.insertBefore(newTxt, parent4.firstChild);
      }

      parent.classList.remove('hidden');
      showimg = document.getElementById('fuwaimg-showimg');
      showimg.style.width = '';
      showimg.style.maxWidth = '';
      smallImgWidth = window.getComputedStyle(showimg).width;

      showimg.addEventListener('load', setWindowWidth(smallImgWidth));

      ret[0] = nexth;
      ret[1] = prevh;
      return ret;

    });
  });
  
  function setWindowWidth(smallImgWidth) {
    if (window.matchMedia('(max-width: 749px)').matches) {
      //スマホ処理
      showimg.style.width = '';
      parent2.style.width = '';
      parent3.style.width = '';
      showimg.style.maxWidth = '90vw';
      parent2.style.maxWidth = '90vw';
      parent3.style.maxWidth = '90vw';
    } else {
      //PC処理
      showimg.style.maxWidth = '';
      parent2.style.maxWidth = '';
      parent3.style.maxWidth = '';
      showimg.style.width = smallImgWidth;
      parent2.style.width = smallImgWidth;
      parent3.style.width = smallImgWidth;
    }
      if (showimg.naturalWidth - parseInt(smallImgWidth) > 50) {
        parent5.style.display = 'block';
      } else {
        parent5.style.display = 'none';
      }
    parent2.classList.add('fuwaimg_fadein');
  }

  function resetZoom() {
    setWindowWidth(smallImgWidth);
    newFuwaZoomBtnIcon.setAttribute('src',root+'../img/zoomin.svg');
    parent3.classList.remove('zoom_in');
    parent5.classList.remove('active');
    prevbtn.style.opacity = '1';
    prevbtn.style.pointerEvents = 'all';
    nextbtn.style.opacity = '1';
    nextbtn.style.pointerEvents = 'all';
  }

  nextbtn.addEventListener('click', function() {
    parent2.classList.add('fuwaimg_fadeout');
    nextbtn.style.visibility = 'hidden';
    parent2.classList.remove('fuwaimg_fadein');
    setTimeout(function(){link[ret[0]].click();}, 300);
    setTimeout(function(){parent2.classList.remove('fuwaimg_fadeout');    resetZoom();}, 600);
  });

  prevbtn.addEventListener('click', function() {
    parent2.classList.add('fuwaimg_fadeout');
    prevbtn.style.visibility = 'hidden';
    parent2.classList.remove('fuwaimg_fadein');
    setTimeout(function(){link[ret[1]].click();}, 300);
    setTimeout(function(){parent2.classList.remove('fuwaimg_fadeout');    resetZoom();}, 600);
  });

  // 拡大アイコンをクリックしたときのイベント
  parent5.addEventListener('click', function() {
    parent3.classList.toggle('zoom_in');
    parent5.classList.toggle('active');
    if(parent5.classList.contains('active')) {
      showimg.style.width = showimg.naturalWidth + 'px';
      showimg.style.maxWidth = showimg.naturalWidth + 'px';
      parent2.style.width = showimg.naturalWidth + 'px';
      parent3.style.width = showimg.naturalWidth + 'px';
      setScrollBooster();
      prevbtn.style.opacity = '0';
      prevbtn.style.pointerEvents = 'none';
      nextbtn.style.opacity = '0';
      nextbtn.style.pointerEvents = 'none';
      newFuwaZoomBtnIcon.setAttribute('src',root+'../img/zoomout.svg');
    } else {
      setWindowWidth(smallImgWidth);
      setScrollBooster();
      newFuwaZoomBtnIcon.setAttribute('src',root+'../img/zoomin.svg');
      prevbtn.style.opacity = '1';
      prevbtn.style.pointerEvents = 'all';
      nextbtn.style.opacity = '1';
      nextbtn.style.pointerEvents = 'all';
    }
  });

  close.addEventListener('click', () => {
    loading.style.visibility = 'hidden';
    loadbar.style.visibility = 'hidden';
    parent.classList.add('hidden');
    parent2.classList.remove('fuwaimg_fadein');
    nextbtn.style.visibility = 'hidden';
    prevbtn.style.visibility = 'hidden';
    setTimeout(resetZoom, 300);
  });

  var mask = document.getElementById('fuwaimg_mask');
  mask.addEventListener('click', () => {
    close.click();
  });

  // スワイプ
  var fuwaimgCount = 0;

  function setSwipe() {
    var fuwaimg_s_X;
    var fuwaimg_e_X;
    var fuwaimg_gapX;
    var fuwaimg_dist = 60;
    var fuwaimg_move;
    imginner.addEventListener('touchstart', function(e) {
     fuwaimg_move = false;
     fuwaimg_s_X = e.touches[0].pageX;
   });
   imginner.addEventListener('touchmove', function(e) {
        e.preventDefault();
        if(parent3.classList.contains('zoom_in')) {
        } else {
          fuwaimg_move = true;
          loading.style.visibility = 'hidden';
          loadbar.style.visibility = 'hidden';
          fuwaimg_e_X = e.changedTouches[0].pageX;
          fuwaimg_gapX = fuwaimg_s_X - fuwaimg_e_X;
          parent2.style.transform = 'translate(calc(-50% - '+fuwaimg_gapX+'px), -50%)';
          nextbtn.style.transform = 'translateX('+fuwaimg_gapX+'px)';
          prevbtn.style.transform = 'translateX('+fuwaimg_gapX+'px)';
        }
      });
      imginner.addEventListener('touchend', function(e) {
        if(parent3.classList.contains('zoom_in')) {
          // 画像拡大中の処理
        } else {
          loading.style.visibility = 'visible';
          loadbar.style.visibility = 'visible';
          if(fuwaimg_move) {
            if (fuwaimg_s_X > fuwaimg_e_X + fuwaimg_dist) {
              if(nextbtn.style.visibility == 'visible') {
                parent2.style.transform = 'translate(-200%, -50%)';
                parent2.style.transition = 'translate, .3s';
                nextbtn.style.opacity = '0';
                prevbtn.style.opacity = '0';
                nextbtn.click();
              } else {
                parent2.style.transform = '';
                nextbtn.style.transform = '';
                prevbtn.style.transform = '';
              }
            } else if (fuwaimg_s_X + fuwaimg_dist < fuwaimg_e_X) {
              if(prevbtn.style.visibility == 'visible') {
                parent2.style.transform = 'translate(200%, -50%)';
                parent2.style.transition = 'translate, .3s';
                nextbtn.style.opacity = '0';
                prevbtn.style.opacity = '0';
                prevbtn.click();
              } else {
                parent2.style.transform = '';
                nextbtn.style.transform = '';
                prevbtn.style.transform = '';
              }
            } else {
              parent2.style.transform = '';
              nextbtn.style.transform = '';
              prevbtn.style.transform = '';
            }
            fuwaimg_move = false;
          }
        }
       });
    }
    setSwipe('#fuwaimg_img');

    // scrollboosterの設定
    
    function setScrollBooster() {
      var scrollEl = document.querySelector("#fuwaimg_imginner");
      var scr = new ScrollBooster({
        viewport: document.querySelector("#fuwaimg_img"),
        // content: scrollEl,
        emulateScroll: true,
        bounce: false,
        onUpdate: function(data) {
          scrollEl.style.transform =
            "translate(" + -data.position.x + "px, " + -data.position.y + "px)";
        }
      });
    };
    
}
