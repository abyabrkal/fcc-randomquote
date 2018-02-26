$(document).ready(function(){

  var oneQuote = "";

  // First call to get the quote while initial loading
  getQuote();
    
  function getQuote(){

        $.ajax( {
          url: 'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=',
          type: "GET",
          dataType: "jsonp",
          contentType: false,
          xhrFields: {
            withCredentials: false,
          },
          crossDomain: true,
          success: function(data) {

            // The data is an array of posts. Grab the first one.
            var oneQuote = data.shift(); 
            console.log(oneQuote);
            // TESTING 
            //$('#quoteMsg').html(oneQuote.content);
            //$('#quoteAuthor').text(oneQuote.title);
            
            console.log("\nCONTENT>>>> GQ - " + oneQuote.content);
            console.log("\nTITLE>>>> GQ - " + oneQuote.title);
            loadData();

            }
          },
          cache: false,
        });
        /*************************************************************** 
     function getQuote(){

        $.ajax( {
          url: 'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=',
          type: "GET",
          dataType: "json",
          success: function(data) {

            // The data is an array of posts. Grab the first one.
            oneQuote = data.shift(); 

          
            loadData();

 
          },
          cache: false,
          xhrFields: {
            withCredentials: false
          }
        });

     } */
    
  }
   
  // Loading Data to respective title and author tags based on 200 character limit
	function loadData() {
    console.log("\nCONTENT>>>> LD - " + oneQuote.content);
    console.log("\nTITLE>>>> LD - " + oneQuote.title);

		if (oneQuote.content.length > 200) {
			getQuote();
		} else {
		  $('#quoteMsg').html(oneQuote.content);

		  if (oneQuote.title){
		    $('#quoteAuthor').html(oneQuote.title);
		  }
		  else{
            $('#quoteAuthor').text('Anonymous');
		  }
        }
    }
  

  // BUTTON CLICK EVENT: New quote at every next button click
  $('#nextQuote').on('click', function(event){
    event.preventDefault();
    
    getQuote();
  });
  

  // BUTTON CLICK EVENT: Share quote via TWITTER
  $('#tweetQuote').on('click', function(event) {
    event.preventDefault();
    
    window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent("#dailyquote" + oneQuote.content + ' by ' + oneQuote.title));
  });
});
