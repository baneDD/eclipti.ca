import { configure } from '@storybook/react'
import { action } from '@storybook/addon-actions'

// Gatsby's Link overrides:
declare const global: NodeJS.Global & {
  ___loader: {
    enqueue: (rawPath: string) => any
    hovering: (rawPath: string) => any
  }
  __PATH_PREFIX__: string
  ___navigate: (to: string, options: any) => void
}
// Gatsby defines a global called ___loader to prevent its method calls from creating console errors you override it here
global.___loader = {
  enqueue: () => {
    return
  },
  hovering: () => {
    return
  },
}
// Gatsby internal mocking to prevent unnecessary errors in storybook testing environment
global.__PATH_PREFIX__ = ''
// This is to utilized to override the window.___navigate method Gatsby defines and uses to report what path a Link would be taking us to if it wasn't inside a storybook
global.___navigate = (pathname, options) => {
  action('NavigateTo:')(pathname, options)
}

// automatically import all files ending in *stories.js
const req = require.context('../src', true, /stories\.tsx$/)

function loadStories() {
  req.keys().forEach(req)
}

configure(loadStories, module)
