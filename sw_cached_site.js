const cacheName = 'v1';

// Call Install Event
// Please note: this gets everything
self.addEventListener( 'install',  ( event ) => {
   //console.log( 'Service Worker: Installed' );
} );

// Call Activate Event
self.addEventListener( 'activate', ( event ) => {
   //console.log( 'Service Worker: Activated' );
   //console.log( cacheNames );

   // Use Promise to Remove unwanted caches
   event.waitUntil(
      // keys are like hashes
      // cacheNames - A DOMString that represents a
      //              specific cache to search within.
      caches.keys().then( cacheNames => {
         return Promise.all(
            cacheNames.map( cache => {
               // Must be a new cache
               if ( cache !== cacheName ) {
                  //console.log( 'Service Worker: Clearing Old Cache' );
                  return caches.delete( cache );
               }
            } )
         ); // cacheNames
      } ) // keys
   );  //waitUntil
} );

// Call Fetch Event
self.addEventListener( 'fetch', ( event ) => {
   //console.log('Service Worker: Fetching');
   // works with promise
   event.respondWith(
      fetch( event.request )
         .then( res => {

            // Make copy/clone of response
            const resClone = res.clone();

            // Open cache
            caches
               .open( cacheName )
               .then( cache => {
                  // Add response to cache
                  // Note: put() will overwrite any key/value pair previously
                  // stored in the cache that matches the request.
                  cache.put( event.request, resClone );
               } );
            return res;
         } )
         .catch( err => caches
            .match( event.request )
            .then(  res => res ) )
   );
} );
