# About

A simple react context using hooks

## Role Type

- Context

# Install

## Requirements

- Yarn Package Manager (yarn)

# Using

#### Common example


```javascript

// reducers/foo.reducer.js

const state = {
  id: ''
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_ID':
      return {
        ...state,
        id: action.data
      };
      
    default:
      return state;
  }
};

export default { state, reducer }

// actions/foo.action.js

export default (dispatch, state) => {

  const bar = (id) => {
    dispatch({
      type: "CHANGE_ID",
      data: id
    })
  }
  
  return { 
    bar 
  }

}

// app.js

import Context from '@cthulhi/comp-ctxt'
import reducers from './reducers'
import actions from './actions'

const App = () => (
  <Context.Provider reducers={reducers} actions={actions}>
    ...
  </Context.Provider>
)

// component.js

import Context from '@cthulhi/comp-ctxt'

const Footer = () => {

  const { state, dispatch, action } = Context.useState(actions);

  // action
  action('foo').bar("123")

  // dispatch
  dispatch({
    type: "CHANGE_ID",
    data: "456"
  })

  return (
    <div>A footer id {state.foo.id}</div>
  )

}

// render => <div>A footer id 456</div>

```

#### More

More configurations and types to come as the time permits