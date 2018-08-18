const cacheName = 'v1';

// Call Install Event
// Please note: this gets everything
self.addEventListener( 'install',  ( e ) => {
   //console.log( 'Service Worker: Installed' );
} );

// Call Activate Event
self.addEventListener( 'activate', ( e ) => {
   //console.log( 'Service Worker: Activated' );
   //console.log( cacheNames );

   // Use Promise to Remove unwanted caches
   e.waitUntil(
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
self.addEventListener( 'fetch', ( e ) => {
   if (e.request.method === 'POST') {
      //console.log('Service Worker ERROR: Fetching POST');
   }
   //console.log('Service Worker: Fetching');
   // works with promise
   e.respondWith(
      fetch( e.request )
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
                  cache.put( e.request, resClone );
               } );
            return res;
         } )
         .catch( err => caches
            .match( e.request )
            .then(  res => res ) )
   );
} );
