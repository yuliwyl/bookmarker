// listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// save bookmark
function saveBookmark(e){
	// get form values
	var siteName =document.getElementById('siteName').value;
	var siteUrl =document.getElementById('siteUrl').value;

	if (!validateForm(siteName,siteUrl)){
		return false;
	}

	var bookmark={
		name: siteName,
		url: siteUrl
	}


    /*
	// local Storage Test
	localStorage.setItem('test','Hello world');
	localStorage.getItem
	localStorage.removeItem
	*/

    // test if bookmarks is null
	if(localStorage.getItem('bookmarks') === null){
		var bookmarks = [];
		bookmarks.push(bookmark);
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	} else{
		//get bookmark from local storage
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		//add bookmark to array
		bookmarks.push(bookmark);
		// reset to localstorage
		localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
	}
	// Clear forms
	document.getElementById('myForm').reset();

	//re-fetch bookmarks
	fetchBookmarks();

	// prevent form from submitting
	e.preventDefault();
}


//delebe bookmark
function deleteBookmark (url){
	//get bookmark from local storage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	// loop through bookmakrs
	for(var i = 0; i<bookmarks.length; i++){
		if(bookmarks[i].url == url){
			bookmarks.splice(i, 1);
		}
	}
	// reset to localstorage
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

	//re-fetch bookmarks
	fetchBookmarks();
}



//fetch bookmarks
function fetchBookmarks(){
	//get bookmark from local storage
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	// get output id
	var bookmarksResults = document.getElementById('bookmarksResults');

	//build output
	bookmarksResults.innerHTML = '';

	for(var i = 0; i<bookmarks.length; i++){
		var name=bookmarks[i].name;
		var url=bookmarks[i].url;

		bookmarksResults.innerHTML += '<div class="well">' +
		                              '<h3>' +name+
		                              '<a class="btn btn-default" target="_blank" href="'+url+'"> Visit </a> ' +
		                              '<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#"> Delete </a> ' +
		                              '</h3>' +
		                              '</div>'; 

	}
}


// validate form
function validateForm(siteName,siteUrl){
	if(!siteName || !siteUrl){
		alert('pulu commands you fill in the form');
		return false;
	}


	
	
	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);
	
	if (!siteUrl.match(regex)) {
  	alert("u dont know what url is ?!");
  	return false;
	}
	return true;
}


