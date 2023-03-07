import { LitElement, css, html } from 'lit'
import { sharedStyles } from './examples/shared-styles'

// import the RFB (Remote FrameBuffer) Object
import RFB from '@novnc/novnc/core/rfb.js'

class NoVncElement extends LitElement {

	// RFB (Remote FrameBuffer) Object
	rfb

	static get styles () {
		return [
			sharedStyles,
			css`
			:host {
				display: block;
				position: relative;
			}

			#screen {
				inline-size: 100vw;
				block-size: 100vh;
			}
		`]
	}

	static get properties () {
		return {
			url: {
				type: String,
				state: true,
				attribute: false
			},
			ip: {
				type: String
			},
			port: {
				type: Number
			}
		}
	}

	constructor () {
		super()
	}

	willUpdate (changedProperties) {

		// build up the url from ip || port
		if ((changedProperties.has('ip') && this.ip) ||
			(changedProperties.has('port') && this.port)) {

				// this.url = new URL(`ws://${this.ip}:${this.port}/websockify`)
				// this.url = new URL(`ws://${this.ip}:${this.port}?host=${this.ip}&port=${this.port}`)
				this.url = new URL(`ws://${this.ip}:${this.port}`)

				// @DEBUG
				// console.log('@URL >> ', this.url)
		}

		// you can set directly url as property too, but not advised
		// <novnc-element .url="ws://127.0.0.1:6080/websockify"></novnc-element>

	}

	/**
	 * Connect to the VNC  client host
	 */
	async connect() {

		const screen =
			this.renderRoot.getElementById('screen')

		console.log('@HREF >> ', this.url.href)

		// this.rbf = new RFB(screen, this.url.href, {
		// 	credentials: { password: 'nusselt'}
		// })

		this.rbf = new RFB(screen, this.url.href, {
			shared: true,
			repeaterID: '',
			credentials: { password: 'nusselt'}
		})

		if (this.rbf) {
			// listen for events from RBF
			this.rbf.addEventListener(
				// 'connect',this.#connectedToServer.bind(this))
				'connect', (event) => {
					console.log('@CONNECTED >> OK')
				})

			// fired when the RFB object disconnects
			this.rbf.addEventListener(
				'disconnect',this.#disconnectedFromServer.bind(this))

			//  fired when the server identity must be confirmed by the user.
			this.rbf.addEventListener(
				'serververification', await this.serverVerify.bind(this))

			// fired when more credentials must be given to continue.
			this.rbf.addEventListener(
				'credentialsrequired', this.#credentialsRequired.bind(this))

			// fired when the security negotiation with the server fails.
			this.rbf.addEventListener(
				'securityfailure', (event) => {
					console.log('@SECURITY-FAILURE >> ', event)
				})

			// fired when the remote desktop name changes.
			this.rbf.addEventListener(
				'desktopname', this.#updateDesktopName.bind(this))
			
		}
	}

	#connectedToServer (event) {
		console.log('@CONNECTED-SERVER >> ', event)
	}

	#disconnectedFromServer (event) {
		console.log('@DISCONNECTED >> ', event)
	}

	#credentialsRequired (event) {
		console.log('@CREDENTIALS-REQUIRED >> ', event)
	}

	#updateDesktopName (event) {
		console.log('@UPDATED-DESKTOP >> ', event)
	}

	async serverVerify(e) {
		
        const type = e.detail.type
        if (type === 'RSA') {
            const publickey = e.detail.publickey
            let fingerprint = await window.crypto.subtle.digest("SHA-1", publickey)
            // The same fingerprint format as RealVNC
            fingerprint = Array.from(new Uint8Array(fingerprint).slice(0, 8)).map(
                x => x.toString(16).padStart(2, '0')).join('-')

			console.log('@noVNC FINGERPRINT >> ', fingerprint)

			this.rbf.approveServer()	
        }
    }

	render () {

		return html`
			<!-- Where the remote screen will appear -->
			<div id="screen"></div>
		`
	}
}

customElements.define('novnc-element', NoVncElement)
