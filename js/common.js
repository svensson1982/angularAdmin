$(function(){
	
	//menu functions
	$('.menuitems').children().on('click', function(){
  var res = $(this).attr('info');
  console.log(res);
  $(this).attr('ng-click',res);
});
});