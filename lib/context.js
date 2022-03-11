"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

const createContext = () => {
  var combinedActions = null;
  var combinedStates = null;
  var memoizedReducers = null;

  var Context = _react.default.createContext();

  const Provider = props => {
    combinedActions = combineActions(props.actions);
    combinedStates = combineStates(props.reducers);
    memoizedReducers = _react.default.useCallback(combineReducers(props.reducers), []);
    return _react.default.createElement(Context.Provider, {
      value: _react.default.useReducer(memoizedReducers, combinedStates)
    }, props.children);
  };

  const combineReducers = reducers => {
    return (state, action) => {
      return Object.keys(reducers).map(key => {
        return {
          [key]: reducers[key].reducer(state[key], action)
        };
      }).reduce((a, b) => {
        return a && b ? { ...a,
          ...b
        } : a ? { ...a
        } : b ? { ...b
        } : {};
      });
    };
  };

  const combineStates = reducers => {
    return Object.keys(reducers).map(key => {
      return {
        [key]: reducers[key].state
      };
    }).reduce((a, b) => {
      return a && b ? { ...a,
        ...b
      } : a ? { ...a
      } : b ? { ...b
      } : {};
    });
  };

  const combineActions = actions => {
    return actions;
  };

  const useActions = (dispatch, state) => {
    return action => {
      return combinedActions[action](dispatch, state[action]);
    };
  };

  const useState = () => {
    const [state, dispatch] = _react.default.useContext(Context);

    return {
      state,
      dispatch,
      action: useActions(dispatch, state)
    };
  };

  return {
    Context,
    Provider,
    Consumer: Context.Consumer,
    useState
  };
};

var _default = createContext;
exports.default = _default;