import React from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Index from './pages/index'

const useStyles = makeStyles(
  createStyles({
    root: {
      backgroundColor: '#C0C0C0'
    },
    container: {
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  })
)

export default function App() {
  const classes = useStyles({})
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Index />
      </div>
    </div>
  )
}
