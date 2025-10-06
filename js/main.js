if (document.querySelector(".preloader")) {
  window.addEventListener("load", (event) => {
    enableScroll()
    disableScroll()
    setTimeout(() => {
      document.body.classList.add('loaded');
      setTimeout(() => {
        enableScroll()
      }, 500);
    }, 100);
  });
}
const header = document.querySelector(".header")
const menuMobileBtn = document.querySelector('.menu-mobile__btn');
const mobMenu = document.querySelector('.mob-menu'); 
const iconMenu = document.querySelector('.icon-menu');
const modal = document.querySelectorAll(".modal")
const modOpenBtn = document.querySelectorAll(".mod-open-btn")
const modCloseBtn = document.querySelectorAll(".mod-close-btn")
const successModal = document.querySelector(".success-mod")
const errorModal = document.querySelector(".error-mod")
const dropdown = document.querySelectorAll(".dropdown")
let tablet = 1270.98
let mobDevice = 767.98
let animSpd = 400
//get path to sprite id
function sprite(id) {
  return '<svg><use xlink:href="img/icons/sprite.svg#' + id + '"></use></svg>'
}
//scroll pos
function scrollPos() {
  return window.pageYOffset || document.documentElement.scrollTop
}
function setVh() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};
setVh()
//fancybox defaults
Fancybox.defaults = {
  ...Fancybox.defaults,
  Hash: false,
  Thumbs: false,
  Toolbar: {
    display: {
      left: [],
      middle: [],
      right: ["close"],
    }
  },
  on: {
    init:  (fancybox,slide) =>  {
      disableScroll()
    },
    destroy:  (fancybox,slide) =>  {
      enableScroll()
    },
  }, 
}; 
Fancybox.bind("[data-fancybox]", {
  contentClick: "iterateZoom",
  Images: {
    Panzoom: {
      maxScale: 2,
    },
  },
});
//enable scroll
function enableScroll() {
  if (document.querySelectorAll(".fixed-block")) {
      document.querySelectorAll(".fixed-block").forEach(block => block.style.paddingRight = '0px')
  }
  document.body.style.paddingRight = '0px'
  document.body.classList.remove("no-scroll")
}
//disable scroll
function disableScroll() {
  let paddingValue = window.innerWidth > 350 ? window.innerWidth - document.documentElement.clientWidth + 'px' : 0
  if (document.querySelectorAll(".fixed-block")) {
      document.querySelectorAll(".fixed-block").forEach(block => block.style.paddingRight = paddingValue)
  }
  document.body.style.paddingRight = paddingValue
  document.body.classList.add("no-scroll");
}
//smoothdrop
function smoothDrop(header, body, dur=false) {
  let animDur = dur ? dur : 500
  body.style.overflow = 'hidden';
  body.style.transition = `height ${animDur}ms ease`;
  body.style['-webkit-transition'] = `height ${animDur}ms ease`;
  if (!header.classList.contains("active")) {
      header.classList.add("animated")
      body.style.display = 'block';
      let height = body.clientHeight + 'px';
      body.style.height = '0px';
      setTimeout(function () {
          body.style.height = height;
          setTimeout(() => {
              body.style.height = null
              header.classList.add("active")
          }, animDur); 
      }, 0);
  } else {
      header.classList.remove("animated")
      let height = body.clientHeight + 'px';
      body.style.height = height
      setTimeout(function () {
          body.style.height = "0"
          setTimeout(() => {
              body.style.display = 'none';
              body.style.height = null
              header.classList.remove("active")
          }, animDur);
      }, 0);
  }
}
//tabSwitch
function tabSwitch(nav,block) {
  nav.forEach((item,idx) => {
    item.addEventListener("click", () => {
      nav.forEach(el => {
        el.classList.remove("active")
      })
      block.forEach(el => {
        el.classList.remove("active")
      })
      item.classList.add("active")
      block[idx].classList.add("active")
      item.style.opacity = "0"
        block[idx].style.opacity = "0"
      setTimeout(() => {
        item.style.opacity = "1"
        block[idx].style.opacity = "1"
      }, 0);
    })
  });
}
// custom scroll FF
const customScroll = document.querySelectorAll(".custom-scroll")
let isFirefox = typeof InstallTrigger !== 'undefined';
if (isFirefox) {
  document.documentElement.style.scrollbarColor = "#202020 #ffffff"
  if (customScroll) {
    customScroll.forEach(item => { item.style.scrollbarColor = "#202020 ffffff" })
  }
}
//fixed header
let lastScroll = scrollPos();
window.addEventListener("scroll", () => {
  if (scrollPos() > 1) {
      header.classList.add("scroll")
      if (header.classList.contains("header--main")) {
        header.classList.remove("header--light")
      }
      if ((scrollPos() > lastScroll && scrollPos() > 150 && !header.classList.contains("unshow"))) {
          header.classList.add("unshow")
      } else if (scrollPos() < lastScroll && header.classList.contains("unshow")) {
          header.classList.remove("unshow")
      }
  } else {
      header.classList.remove("scroll")
      header.classList.remove("unshow")
      if (header.classList.contains("header--main")) {
        header.classList.add("header--light")
      }
  }
  lastScroll = scrollPos()
})
//switch active tab/block
const switchBlock = document.querySelectorAll(".switch-block")
if (switchBlock) {
  switchBlock.forEach(item => {
    tabSwitch(item.querySelectorAll("[data-nav]"),item.querySelectorAll("[data-block]"))
  })
}
//open modal
function openModal(modal) {
  let activeModal = document.querySelector(".modal.open")
  if (!activeModal && !header.classList.contains("show-mobMenu") ) {
      disableScroll()
  }
  if (activeModal) {
    activeModal.classList.remove("open")
  }
  modal.classList.add("open")
}
//close modal
function closeModal(modal) {
  modal.classList.remove("open")
  setTimeout(() => {
    if (!header.classList.contains("show-mobMenu")) {
      enableScroll()
    }
  }, animSpd);
}
// modal click outside
if (modal) {
  modal.forEach((mod) => {
      mod.addEventListener("click", (e) => {
          if (!mod.querySelector(".modal__content").contains(e.target) ||
              mod.querySelector(".btn-close").contains(e.target) ||
              (mod.querySelector(".modal__close") && mod.querySelector(".modal__close").contains(e.target))) {
              closeModal(mod);
          }
      });
  });
}
// modal button on click
if (modOpenBtn) {
  modOpenBtn.forEach(btn => {
    btn.addEventListener("click", e => {
        e.preventDefault()
        let href = btn.getAttribute("data-modal")
        openModal(document.getElementById(href))
    })
  })
}
// modal close button on click
if (modCloseBtn) {
  modCloseBtn.forEach(btn => {
    btn.addEventListener("click", e => {
        e.preventDefault()
        let href = btn.getAttribute("data-modal")
        closeModal(document.getElementById(href))
    })
  })
}
//open dropdown
function openDropdown(item) {
  if (item.classList.contains("stock-filter")) {
    disableScroll()
  }
  item.classList.add("open");
  item.setAttribute("aria-expanded", true);
  if (item.querySelectorAll(".dropdown__options input").length > 0) {
    item.querySelectorAll(".dropdown__options input").forEach(inp => {
      inp.addEventListener("change", (e) => {
        setActiveOption(item)
      });
  });
  }
  document.addEventListener("click", function clickOutside(e) {
    if (!item.contains(e.target)) {
      closeDropdown(item)
      document.removeEventListener('click', clickOutside);
    }
  });
}
// set active option
function setActiveOption(item) {
  item.querySelector(".dropdown__header").classList.add("checked")
  if (item.classList.contains("radio-select")) {
    let activeInpTxt = item.querySelector("input:checked").nextElementSibling.innerHTML
    item.querySelector(".dropdown__header span").innerHTML = activeInpTxt
  }
}
//close dropdonw
function closeDropdown(item) {
  if (item.classList.contains("stock-filter")) {
    enableScroll()
  }
  item.classList.remove("open");
  item.setAttribute("aria-expanded", false);
}
//dropdown
if (dropdown) {
  dropdown.forEach(item => {
    item.querySelector(".dropdown__header").addEventListener("click", () =>  {
      item.classList.contains("open") ? closeDropdown(item) : openDropdown(item)
    })
  })
}
//setSuccessTxt
function setSuccessTxt(title = false, txt = false, btnTxt = false) {
  let lang = document.querySelector(".lang a.active").textContent.toLowerCase()
  successModal.querySelector("h3").textContent = title ? title : lang == "ru" ? "Заявка отправлена" : "Your request has been sent"
  successModal.querySelector(".main-btn span").textContent = btnTxt ? btnTxt : lang == "ru" ? "Закрыть" : "Close"
  if (txt) {
    successModal.querySelector("p").textContent = txt
  }
}
//setErrorTxt
function setErrorTxt(title = false, txt = false, btnTxt = false) {
  let lang = document.querySelector(".lang a.active").textContent.toLowerCase()
  errorModal.querySelector("h3").textContent = title ? title : lang == "ru" ? "Что-то пошло не так" : "Something went wrong"
  errorModal.querySelector(".main-btn span").textContent = btnTxt ? btnTxt : lang == "ru" ? "Закрыть" : "Close" 
  if (txt) {
    errorModal.querySelector("p").textContent = txt
  }
}
// openSuccessMod
function openSuccessMod(title = false, txt = false, btnTxt = false) {
  setSuccessTxt(title,txt, btnTxt)
  openModal(successModal)
}
// openErrorMod
function openErrorMod(title = false, txt = false, btnTxt = false) {
  setErrorTxt(title,txt, btnTxt )
  openModal(errorModal)
}
// formSuccess
function formSuccess(form, title = false, txt = false, btnTxt = false) {
  form.querySelectorAll(".item-form").forEach(item => item.classList.remove("error"))
  form.querySelectorAll("input").forEach(inp => {
      if (!["hidden", "checkbox", "radio"].includes(inp.type)) {
          inp.value = ""
      }
      if (["checkbox", "radio"].includes(inp.type) && !inp.classList.contains("required")) {
          inp.checked = false
      }
  })
  if (form.querySelector("textarea")) {
      form.querySelector("textarea").value = ""
  }
  if (form.querySelector(".file-form__items")) {
      form.querySelector(".file-form__items").innerHTML = ""
  }
  openSuccessMod(title, txt, btnTxt)
}
// search form
function searchFormSuccess(form) {
  form.querySelector("input[type=text]").value = ""
  form.classList.remove("btn-show")
}
const searchForm = document.querySelectorAll(".search-form")
function showSumbitBtn(item) {
  if (item.querySelector("input").value.length > 0) {
    item.classList.add("btn-show")
  } else {
      item.classList.remove("btn-show")
  }
}
if (searchForm) {
  searchForm.forEach(item => {
    showSumbitBtn(item)
    item.querySelector("input").addEventListener("input",() => showSumbitBtn(item))
    item.addEventListener("reset", () => {
      item.querySelector("input").setAttribute("value", "")
      showSumbitBtn(item) 
    })
    if (item.parentNode.querySelector(".search-p__results-empty-btn")) {
      item.parentNode.querySelector(".search-p__results-empty-btn").addEventListener("click", () => {
        item.querySelector("input[type=text]").setAttribute("value", "") 
        showSumbitBtn(item)
        setTimeout(() => {
          item.querySelector("input[type=text]").focus();
        }, 0);
      })
    }
  })
}
//mask input
const inp = document.querySelectorAll('input[type=tel]')
if (inp) {
    inp.forEach(item => {
        Inputmask({ "mask": "+7 (999) 999-99-99" }).mask(item);
    })
}
//file-form
function addFile(files, item) {
  for (let i = 0; i < files.length; i++) {
    let file = files[i]
    if (file.size >  10 * 1024 * 1024) {
      item.querySelector("input").value = "" 
      item.classList.add("error")
      item.querySelectorAll(".file-form__item").forEach((el=>el.remove()));
      item.querySelector(".item-form__error").textContent = "Файл должен быть менее 10 МБ"
      return
    } else if (!fileTypes.includes(file.type)) {
      item.querySelector("input").value = "" 
      item.classList.add("error")
      item.querySelectorAll(".file-form__item").forEach((el=>el.remove()));
      item.querySelector(".item-form__error").textContent = 'Разрешённые форматы: png, jpg, jpeg, pdf'
      return
    } else {
      item.classList.remove("error")
      item.classList.add("checked")
      item.querySelector(".item-form__error").textContent = "" 
      let reader = new FileReader()
      reader.readAsDataURL(file);
      reader.onload = () => {
          item.querySelector(".file-form__items").insertAdjacentHTML("afterbegin", `<div class="file-form__item">
            <div class="file-form__del"></div>
            <div class="file-form__name">${file.name}</div>         
         </div>
        `)
      }
      reader.onerror = () => {
        console.log(reader.error);
      } 
    }
  }
}
let fileTypes = [
  "image/png", "image/jpeg", "application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", 
]
if (document.querySelector(".file-form")) {
  document.querySelectorAll(".file-form").forEach(item => {
    item.querySelector("input").addEventListener("change", e => { 
      item.querySelectorAll(".file-form__item").forEach((el=>el.remove())); 
      let files = e.target.files;
      addFile(files, item)
    })
    //delete file
    item.addEventListener("click", e => {
      item.querySelectorAll(".file-form__del").forEach((del, idx) => {
        if (del.contains(e.target)) {
            const dt = new DataTransfer()
            const input = item.querySelector("input")
            const { files } = input
            for (let i = 0; i < files.length; i++) {
                let file = files[i]
                if (i !== idx) {
                  dt.items.add(file)
                }      
            }
            input.files = dt.files
            setTimeout(() => {
              del.parentNode.remove()
              item.classList.remove("checked")
           }, 0);
        }
      }) 
    })
    item.querySelector("label").addEventListener("dragenter", e => {
      e.preventDefault();
    })
    item.querySelector("label").addEventListener("dragover", e => {
      e.preventDefault();
    })
    item.querySelector("label").addEventListener("dragleave", e => {
      e.preventDefault();
    })
    item.querySelector("label").addEventListener("drop", function(e) {
      e.preventDefault();
      const dt = new DataTransfer()
      dt.items.add(e.dataTransfer.files[0])
      let files = Array.from(dt.files)
      item.querySelector("input").files = dt.files
      item.querySelectorAll(".file-form__item").forEach((el=>el.remove()));
      addFile(files, item)
    });
  })
}
// allItemsCheck
function allCheckBtn(allItemsCheck,checkItems) {
  allItemsCheck.addEventListener("change",() => {
    checkItems.forEach(item => {
      if (allItemsCheck.checked) {
        item.checked = true
        item.setAttribute("checked", true)
      } else {
        item.checked = false
        item.removeAttribute("checked")
      }
    })
  })
  checkItems.forEach(item => {
    item.addEventListener("change",() => {
      if (Array.from(checkItems).every(item => item.checked )) {
        allItemsCheck.checked = true
        allItemsCheck.setAttribute("checked", true)
      } else {
        allItemsCheck.checked = false
        allItemsCheck.removeAttribute("checked")
      }
    })
  })
}
//accordion
const accordion = document.querySelectorAll(".accordion")
if (accordion) {
  accordion.forEach(item => {
    item.querySelector(".accordion__header").addEventListener("click", () => {
      item.parentNode.parentNode.querySelectorAll(".accordion").forEach(el => {
        if (el.querySelector(".accordion__header").classList.contains("active")) { 
          smoothDrop(el.querySelector(".accordion__header"), el.querySelector(".accordion__body"))        
          if (el.getBoundingClientRect().top < 0) {
            let pos = scrollPos() + item.getBoundingClientRect().top - el.querySelector(".accordion__body").clientHeight - header.clientHeight - 10
            window.scrollTo(0, pos)
          } 
        }
      })
      smoothDrop(item.querySelector(".accordion__header"), item.querySelector(".accordion__body"))
    })
  })
}
// extra text
document.addEventListener("click", e => {
  document.querySelectorAll(".read-more").forEach(item => {
    if (item.querySelector(".read-more__btn").contains(e.target)) {
      let openTxt = item.querySelector(".read-more__btn").getAttribute("data-open")
      let closeTxt = item.querySelector(".read-more__btn").getAttribute("data-close")
      if (!item.classList.contains("active")) {
          item.classList.add("active")
          let height = item.querySelector(".read-more__content").clientHeight + "px"
          item.classList.remove("more-hidden")        
          let fullHeight = item.querySelector(".read-more__content").clientHeight + "px"
          item.querySelector(".read-more__content").style.height = height; 
          setTimeout(function () {
            item.querySelector(".read-more__content").style.height = fullHeight
            item.querySelector(".read-more__btn span").textContent = closeTxt           
            setTimeout(() => {
                  item.querySelector(".read-more__content").style.height = null
            }, 500); 
          }, 0);
      } else {
          item.classList.remove("active")
          let fullHeight = item.querySelector(".read-more__content").clientHeight + 'px';
          item.classList.add("more-hidden")
          let height = item.querySelector(".read-more__content").clientHeight + 'px';
          item.classList.remove("more-hidden")
          item.querySelector(".read-more__content").style.height = fullHeight   
          setTimeout(function () {
              item.querySelector(".read-more__content").style.height = height
              item.querySelector(".read-more__btn span").textContent = openTxt
              setTimeout(() => {
                item.classList.add("more-hidden")
                item.querySelector(".read-more__content").style.height = null
              }, 500);
          }, 0);
      }
    }
  })
})
function showMoreBtn() {
  if (document.querySelector(".read-more")) {
    document.querySelectorAll(".read-more").forEach(item => {
      let openTxt = item.querySelector(".read-more__btn").getAttribute("data-open")
      item.classList.remove("active")
      item.classList.add("more-hidden")
      let height = item.querySelector(".read-more__content").clientHeight
      item.classList.remove("more-hidden")
      let fullHeight = item.querySelector(".read-more__content").clientHeight
      item.classList.add("more-hidden")
      if (fullHeight > height ) {
        item.classList.add("btn-show")
        item.querySelector(".read-more__btn span").textContent = openTxt
      } else {
        item.classList.remove("btn-show")
      }
    })
  }
}
showMoreBtn()
let currWinW = window.innerWidth
window.addEventListener("resize", () => {
  if (currWinW != window.innerWidth) {
    showMoreBtn()
    currWinW = window.innerWidth
  }
})
//share
const share = document.querySelector(".share")
if (share) {
  const url = encodeURIComponent(window.location.href)
  const title = encodeURIComponent(document.title)
  let linkArr = [
      {
        title: 'VK',
        href: "https://vk.com/share.php?url=" + url + "&title=" + title,
      },
      {
        title: 'WhatsApp',
        href: "https://api.whatsapp.com/send?text=" + encodeURIComponent(document.title + " " + window.location.href),
      },
      {
        title: 'Телеграм',
        href: "https://t.me/share/url?url=" + url + '&text=' + title,
      },
      {
          title: 'Одноклассники',
          href: "https://connect.ok.ru/offer?url=" + url + "&title=" + title,
      },
  ]
  share.querySelectorAll(".share__list a").forEach((link,idx) => link.setAttribute("href", linkArr[idx].href))
}
//menu
iconMenu.addEventListener("click", () => {
  if (header.classList.contains("show-mobMenu")) {
    enableScroll()
    header.classList.remove("show-mobMenu")
  } else {
    disableScroll()
    header.classList.add("show-mobMenu")
  }
})
window.addEventListener("resize", () => {
  if (header.classList.contains("show-mobMenu") && window.innerWidth > tablet) {
    iconMenu.click()
  }
})
const itemMenu = document.querySelectorAll(".mob-menu .menu__item.has-subnavs")
if (itemMenu) {
  itemMenu.forEach(item => {
    item.querySelector(".menu__header").addEventListener("click", () => {
      item.parentNode.querySelectorAll(".menu__item").forEach(el => {
        if (el.querySelector(".menu__header").classList.contains("active")) {
          smoothDrop(el.querySelector(".menu__header"), el.querySelector(".menu__subnavs"))
        }
      })
      smoothDrop(item.querySelector(".menu__header"), item.querySelector(".menu__subnavs"))
    })
  })
}
//swiper 3 items
const swiper3 = document.querySelectorAll('.swiper3')
if (swiper3) {
  swiper3.forEach(item => {
    let itemSwiper = new Swiper(item.querySelector(".swiper"), {
        slidesPerView: 1,
        spaceBetween: 10,
        observer: true,
        observeParents: true,
        watchSlidesProgress: true,
        navigation: {
            prevEl: item.querySelector(".nav-btn--prev"),
            nextEl: item.querySelector(".nav-btn--next"),
        },
        breakpoints: {
          1579.98: {
            slidesPerView: 3,
            spaceBetween: 20
          },
          767.98: {
            slidesPerView: 3,
            spaceBetween: 10
          }
        },
        speed: 800,
    }); 
  })
}
//swiper 6 items
const swiper6 = document.querySelectorAll('.swiper6')
if (swiper6) {
  swiper6.forEach(item => {
    let itemSwiper = new Swiper(item.querySelector(".swiper"), {
        slidesPerView: 2,
        spaceBetween: 10,
        observer: true,
        observeParents: true,
        watchSlidesProgress: true,
        navigation: {
            prevEl: item.querySelector(".nav-btn--prev"),
            nextEl: item.querySelector(".nav-btn--next"),
        },
        breakpoints: {
          1579.98: {
            slidesPerView: 6,
            spaceBetween: 20
          },
          992.98: {
            slidesPerView: 6,
            spaceBetween: 10
          },
          767.98: {
            slidesPerView: 4,
            spaceBetween: 10
          },
          575.98: {
            slidesPerView: 3,
            spaceBetween: 10
          }
        },
        speed: 800,
    }); 
  })
}
//news swiper
const newsSwiper = document.querySelectorAll('.news-swiper')
if (newsSwiper) {
  newsSwiper.forEach(item => {
    let itemSwiper = new Swiper(item.querySelector(".swiper"), {
        slidesPerView: 1.2,
        spaceBetween: 10,
        observer: true,
        observeParents: true,
        watchSlidesProgress: true,
        navigation: {
            prevEl: item.querySelector(".nav-btn--prev"),
            nextEl: item.querySelector(".nav-btn--next"),
        },
        breakpoints: {
          1579.98: {
            slidesPerView: 3,
            spaceBetween: 20
          },
          767.98: {
            slidesPerView: 3,
            spaceBetween: 10
          },
          575.98: {
            slidesPerView: 2,
            spaceBetween: 10
          }
        },
        speed: 800,
    }); 
  })
}
//gallery 
const gallery = document.querySelectorAll('.gallery')
if (gallery) {
  gallery.forEach(item => {
    let itemSwiper = new Swiper(item.querySelector(".swiper"), {
        slidesPerView: "auto",
        spaceBetween: 10,
        observer: true,
        observeParents: true,
        watchSlidesProgress: true,
        navigation: {
            prevEl: item.querySelector(".nav-btn--prev"),
            nextEl: item.querySelector(".nav-btn--next"),
        },
        autoplay: {
          delay: 3500,
          pauseOnMouseEnter: true,
          disableOnInteraction: false
        },
        breakpoints: {
          1579.98: {
            spaceBetween: 20
          }
        },
        speed: 800,
    }); 
  })
}
const productSwiper = document.querySelector(".product-swiper")
if (productSwiper) {
  let swiper = new Swiper(productSwiper.querySelector(".swiper"), {
    slidesPerView: 1,
    spaceBetween: 10,
    loop: productSwiper.querySelectorAll(".swiper-slide").length > 1,
    observer: true,
    observeParents: true,
    watchSlidesProgress: true,
    navigation: {
        prevEl: productSwiper.querySelector(".nav-btn--prev"),
        nextEl: productSwiper.querySelector(".nav-btn--next"),
    },
    breakpoints: {
      1579.98: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      767.98: {
        slidesPerView: 2,
        spaceBetween: 20
      }
    },
    speed: 800,
  }); 
  let currFancySlide
  Fancybox.bind('[data-fancybox=product_gall]', {
    contentClick: "iterateZoom",
    Images: {
      Panzoom: {
        maxScale: 2,
      },
    },
    on: {
      "Carousel.ready Carousel.change": (fancybox) => {
        currFancySlide = fancybox.carousel.page
      },
      close:  (fancybox,slide) =>  {
        swiper.slideTo(currFancySlide)    
      }
    },
  });
}
//stock-filter
const stockFiltSec = document.querySelectorAll(".stock-filter__sec")
if (stockFiltSec) {
  stockFiltSec.forEach(item => {
    item.querySelector(".stock-filter__sec-header").addEventListener("click", () => {
      item.parentNode.parentNode.querySelectorAll(".stock-filter__sec").forEach(el => {
        if (el.querySelector(".stock-filter__sec-header").classList.contains("active")) {
          smoothDrop(el.querySelector(".stock-filter__sec-header"), el.querySelector(".stock-filter__sec-body"))
        }
      })
      smoothDrop(item.querySelector(".stock-filter__sec-header"), item.querySelector(".stock-filter__sec-body"))
    })
  })
}
// filter inputs onchange
/* const catStockFilter = document.querySelector(".stock-filter")
const choiceFilter = document.querySelector(".choice-filter__items")
if (catStockFilter && choiceFilter) {
  const catfilter = {
    unCheckInp: function (inp) {
      inp.checked = false
      inp.removeAttribute("checked")
    },
    setSelected: function (item) {
      let txt = item.parentNode.querySelector("span").textContent.toLowerCase()
      let idx = item.getAttribute("data-id")
      let inpName = item.getAttribute("data-name")
      choiceFilter.insertAdjacentHTML("afterbegin", `<div class="choice-filter__item" data-target="${idx}">${inpName} ${txt}</div>`)
    },
    removeSelected: function (id) {
      if (choiceFilter.querySelector(`[data-target="${id}"]`)) {
        choiceFilter.querySelector(`[data-target="${id}"]`).remove()
      }
    },
    selectedOnClick: function (e) {
      choiceFilter.querySelectorAll(".choice-filter__item").forEach(item => {
        if (item.contains(e.target)) {
          let dataTarget = item.getAttribute("data-target")
          this.unCheckInp(catStockFilter.querySelector(`label input[data-id=${dataTarget}]`))
          item.remove()
        }
      })
    },
    resetFilter: function () {
      catStockFilter.querySelectorAll("label input").forEach(inp => {
        this.unCheckInp(inp)
      })
      choiceFilter.innerHTML = ""
      closeDropdown(catStockFilter)
    }
  }
  catStockFilter.querySelectorAll("label input").forEach((inp, i) => {
    inp.setAttribute("data-id", `arr-filter-${i}`)
    let index = inp.getAttribute("data-id")
    inp.addEventListener("change", () => {
      if (inp.type === 'checkbox') {
        inp.checked ? catfilter.setSelected(inp) : catfilter.removeSelected(index)
      } else if (inp.type === 'radio') {
        catStockFilter.querySelectorAll(`input[name='${inp.name}']`).forEach(inp => catfilter.removeSelected(inp.getAttribute("data-id")))
        catfilter.setSelected(inp)
      }
    })
  })
  choiceFilter.addEventListener("click", e => catfilter.selectedOnClick(e))
  document.querySelector(".choice-filter__reset").addEventListener("click", () => catfilter.resetFilter())
  catStockFilter.querySelector("form").addEventListener("reset", () => catfilter.resetFilter())
} */
// section animation
const animItem = document.querySelectorAll('[data-animation]')
function animate() {
  animItem.forEach(item => {
    let animation = item.getAttribute("data-animation");
    let itemTop = item.getBoundingClientRect().top + scrollPos();
    let itemPoint = Math.abs(window.innerHeight - item.offsetHeight * 0.1);
    if (item.offsetHeight === undefined) {
      itemPoint = window.innerHeight - item.parentNode.offsetHeight / 2;
    }
    if (scrollPos() > itemTop - itemPoint) {
      let animName = item.getAttribute("data-animation")
      item.classList.add(animName);
    } 
  })
}
if (animItem.length > 0) {
  animate()
  window.addEventListener("scroll", animate)
}

