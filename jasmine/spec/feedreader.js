/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* Test suite: the RSS feeds definitions  */
    describe('RSS Feeds', function() {
        /* TC1: a test that ensures the allFeeds variable
         * has been defined and that it is not empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TC2: a test that ensures each feed in the allFeeds object
         * has a URL defined and that the URL is not empty.
         */
         it('URL defined', function(){
           for(let feed of allFeeds){
             expect(feed.url).toBeDefined();
             expect(feed.url.length).toBeGreaterThan(0);
           }

         });


        /* TC3: a test that ensureseach feed in the allFeeds object
         * has a name defined and that the name is not empty.
         */
         it('name defined', function(){
           for(let feed of allFeeds){
             expect(feed.name).toBeDefined();
             expect(feed.name.length).toBeGreaterThan(0);
           }
         })
    });


    /* Test suite: The menu */
    describe('The menu', function(){

        /* TC1: a test that ensures the menu element is
         * hidden by default.
         */
         it('hidden by default', function(){
           expect($('body').hasClass('menu-hidden')).toBe(true);
         })

         /* TC2: a test that ensures the menu changes visibility
          * when the menu icon is clicked.
          */
          it('toggle display when clicked', function(){

            const menuIcon = document.querySelector('.menu-icon-link');
            expect($('body').hasClass('menu-hidden')).toBe(true);

            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBe(true);

          })
    });


    /* Test suite: Initial Entries */
    describe('Initial Entries',function(){

        /* TC1: a test that ensures when the loadFeed function
         * is called and completed, there is at least a single .entry
         * element within the .feed container.
         */

         beforeEach(function(done) {
           loadFeed(0, done);
         });

         it('one entry is loaded', function(){
           expect(document.querySelector('.feed').querySelectorAll('.entry').length).toBeGreaterThan(0);
         })
    });

    /* Test suite: New Feed Selection */
    describe('New Feed Selection', function(){

        /* TC1: a test that ensures when a new feed is loaded
         * by the loadFeed function that the feed content actually changes.
         */
         const container = document.querySelector('.feed');
         let feed0 = [], feed1 = [];

         beforeEach(function(done) {
           let feed;
           loadFeed(0, function(){
             feed = container.children;
             for(let i = 0; i < feed.length; i++){
               feed0.push(feed[i].innerText);
             }
             // nested loadFeed1 in loadFeed0's call back
             loadFeed(1, function(){
               feed = container.children;
               for(let i = 0; i<feed.length; i++){
                 feed1.push(feed[i].innerText);
               }
               done();
             });
           });

         });

         function isSameFeed(feed1, feed2){
           if(feed1.length != feed2.length) return false;
           for(let i = 0; i < feed1.length; i++){
             if(feed1[i] != feed2[i]) return false;
           }
           return true;
         }
         it('content changes', function(){
           expect(isSameFeed(feed0, feed1)).toBe(false);
         })
    })
}());
