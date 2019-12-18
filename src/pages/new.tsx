import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import InputLabel from '@material-ui/core/InputLabel'
import NativeSelect from '@material-ui/core/NativeSelect'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tableContainer: {
      margin: theme.spacing(2),
      padding: theme.spacing(2)
    },
    table: {
      margin: 'auto',
      width: 960,
      minWidth: 650
    },
    tableRow: {
      marign: theme.spacing(2)
    },
    tableCell: {
      width: '30%'
    },
    inputForm: {
      margin: theme.spacing(2),
      width: '70%'
    },
    submit: {
      margin: theme.spacing(2),
      width: 150
    }
  })
)

function InputBookForm() {
  const classes = useStyles({})
  return (
    <form autoComplete="off">
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table aria-label="simple table" className={classes.table}>
          <TableRow className={classes.tableRow}>
            <TableCell className={classes.tableCell}>タイトル</TableCell>
            <TextField
              label="タイトル"
              variant="outlined"
              className={classes.inputForm}
            />
          </TableRow>
          <TableRow className={classes.tableRow}>
            <TableCell className={classes.tableCell}>著者</TableCell>
            <TextField
              label="著者"
              variant="outlined"
              className={classes.inputForm}
            />
          </TableRow>
          <TableRow className={classes.tableRow}>
            <TableCell className={classes.tableCell}>出版社</TableCell>
            <TextField
              label="出版社"
              variant="outlined"
              className={classes.inputForm}
            />
          </TableRow>
          <TableRow className={classes.tableRow}>
            <TableCell className={classes.tableCell}>ステータス</TableCell>
            <InputLabel htmlFor="demo-customized-select-native"></InputLabel>
            <NativeSelect
              id="demo-customized-select-native"
              value="0"
              className={classes.inputForm}
            >
              <option value={0}>読んでない</option>
              <option value={1}>読んだ</option>
              <option value={2}>読書中</option>
            </NativeSelect>
          </TableRow>
          <TableRow className={classes.tableRow}>
            <TableCell className={classes.tableCell}>要点</TableCell>
            <TextField
              id="filled-multiline-static"
              label="要点"
              multiline
              rows="4"
              variant="filled"
              className={classes.inputForm}
            />
          </TableRow>
          <TableRow className={classes.tableRow}>
            <TableCell className={classes.tableCell}>感想</TableCell>
            <TextField
              id="filled-multiline-static"
              label="感想"
              multiline
              rows="4"
              variant="filled"
              className={classes.inputForm}
            />
          </TableRow>
          <TableRow className={classes.tableRow}>
            <TableCell className={classes.tableCell}>
              画像アップロード
            </TableCell>
            <input type="file" className={classes.inputForm} />
          </TableRow>
          <TableRow className={classes.tableRow}>
            <TableCell className={classes.tableCell}>送信</TableCell>
            <input type="submit" value="保存" className={classes.submit} />
          </TableRow>
        </Table>
      </TableContainer>
    </form>
  )
}

export default function New() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">書籍新規追加</Typography>
        </Toolbar>
      </AppBar>
      <InputBookForm />
    </div>
  )
}
