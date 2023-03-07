import { html, css , LitElement } from 'lit'
import { sharedStyles } from './shared-styles.js'

import '../novnc-element.js'

export class XApp extends LitElement {

    static get styles () {
        return [
            sharedStyles,
            css`

            :host {
                --top-heigh: 3rem;

                inline-size: 100vw;
                block-size: 100vh;

                display: grid;
                grid-template-columns: 1fr 3fr;
                gap: 3rem;

                position: relative;
            }

            #top-bk {
                inline-size: 100vw;
                block-size: var(--top-heigh);

                position: absolute;
                top: 0;

                z-index: 1;
                background-color: purple;
            }

            button {
                display: block;
                z-index: 3;
            }

        `]
    }

    handleClick (e) {
        const vncClient = this.renderRoot.getElementById('novnc')
        vncClient.connect()
    }


    render () {
        return html`

            <!-- novnc dialog -->
            <dialog open>

                <!-- <novnc-element
                    id="novnc"
                    ip="127.0.0.1"
                    port="6080">
                </novnc-element> -->

                <novnc-element
                    id="novnc"
                    ip="192.168.1.11"
                    port="8888">
                </novnc-element>

            </dialog>

            <div id="top-bk">

            </div>

            <button
                @click=${this.handleClick}>
                CONNECT
            </button>
        `
    }
}

customElements.define('x-app', XApp)