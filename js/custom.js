var app = {
    bindMoreBtn: function(){
        let next = $(document).find("[data-ajax-pages] .pagination__nav__next");
        let btn = $(document).find("[data-ajax-pages] [data-more-btn]");
        if(btn.length < 1) return;
        if(next.length > 0) {
            btn.data("link", next.data("link"));
            btn.show();
        } else {
            btn.hide();
        }
    },
    bindPaginate: function () {
        let self = this;
        $(document).on("click", "[data-ajax-pages] [data-link]", function (e) {
            //alert('ok');
            e.preventDefault();
            let url = $(this).data("link").split("?");
            let type = $(this).data("type") || "replace";
            let pagesBlock = $(document).find("[data-ajax-pages]");
            let block = $(document).find("[data-ajax-content]");
            $.ajax({
                url: url[0],
                data: url[1],
                type: "get",
                beforeSend: function () {
                    block.css({'opacity': '0.5'});
                    pagesBlock.css({'opacity': '0.5'});
                    pagesBlock.find("[data-link]").prop('disabled', true);
                },
                success: function (msg) {
                    block.css({'opacity': '1'});
                    pagesBlock.css({'opacity': '1'});
                    pagesBlock.find("[data-link]").prop('disabled', false);
                    /*console.log(msg);*/
                    let html = $(msg).find("[data-ajax-content]").html() || '';
                    let new_pages = $(msg).find("[data-ajax-pages]").html() || '';
                    if (type == 'append') {
                        block.append(html);
                    } else {
                        block.html(html);
                        $("html,body").animate({'scrollTop': block.offset().top - 200}, 500);
                    }
                    pagesBlock.html(new_pages);
                    self.bindMoreBtn();
                    history.pushState('', '', url.join('?'));
                }
            })
        })
    },
    bindProductBtns: function(){
        $(document).on("click", "[data-product-btn]", function(){
            let id = $(this).data('productBtn');
            let target = $(this).data('target') || '';
            let field =  $(document).find("form[data-form='" + target + "'] input[name='product_id']");
            if(field.length > 0) {
                field.val( $(this).data('productBtn') );
            }
        })
    },
    init: function(){
        this.bindPaginate();
        this.bindMoreBtn();
        this.bindProductBtns();
    }
};

$(document).ready(function(){
    app.init();

    $(document).on("evocms-user-send-form-success", function(e, actionUser, actionId, element, msg){
        let title = element.data('successTitle') || successModalTitleDefault;
        let text = element.data('successText') || successModalTextDefault;
        let btnTitle = element.data('successBtnTitle') || successModalBtnTitleDefault;
        formSuccess(element[0], title, text, btnTitle);
    })

    $(document).on("evocms-user-send-form-error", function(e, actionUser, actionId, element, msg){
        if(typeof msg.errors.fail != "undefined" && msg.errors.fail.length > 0) {
            openModal(errorModal);
        }
        /*let errors = msg.errors.customErrors || {};
        for(k in errors) {
            element.find("[name='" + k + "']").addClass("error");
        }*/

    })

})


const swiperIntro = document.querySelector(".swiper-intro")
if (swiperIntro) {	
	const swiper = new Swiper(swiperIntro, {
		// Optional parameters
		slidesPerView: 1,
		loop: true,
		autoplay: {
			delay: 5000,
		},
		pagination: {
			el: swiperIntro.querySelector(".swiper-pagination"),
		},
	});
}