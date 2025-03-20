
const tooltips = tippy('path', {
  arrow: true,
  trigger: 'click',
  animation: 'fade',
  content: (reference) => reference.getAttribute("name"),
  onShow(instance) {
    setTimeout(() => {
      instance.hide();
    }, 600);
  }
});

//Close Pop Up text 
closePopup.addEventListener("click", function () {
  myPopup.classList.remove("show");
  restart();
});  