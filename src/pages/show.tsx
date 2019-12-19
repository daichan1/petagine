import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import image from '../object.jpg'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paperBasicInfo: {
      display: 'flex',
      margin: theme.spacing(2),
      padding: theme.spacing(3, 2)
    },
    basicInfo: {
      margin: theme.spacing(2)
    },
    paperImpressions: {
      margin: theme.spacing(2),
      padding: theme.spacing(3, 2)
    }
  })
)

const info = {
  title: 'オブジェクト指向設計実践ガイド',
  author: '高山さん',
  publisher: '講談社',
  status: '読書中'
}

export default function Show() {
  const classes = useStyles({})
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">書籍個別</Typography>
        </Toolbar>
      </AppBar>
      <Paper className={classes.paperBasicInfo}>
        <img src={image} alt="書籍" />
        <div className={classes.basicInfo}>
          <Table aria-label="simple table">
            <TableRow>
              <TableCell>タイトル</TableCell>
              <TableCell>{info.title}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>著者</TableCell>
              <TableCell>{info.author}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>出版社</TableCell>
              <TableCell>{info.publisher}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>ステータス</TableCell>
              <TableCell>{info.status}</TableCell>
            </TableRow>
          </Table>
        </div>
      </Paper>
      <Paper className={classes.paperImpressions}>
        <Typography variant="h6" gutterBottom>
          要点
        </Typography>
        <Typography variant="body1">
          ここに要点が入るここに要点が入るここに要点が入るここに要点が入るここに要点が入るここに要点が入る
        </Typography>
      </Paper>
      <Paper className={classes.paperImpressions}>
        <Typography variant="h6" gutterBottom>
          感想
        </Typography>
        <Typography variant="body1">
          ここに感想が入るここに感想が入るここに感想が入るここに感想が入るここに感想が入るここに感想が入る
        </Typography>
      </Paper>
    </div>
  )
}
