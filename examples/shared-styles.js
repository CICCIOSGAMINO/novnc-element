import { css } from 'lit'

export const sharedStyles = css`

    * {
      /* reset browser defaults */
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    [hidden] {
        display: none !important;
    }
`