# PWA with Flask

_POC to see how PWA and flask work best togther_

Handover

- install
- push to app store
- load on scroll


Today

- [x] update web is working on refresh
- [x] update adr is working on kill
- [x] update ios is working on few access

- [x] offline page works on all
  - [ ] on online, send back to last location (save in local db)

- icons
  - [x] web ok
  - [x] adr ok
  - [x] ios ok - need https

- splash
  - [x] web ok
  - [x] adr ok
  - [ ] ios no

- [x] notifications
- [ ] vibration not supported on both
- [x] wake lock working on all

icons

- html '/src/img/icons/favicon-32.png',

- manifest
  - 'src/img/icons/manifest-icon-192.maskable.png'
  - 'src/img/icons/manifest-icon-512.maskable.png'

- no use
  - '/src/img/icons/icon-144x144.png',
  - '/src/img/icons/icon-152x152.png',
  - '/src/img/icons/icon-167x167.png',
  - '/src/img/icons/icon-180x180.png',
  - '/src/img/icons/icon-192x192.png',
  - '/src/img/icons/icon-512x512.png',
  - '/src/img/icons/icon-600x600.png',


What to do

- Check minimum PWA required
- Add PWA to flask
- Add install now in iOS and Android
- Notifications in PWA on ios and android

## PWA Today Decode

- SW `https://whatpwacando.today/service-worker.js`
  - app.js `https://whatpwacando.today/app.js`
  - manifest `https://whatpwacando.today/manifest.json`
- SW elements

PWA Flow

- `pwa-app.js`
  - loads sw

- `sw.js`
  - served by flask to avoid headers
- `manifest.json`
  - static server read
  - icons relative to this file

NGINX Update

```sh
sudo nano /etc/nginx/sites-enabled/flaskone
sudo service nginx reload
```

Start the Service

```sh
python -m flask --app flask-pwa.py run --debug --port 5001
```

Init

```sh
pip install --upgrade pip
venv/bin/python -m pip install -r requirements.txt
```

To do:

`rm /var/www/flasks/pwa-with-flask`
