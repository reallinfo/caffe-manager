
$(document).ready(function(){

  // Delete Storage
  $('.deleteStorageBtn').on('click', function(e){
    $target = $(e.target);
    let id = $target.attr('data-id');
    let storageName = $target.attr('data-name');
    let confirmation = confirm('Storage: '+storageName+' will be deleted. Are you sure?');
    if(confirmation){
      $.ajax({
        type: 'DELETE',
        url: '/admin/storage/delete/'+id,
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

  // Delete User
  $('.deleteUserBtn').on('click', function(e){
    $target = $(e.target);
    let id = $target.attr('data-id');
    let confirmation = confirm('User will be deleted. Are you sure?');
    if(confirmation){
      $.ajax({
        type: 'DELETE',
        url: '/admin/user/delete/'+id,
        success: function(){
          alert('User has been successfuly deleted!');
          window.location.href="/admin/manage_users";
          return;
        },
        error: function(err){
          alert('An error has occurred!'+'Error: '+err);
          console.log(err);
        }
      });
   }
  });

  // Delete Article
  $('.deleteArticleBtn').on('click', function(e){
    $target = $(e.target);
    let dataId = $target.attr('data-id');
    let confirmation = confirm('Article will be deleted. Are you sure?');
    if(confirmation){
      $.ajax({
        type: 'DELETE',
        url: '/admin/article/delete/'+dataId,
        success: function(){
          alert('Article has been successfuly deleted!');
          location.reload();
          return;
        },
        error: function(err){
          alert('An error has occurred!'+'Error: '+err);
          console.log(err);
        }
      });
    }
  });

  // Delete Table
  $('.deleteTableBtn').on('click', function(e){
    $target = $(e.target);
    let dataId = $target.attr('data-id');
    let confirmation = confirm('Table will be deleted. Are you sure?');
    if(confirmation){
      $.ajax({
        type: 'DELETE',
        url: '/admin/table/delete/'+dataId,
        success: function(){
          alert('Table has been successfuly deleted!');
          window.location.href="/admin/tables";
          return;
        },
        error: function(err){
          alert('An error has occurred!'+'Error: '+err);
          console.log(err);
        }
      });
    }
  });

  // Delete Order
  $('.deleteOrderBtn').on('click', function(e){
    $target = $(e.target);
    let dataId = $target.attr('data-id');
    let orderName = $target.attr('data-name');
    let confirmation = confirm('Order: '+ orderName +' will be deleted. Are you sure?');
    if(confirmation){
      $.ajax({
        type: 'DELETE',
        url: '/admin/order/delete/'+dataId,
        success: function(){
          alert('Order has been successfuly deleted!');
          location.reload();
          return;
        },
        error: function(err){
          alert('An error has occurred!'+'Error: '+err);
          console.log(err);
        }
      });
    }
  });





}); // Document Ready
