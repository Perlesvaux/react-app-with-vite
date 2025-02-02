export default function pwaTemplate({rep, name, shortName, themeColor, description}){




  return `,\n\nVitePWA({
  //you MUST have these three in your './public' directory:
  //favicon.png, screenshot-wide.png, screenshot-narrow.png
  //Make sure dimensions are correct. Wrong dimensions may
  //trigger bug that requires you to delete browser history
      registerType: 'autoUpdate',
      includeAssets: [], // Add static (./public) assets. i.e.: 'vite.svg'
      devOptions:{enabled:true},
      manifest: {
        name: '${name || 'testing'}',
        short_name:  '${shortName   || 'ReactPWA'}',
        description: '${description || 'A simple React PWA built with Vite'}',
        theme_color: '${themeColor  || '#ffffff'}',
        icons: [
            {
              'src': 'favicon.png',
              'sizes': '192x192',
              'type': 'image/png'
            }],
        start_url: '/${rep || 'ADD YOUR BASE HERE TOO'}/',
        screenshots: [
        {
          src: 'screenshot-narrow.png',
          sizes: '320x320',
          type: 'image/png',
          form_factor: 'narrow',
          label: 'Narrow'
        },
        {
          src: 'screenshot-wide.png',
          sizes: '320x320',
          type: 'image/png',
          form_factor: 'wide',
          label: 'Wide'
        }
        ],
      },

    })`

}
