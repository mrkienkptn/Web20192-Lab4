


$('.menu-toggle').click(function () {
   $(".nav").toggleClass("mobile-nav");
   $(this).toggleClass("is-active");
});
$('.nav-dropdown').hide()
$('nav ul li p:not(:only-child)').click(function (e) {
   $(this).siblings('.nav-dropdown').toggle();
   // Close one dropdown when selecting another
   $('.nav-dropdown').not($(this).siblings()).hide();
   e.stopPropagation();
});
// Clicking away from dropdown will remove the dropdown class

$('html').click(function () {
   $('.nav-dropdown').hide();
});




