(() => {
  const monochromeImg = document.getElementById('monochrome-img') as HTMLInputElement;
  const fileBtn = document.querySelector('.file-select') as HTMLButtonElement;
  
  fileBtn.addEventListener('click', (e) => {
    if (monochromeImg) {
      monochromeImg.click();
    }
  })
})()