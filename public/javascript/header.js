
$('.menu-toggle').click(function () {
   $(".nav").toggleClass("mobile-nav");
   $(this).toggleClass("is-active");
});
$('#username').click(()=>{
   $('.user').toggleClass("show");
   $('.user').toggleClass("no-show");
})
$().click(()=>{
   $('.user').removeClass('show')
})

