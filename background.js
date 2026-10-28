// يۈزى ئوچۇق سۈرەتلەرنى ۋە گۇمانلىق مەزمۇنلارنى تور بەتتە ئاپتوماتىك توسۇش فۇنكسىيەسى
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url && !tab.url.startsWith('chrome://')) {
    chrome.storage.local.get(['blockExplicitImages'], (data) => {
      // ئەگەر سۈزۈش ئاكتىپ بولسا بەتتىكى سۈرەتلەرنى تەكشۈرۈپ سۈزۈش
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        func: () => {
          // گۇمانلىق ياكى يۈزى ئوچۇق سۈرەتلەرنىڭ ئۆلچىمى ياكى ئاتالغۇلىرىنى تەكشۈرۈپ يوشۇرۇش
          const images = document.querySelectorAll('img, video, [style*="background-image"]');
          images.forEach(el => {
            const altText = (el.alt || "").toLowerCase();
            const srcText = (el.src || "").toLowerCase();
            
            // ئەگەر سۈرەت ئادرېسىدا ياكى چۈشەندۈرۈشىدە گۇمانلىق سۆزلەر بولسا دەرھال ئۆچۈرۈۋېتىش
            if (altText.includes('adult') || altText.includes('nsfw') || srcText.includes('explicit')) {
              el.style.display = 'none';
            }
          });
        }
      }).catch(() => {});
    });
  }
});