import React from 'react'
import PropTypes from 'prop-types'
import { Mutation, withApollo } from 'react-apollo'
import withStyles from '@material-ui/core/styles/withStyles'
import Loader from 'react-loader-advanced'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Grid from '@material-ui/core/Grid'
import Checkbox from '@material-ui/core/Checkbox'
import Paper from '@material-ui/core/Paper'
import { ADD_UPDATE_RESPONSE } from '../store/mutations'
import { optionStyles } from '../data/styles'

class Options extends React.Component {
  state = { checked: { title: null, active: false } }

  static propTypes = {
    classes: PropTypes.object.isRequired,
    questionId: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    creatorId: PropTypes.string.isRequired,
    currentAnswer: PropTypes.string,
    subQuestionField: PropTypes.bool,
    updateSubQuestion: PropTypes.func
  }

  static defaultProps = {
    subQuestionField: false
  }

  setChecked = (answer, updateAnswer) => {
    const {
      question,
      questionId,
      creatorId,
      currentAnswer,
      subQuestionField,
      updateSubQuestion
    } = this.props
    const record = { questionId, answer, creatorId }
    const isNew = answer !== currentAnswer

    if (isNew && !subQuestionField) {
      updateAnswer({ variables: { record } })
    } else if (isNew && subQuestionField) {
      updateSubQuestion({ ...record, question })
    }
  }

  render () {
    const { classes, options, currentAnswer } = this.props

    return (
      <Grid item xs={12}>
        <List>
          {options.map((option, index) => {
            const { title: answer } = option

            return (
              <Mutation
                mutation={ADD_UPDATE_RESPONSE}
                key={index}
                children={(updateAnswer, { data, loading, error }) => {
                  return (<Loader show={loading} message={'please wait'}>
                    <Paper className={classes.paper} square elevation={2}>
                      <ListItem
                        disabled={loading}
                        role={undefined}
                        dense
                        button
                        onClick={this.setChecked
                          .bind(null, answer, updateAnswer)}
                        className={classes.listItem}
                      >
                        <ListItemText primary={answer} />
                        <ListItemSecondaryAction>
                          <Checkbox
                            disabled={loading}
                            checked={answer === currentAnswer}
                            onClick={this
                              .setChecked.bind(null, answer, updateAnswer)}
                            tabIndex={-1}
                            disableRipple
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                    </Paper>
                  </Loader>)
                }}
              />
            )
          })}
        </List>
      </Grid>
    )
  }
}

export default withApollo(withStyles(optionStyles)(Options))
