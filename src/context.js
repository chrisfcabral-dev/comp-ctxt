import React from 'react';

const createContext = () => {

  var combinedActions = null
  var combinedStates = null
  var memoizedReducers = null

  var Context = React.createContext()

  const Provider = (props) => {
    combinedActions = combineActions(props.actions)
    combinedStates = combineStates(props.reducers)
    memoizedReducers = React.useCallback(combineReducers(props.reducers), [])

    return (
      <Context.Provider value={React.useReducer(memoizedReducers, combinedStates)}>
        {props.children}
      </Context.Provider>
    )
  }

  const combineReducers = (reducers) => {
    return (state, action) => {
      return Object.keys(reducers).map(key => {
          return { [key]: reducers[key].reducer(state[key], action) }
        }).reduce((a, b) => {
          return a && b ? {...a, ...b} : a ? { ...a } : b ? { ...b } : {}
        })
    }
  }

  const combineStates = (reducers) => {
    return Object.keys(reducers).map(key => {
      return { [key]: reducers[key].state }
    }).reduce((a, b) => {
      return a && b ? {...a, ...b} : a ? { ...a } : b ? { ...b } : {}
    })
  }

  const combineActions = (actions) => {
    return actions
  }

  const useActions = (dispatch, state) => {
    return (action) => {
      return combinedActions[action](dispatch, state[action])
    }
  }

  const useState = () => { 
    const [state, dispatch] = React.useContext(Context)
    return { state, dispatch, action: useActions(dispatch, state) }
  }

  return {
    Context,
    Provider,
    Consumer: Context.Consumer,
    useState
  }
}

export default createContext