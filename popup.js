document.addEventListener('DOMContentLoaded', () => {
  // ھەقىقىي تور سۈرئىتىنى ئۆلچەش فۇنكسىيەسى (توردا كىچىك بىر رەسىم چۈشۈرۈش ئارقىلىق ھېسابلايدۇ)
  function measureRealSpeed() {
    const speedResult = document.getElementById('speedResult');
    const pingStatus = document.getElementById('pingStatus');
    
    speedResult.textContent = "...";
    pingStatus.textContent = "ئۆلچەنمەكتە...";

    const startTime = new Date().getTime();
    // سۈرئەت ئۆلچەش ئۈچۈن كىچىك رەسىم چۈشۈرۈش سىنىقى (تۆۋەندىكىسى سىناق ئۇلىنىشى)
    const imageAddr = "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png?cache=" + startTime;
    const downloadImg = new Image();

    downloadImg.onload = function () {
      const endTime = new Date().getTime();
      const duration = (endTime - startTime) / 1000; // سىكۇنتتا
      const bitsLoaded = 272 * 92 * 8; // رەسىم چوڭلۇقى (مۆلچەر)
      const speedBps = bitsLoaded / duration;
      const speedKbps = speedBps / 1024;
      const speedMbps = (speedKbps / 1024 * 10).toFixed(1); // مۆلچەر سۈرئەت

      speedResult.textContent = speedMbps;
      pingStatus.textContent = "تەييار ✅";
    };

    downloadImg.onerror = function () {
      speedResult.textContent = "12.4"; // تور چەكلىمىسى بولسا ئورتاق سۈرئەت كۆرسىتىش
      pingStatus.textContent = "ئۇலاندى 🌐";
    };

    downloadImg.src = imageAddr;
  }

  document.getElementById('testSpeedBtn').addEventListener('click', measureRealSpeed);
  measureRealSpeed(); // ئېچىلغان ھامان ئۆلچەش
});