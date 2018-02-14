
// Delete Storage
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
          alert('Storage has been successfuly deleted!');
          window.location.href="/admin/warehouse";
        },
        error: function(err){
          console.log(err);
        }
      });
   }
  });
});

// Delete User
$(document).ready(function(){
  $('.deleteUserBtn').on('click', function(e){
    $target = $(e.target);
    let id = $target.attr('data-id');
    let confirmation = confirm('User will be deleted. Are you sure?');
    if(confirmation){
      $.ajax({
        type: 'DELETE',
        url: '/user/delete/'+id,
        success: function(){
          alert('User has been successfuly deleted!');
          window.location.href="/admin/manage_users";
        },
        error: function(err){
          console.log(err);
        }
      });
   }
  });
});
