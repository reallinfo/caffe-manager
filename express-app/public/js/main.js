

$(document).ready(function(){

  // Delete Storage
  $('.deleteStorageBtn').on('click', function(e){
    $target = $(e.target);
    let id = $target.attr('data-id');
    let confirmation = confirm('Storage will be deleted. Are you sure?');
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

  // Articles search bar
  const list = document.querySelector('#articleList');
  const searchBar = document.getElementById('searchArticleInput');
  searchBar.addEventListener('keyup', function(e) {
    const term = e.target.value.toLowerCase();
    const articles = list.getElementsByTagName('li');

    Array.from(articles).forEach(function(article) {
      const articleName = article.querySelector('#articleName').textContent;
      // Display matching articles with colored background
      if(articleName.toLowerCase().indexOf(term) != -1){
        article.style.display = 'block';
        article.style.backgroundColor = 'LightGrey';
        // Hide unmatching articles
      }else{
        article.style.display = 'none';
      }
      if(term == 0 || ''){
        article.style.backgroundColor = '';
      }
    });
  });


}); // Document Ready
