import * as React from 'react'
import {useContext} from 'react'
import Drawer from '@material-ui/core/Drawer'
import {DrawerContext} from '../../contexts/DrawerContext'

export function Navigation ():JSX.Element {
  const {opened, close} = useContext(DrawerContext)

  return (
    <Drawer onClose={close} open={opened}>
      Hello World
    </Drawer>
  );
}
