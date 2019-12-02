if ('function' === typeof importScripts) {
  // eslint-disable-next-line no-undef
  importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js'
  );
  /* global workbox */
  if (workbox) {
    console.log('Workbox is loaded');

    /* injection point for manifest files.  */
    workbox.precaching.precacheAndRoute([
  {
    "url": "icons/144x144.png",
    "revision": "a68defad9afe6276d56cf0ffc9794616"
  },
  {
    "url": "icons/192x192.png",
    "revision": "ae81142e3c1ea186f8af969e3a7e4420"
  },
  {
    "url": "icons/48x48.png",
    "revision": "158b19c15366f28391a860d3e402b3eb"
  },
  {
    "url": "icons/72x72.png",
    "revision": "caadd2955683d799333be74a11723316"
  },
  {
    "url": "icons/96x96.png",
    "revision": "6942cb538ae3ecafce6cdbc843b2e54d"
  },
  {
    "url": "index.html",
    "revision": "30ae98753f72f94ff7463349584cf718"
  },
  {
    "url": "precache-manifest.f28c6100511b2dd5d911ccc4251bdc90.js",
    "revision": "f28c6100511b2dd5d911ccc4251bdc90"
  },
  {
    "url": "service-worker.js",
    "revision": "47852cb979ac01d82066aaee39140652"
  },
  {
    "url": "static/css/main.7463f1b2.chunk.css",
    "revision": "0c3c51172e7cd0b5f11d3db17258b5c9"
  },
  {
    "url": "static/js/2.be9bf815.chunk.js",
    "revision": "9f9dfdaac0c7b1ce3e3ef63e4cce67b9"
  },
  {
    "url": "static/js/main.cd0e7cca.chunk.js",
    "revision": "8444412c132b24eb9f123c959c98ccdf"
  },
  {
    "url": "static/js/runtime-main.ea60d297.js",
    "revision": "bf6cfb571dbe805b541b8482a857e7a7"
  },
  {
    "url": "static/media/filter.c25a009a.svg",
    "revision": "c25a009af7f00c44fc81804fc202b110"
  },
  {
    "url": "static/media/focus.ccd788fd.svg",
    "revision": "ccd788fdf56f78cd69b2b59e3e472b03"
  },
  {
    "url": "static/media/house.e5e58cb9.svg",
    "revision": "e5e58cb929b01d77911850065b63e4eb"
  },
  {
    "url": "static/media/magnifying-glass.d7433a82.svg",
    "revision": "d7433a829d24c96dceeaf758c1e9eb18"
  },
  {
    "url": "static/media/user.fcf27fa8.svg",
    "revision": "fcf27fa88092a0c765db45304e554aa7"
  }
]);

    /* custom cache rules*/
    workbox.routing.registerNavigationRoute('/index.html', {
      blacklist: [/^\/_/, /\/[^\/]+\.[^\/]+$/],
    });

    workbox.routing.registerRoute(
      /\.(?:png|gif|jpg|jpeg)$/,
      workbox.strategies.cacheFirst({
        cacheName: 'images',
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 60,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
          }),
        ],
      })
    );

  } else {
    console.log('Workbox could not be loaded. No Offline support');
  }
}
