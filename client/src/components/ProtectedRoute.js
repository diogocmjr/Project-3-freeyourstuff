import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// here we destructure the props - we rename the component prop by using the colon
const ProtectedRoute = ({
  component: Component,
  user,
  path,
  redirectPath,
  updateMessage,
  message,
  removeMessage,
  getUser,
  items,
  ...rest
}) => {
  return (
    <Route
      exact path={path}
      render={props => {
        return user ? (
          <Component {...props} {...rest} user={user} removeMessage={removeMessage} message={message} updateMessage={updateMessage} getUser={getUser} items={items}/>
        ) : (
          <Redirect to={redirectPath} />
        );
      }}
    />
  );
};

export default ProtectedRoute;