const catStockFilter = document.querySelector(".stock-filter")
const choiceFilter = document.querySelector(".choice-filter__items")

if (catStockFilter && choiceFilter) {
  const catfilter = {
    unCheckInp: function (inp) {
      inp.checked = false
      inp.removeAttribute("checked")
    },
    checkSelected: function() {
      let inpArr = document.querySelectorAll("input:checked")
      inpArr.forEach(item => {
        catfilter.setSelected(item)
      })
    },
    setSelected: function (item) {
      let txt = item.parentNode.querySelector("span").textContent.toLowerCase()
      let idx = item.getAttribute("data-id")
      let inpName = item.getAttribute("data-name")
      choiceFilter.insertAdjacentHTML("afterbegin", `<div class="choice-filter__item" data-target="${idx}">${inpName} ${txt}</div>`)
    },
    removeSelected: function (id) {
      if (choiceFilter.querySelector(`[data-target="${id}"]`)) {
        choiceFilter.querySelector(`[data-target="${id}"]`).remove()
      }
    },
    selectedOnClick: function (e) {
      choiceFilter.querySelectorAll(".choice-filter__item").forEach(item => {
        if (item.contains(e.target)) {
          let dataTarget = item.getAttribute("data-target")
          this.unCheckInp(catStockFilter.querySelector(`label input[data-id=${dataTarget}]`))
          item.remove()
          catStockFilter.querySelector("form").submit()
        }
      })
    },
    resetFilter: function () {
      catStockFilter.querySelectorAll("label input").forEach(inp => {
        this.unCheckInp(inp)
      })
      choiceFilter.innerHTML = ""
      closeDropdown(catStockFilter)
    }
  }
  catfilter.checkSelected()
  choiceFilter.addEventListener("click", e => catfilter.selectedOnClick(e))
  document.querySelector(".choice-filter__reset").addEventListener("click", () => {
    catfilter.resetFilter()
    catStockFilter.querySelector("form").submit()
  })
  catStockFilter.querySelector("form").addEventListener("reset", () => {
    catfilter.resetFilter()
    catStockFilter.querySelector("form").submit()
  })
}


