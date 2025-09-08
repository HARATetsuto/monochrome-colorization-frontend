(() => {
  const monochromeImg = document.getElementById('monochrome-img') as HTMLInputElement;
  const fileBtn = document.querySelector('.bi') as SVGAElement;
  
  fileBtn.addEventListener('click', (e) => {
    if (monochromeImg) {
      monochromeImg.click();
    }
  })
})()