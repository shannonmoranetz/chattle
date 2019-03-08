import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { setError } from '../../actions';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { compose } from 'redux';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  userForm: {
    width: '100%',
    textAlign: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column'
  },
  rightIcon: {
    marginLeft: 10
  },
  login: {
    width: '100%',
    marginTop: 20
  },
};

export class NewRoomForm extends Component {
  constructor() {
    super();
    this.state = {
      roomName: '',
      duplicateSubmitted: false
    }
  }

  handleChange = (event) => {
    this.setState({ roomName: event.target.value })
  }

  handleSubmit = (event) => {
    let { roomName } = this.state;
    let { rooms, createRoom, setError } = this.props;
    event.preventDefault();
    const name = roomName.toLowerCase();
    if (name.length > 12) {
      alert('Room length may not exceed 12 characters. Please try again with a shorter name!')
      return;
    }
    try {
      this.setState({ duplicateSubmitted: false })
      rooms.forEach((room) => {
        if (room.name.includes(name)) {
          throw new Error('room already exists');
        }
      })
      createRoom(roomName.toLowerCase())
      this.setState({ roomName: '' })
      this.moveBack();
    } catch (error) {
      this.setState({ duplicateSubmitted: true })
      setError(`${error}`)
    }
  }

  moveBack = () => {
    this.props.updateDisplay();
  }

  render() {
    const { duplicateSubmitted, roomName } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        {duplicateSubmitted && <Typography variant="body1" gutterBottom align="center" className={classes.instruction}>
          Good news! That room already exists.</Typography>}
        <form onSubmit={this.handleSubmit}>
          <FormControl error={roomName.length > 12 ? (true) : (false)} className={classes.userForm}>
            <Grid container direction="column">
              <Grid item>
                <InputLabel htmlFor="newroom-input">{roomName.length > 12 ? ('Name too long!') : ('Room Name')}</InputLabel>
                <Input
                  id="newroom-input"
                  type="text"
                  onChange={this.handleChange}
                  autoFocus={true}
                  value={roomName}
                />
              </Grid>
              <Grid item>
                <Button variant="contained" color="secondary" type="submit" onClick={this.onSubmit} className={classes.login}>
                  Create <Icon className={classes.rightIcon}>library_add</Icon>
                </Button>
                <Button variant="contained" color="secondary" onClick={this.moveBack} className={classes.login}>
                  Back <Icon className={classes.rightIcon}>chevron_left</Icon>
                </Button>
              </Grid>
            </Grid>
          </FormControl>
        </form>
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
  rooms: state.rooms
})

export const mapDispatchToProps = (dispatch) => ({
  setError: (error) => dispatch(setError(error))
})

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(NewRoomForm);

NewRoomForm.propTypes = {
  createRoom: PropTypes.func,
  setError: PropTypes.func,
  updateDisplay: PropTypes.func,
  rooms: PropTypes.array
}