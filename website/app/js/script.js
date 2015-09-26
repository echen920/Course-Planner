$(document).ready(function(){
  $("#create-deadline").click(function(){
    $("#rightContent").hide();
    $('#add-course-page').hide();
    $('#remove-course-page').hide();
    $('#add-deadline-page').filter(function() {
      return $(this).css('display') == 'none';
  }).animate({ opacity: 'toggle'}, 1000 );

    return false;
  });

  $("#button-add-deadline").click(function(){
    $("#add-deadline-page").hide();
    $('#rightContent').animate({ opacity: 'toggle'}, 1000 );
  });

  $('#add-course').click(function(){
    $('#rightContent').hide();
    $('#add-deadline-page').hide();
    $('#remove-course-page').hide();
    $('#add-course-page').filter(function() {
      return $(this).css('display') == 'none';
    }).animate({ opacity: 'toggle'}, 1000 );
    return false;
  });

  $('#button-add-course').click(function(){
    $('#add-course-page').hide();
    $('#add-deadline-page').hide();
    $('#rightContent').filter(function() {
      return $(this).css('display') == 'none';
    }).animate({ opacity: 'toggle'}, 1000 );
    return false;
  });

  $('#remove-course').click(function(){
    $('#rightContent').hide();
    $('#add-deadline-page').hide();
    $('#add-course-page').hide();
    $('#remove-course-page').filter(function() {
      return $(this).css('display') == 'none';
    }).animate({ opacity: 'toggle'}, 1000 );
    return false;
  });

  $('#button-done').click(function(){
    $('#remove-course-page').hide();
    $('#rightContent').filter(function() {
      return $(this).css('display') == 'none';
    }).animate({ opacity: 'toggle'}, 1000 );
    return false;
  });

  $('#search-result').click(function(){
    $('#add-deadline-page').hide();
    $('#remove-course-page').hide();
    $('#add-course-page').hide();
    $('#rightContent').filter(function() {
      return $(this).css('display') == 'none';
    }).animate({ opacity: 'toggle'}, 1000 );
    return false;
  });
});