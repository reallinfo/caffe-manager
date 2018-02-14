

$(document).ready(function(){
  $('.delButton').on('click', function(e){
    $target = $(e.target);
    let id = $target.attr('data-id');
    let confirmation = confirm('Storage will be deleted. Are you sure?');
    if(confirmation){
      $.ajax({
        type: 'DELETE',
        url: '/storage/delete/'+id,
        success: function(){
          alert('Deleting Storage...');
          window.location.href="/admin/warehouse";
        },
        error: function(err){
          console.log(err);
        }
      });
   }
  });
});
