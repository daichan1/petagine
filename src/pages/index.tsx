import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import image from '../object.jpg'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      textAlign: 'center',
      backgroundColor: '#C0C0C0'
    },
    grid: {
      marginTop: theme.spacing(3)
    },
    img: {
      width: '80%',
      height: 300
    }
  })
)

// テストデータ
const images: string[] = [
  image,
  image,
  image,
  image,
  image,
  image,
  image,
  image,
  image,
  image,
  image,
  image
]

export default function Index() {
  const classes = useStyles({})
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">書籍一覧</Typography>
        </Toolbar>
      </AppBar>
      <Grid container spacing={3}>
        {images.map(image => (
          <Grid key={image} item xs={6} sm={3} className={classes.grid}>
            <img src={image} alt="書籍" className={classes.img} />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}
