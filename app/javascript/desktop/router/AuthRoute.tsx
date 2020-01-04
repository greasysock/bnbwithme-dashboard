import * as React from 'react';
import { Route, RouteComponentProps, Redirect } from 'react-router-dom'
import { NonAuthRoutes } from './routes';
import Wrapper from '../components/layout/Wrapper'

export interface IAuthRouteProps {
  Component: React.FC<RouteComponentProps>
  path: string
  exact?: boolean
  requiredRoles: string[]
}

export function AuthRoute ({Component, path, exact, requiredRoles}: IAuthRouteProps) {
  const isAuthed = true
  const userHasRequiredRole = true
  return (
    <Route
      exact={exact}
      path={path}
      render={(props: RouteComponentProps) => {
        if(isAuthed && userHasRequiredRole){
          return (
          <Wrapper>
            <Component {...props} />
          </Wrapper>
          )
        } else {
          return (
            <Redirect
              to={{ pathname: isAuthed ? NonAuthRoutes.unauthorized : NonAuthRoutes.login}}  
            />
          )
        }
      }}
    />
  )
}
