# 🦓 \<novnc-element\>

v0.0.1 - 27-01-2023

Check
https://www.xmodulo.com/access-vnc-remote-desktop-web-browser.html

noVNC Embedding / Deploying noVNC Application (noVNC docs)
https://novnc.com/noVNC/docs/EMBEDDING.html

noVNC use the core with Javascript
https://github.com/novnc/noVNC/blob/master/vnc_lite.html
https://github.com/novnc/noVNC/blob/master/app/ui.js

noVNC APIs
https://novnc.com/info.html
https://github.com/novnc/noVNC/blob/master/docs/API.md

Angular Component
https://www.nasserboukehil.com/angular-vnc-client/

React Example
https://www.npmjs.com/package/react-novnc/v/0.1.1
https://github.com/roerohan/react-vnc

novnc-element is a noVnc remote desktop WebComponent. noVNC is a VNC client, implemented using HTML5 WebSockets, Canvas and Javascript all wrapped into a Lit WebComponent. Here some terms to keep in mind whe working with noVNC.

- RBF - Remote FrameBuffer protocol, open simple protocol for remote access to graphical UI
- VNC - Virtual Network Computing, is a system for desktop sharing, allowing remote access to a desktop session. Communication between the server and the client happens over TCP using VNC or RBF protocol (default port 5900).
- noVNC - HTML5 / Javascript Client, using noVNC is possible to connect to a VNC server from a browser.
- Websockify - WsProxy part of noVNC project. Websockify translate WebSockets traffic to normal socket traffic. Websockify accepts the WebSockets handshake, parses it, and then begins forwarding traffic between the client and the target in both directions

<p align="center">
  <a href="#utilities">utilities</a> •
  <a href="#examples">examples</a> •
  <a href="#usage">usage</a> •
  <a href="#api">api</a> •
  <a href="#accessibility">accessibility</a> •
  <a href="#todo">TODO</a> •
</p>

# Utilities

noVNC
https://github.com/novnc/noVNC

Efficient VNC Server
https://tigervnc.org/

Bridge between TCP and WebSocket
https://github.com/novnc/websockify

Desktop Environment
https://www.xfce.org/

# Websockify

```bash
```

## TODO
https://datawookie.dev/blog/2021/08/websockify-novnc-behind-an-nginx-proxy/

## Use Case
Run the default RealVNC server on Raspberry Pi 4 < , in VNC options set the 


## Examples

![Qr-Code-Element](https://cicciosgamino.web.app/images/qr-code.png)

```html
<novnc-element
    text="Hello World"
    error-correction="medium">
</novnc-element>
```

## 🚀 Usage

1. Install package
```bash
npm install --save @cicciosgamino/novnc-element
```

2. Import
```html
<!-- Import Js Module -->
<script type="module">
  // Importing this module registers <qr-code-element> as an HTMLElement
  //
  // Note this import is a bare module specifier, so it must be converted
  // to a path using a server such as @web/dev-server or vite
  import '@cicciosgamino/novnc-element'
</script>
```

3. Place in your HTML
```html
<qr-code-element
  text="Hello World"
  error-correction="medium"
  mask-pattern="-1">
</qr-code-element>
```

4. Use the component with LitElement
```javascript
import * from '@cicciosgamino/qr-code-element'

render () {
  return html`
    <qr-code-element
      text="Hello World"
      graphic-element="canvas"
      error-correction="medium"
      mask-pattern="-1">
    </qr-code-element>
  `
}
```

5. Set the url attribute with

```javascript
// plain html
document.querySelector('qr-code-element')
			.setAttribute('text','@NEW TEXT >TO ENCODE!')

// in lit element
this.renderRoot.querySelector('qr-code-element')
			.setAttribute('text','@HELLO >> New new World!')
```

## 🐝 API

### 📒 Properties/Attributes

| Name | Type | Default | Description
| ------------- | ------------- | ---------- | -------------------------------
| text          | String | `'@cicciosgamino'`| The Unicode Text string to Encode
| graphic-element | String | `'svg'`         | Render Qr Code in SVG or Canvas element [svg | canvas]
| scale         | Number | `10`              | Scale of Qr - Number greather than 1
| border        | Number | `1`               | Border of Qr - Number greather or equal to 0
| bk-color      | String | `#fff`            | Background Color
| tile-color    | String | `#000`            | Tile Color 
| error-correction | String | `'MEDIUM'`     | Error Correction level - LOW | MEDIUM | QARTILE | HIGH 

### Methods

| Name         | Description
| ------------ | -------------
| `connect(url) => {}`    | Connect to the VNC Client host

### Events

No Events

### 🧁 CSS Custom Properties

| Name | Default | Description
| --------------- | ------- | --------------------------------
| `--size`        | `11rem` | SIZExSIZE when graphic-element=svg
| `--icon-size`   | `15% of --size` | SIZExSIZE of centered icon | slotted svg icon

### 🤖 Write HTML and JavaScript
Import the component's JavaScript module, use the component in your HTML, and control it with JavaScript, just like you would with a built-in element such as `<button>`:

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>My Example App</title>

    <!-- Add support for Web Components to older browsers. -->
    <script src="./node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js"></script>

  </head>
  <body>
    <!-- Use Web Components in your HTML like regular built-in elements. -->
    <qr-code-element
      error-correction="medium"
      mask-pattern="-1">
    </qr-code-element>

    <!-- The Material Web Components use standard JavaScript modules. -->
    <script type="module">

      // Importing this module registers <progress-ring> as an element that you
      // can use in this page.
      //
      // Note this import is a bare module specifier, so it must be converted
      // to a path using a server such as @web/dev-server or vite.
      import '@cicciosgamino/qr-code-element'

      // Standard DOM APIs work with Web Components just like they do for
      // built-in elements.
      const qrCodeElement = document.querySelector('qr-code-element')
    </script>
  </body>
</html>
```

### 🚀 Serve
Serve your HTML with any server or build process that supports bare module specifier resolution (see next section):

```bash
# use globally instelled
npm install -g @web/dev-server

# install the project dev-dependencies and npm run
npm install
npm run dev
```

### Examples
In this example will use the component with an input field, so you can insert the text you want to transform into the Qr Code.

```html
<body>

    <div class="text">

      <input
        id="qrtext"
        type="text"
        name="qrtext"
        placeholder="text here ...">
      <label for="qrtext">QrText</label>

    </div>
    
    <qr-code-element
      error-correction="medium"
      mask-pattern="-1">
    </qr-code-element>

  <noscript>
    Please enable JavaScript to view this website.
  </noscript>

  <!-- Import Js Module from local file -->
  <script type="module" src="../qr-code-element.js"></script>

  <script>

    window.addEventListener('DOMContentLoaded', (e) => {

      const qrText = document.getElementById('qrtext')

      qrText.addEventListener('input', (e) => {
        
        const qrCodeElement = document.querySelector('qr-code-element')
        qrCodeElement.setAttribute('text', event.target.value)
      })

    })
  </script>

</body>
```

Check the examples folder if you need to copy some styles.


## Contributing

Got **something interesting** you'd like to **share**? Learn about [contributing](https://github.com/CICCIOSGAMINO/init/blob/master/CONTRIBUTING.md).

# Accessibility

# 🔧 TODO
- [ ] Slot the SVG image for center - Working on (1/2 functionality already in place)
- [ ] Basic Unit testing
- [ ] A11y compatible ?

# License
[GNU General Public License v3.0](https://github.com/CICCIOSGAMINO/init/blob/master/LICENSE)

Made 🧑‍💻 by [@cicciosgamino](https://cicciosgamino.web.app)



