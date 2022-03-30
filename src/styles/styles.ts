/**
 * Created by ASTAKHOV A.A. on 27.03.2022
 */

import {css} from '@emotion/react';

export const globalStyle = css`
    @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans&family=Inter:wght@400;500&display=swap');

    :root {
        --main-color: #fff;
        --error-color: #861e1e;
        --color-dark: #001529;
        --color-text-dark: #595b5d;

        --font-primary: 'Inter', sans-serif;
        --font-secondary: 'IBM Plex Sans', sans-serif;
    }

    #app {
        display: flex;
        flex-direction: column;
        height: 100vh;
    }

    .ant-page-header {
        padding-top: 0 !important;
        padding-left: 0 !important;
        padding-right: 0 !important;
    }

    .ant-descriptions-item-container {
        .ant-descriptions-item {
            &-label {
                color: rgba(0, 0, 0, 0.45);
            }

            &-content {
                color: rgba(0, 0, 0, 0.65);
            }
        }
    }

    /* Popover */

    .ant-popover.ant-popover-0 .ant-popover-inner-content {
        @apply p-0;
    }

    /* Switch */

    .ant-switch-handle {
        width: 16px !important;
        height: 16px !important;
    }

    .ant-switch-checked .ant-switch-handle {
        left: calc(100% - 16px - 4px) !important;
    }
`;
