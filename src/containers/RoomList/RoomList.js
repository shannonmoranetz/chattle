import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { updateCurrentRoom } from '../../actions';
import NewRoomForm from '../NewRoomForm/NewRoomForm';
import PropTypes from 'prop-types';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DraftsIcon from '@material-ui/icons/Drafts';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
  root: {
    textAlign: 'center',
  },

  menuItem: {
    padding: 6
  }
});

export class RoomList extends Component {
  constructor() {
    super();
    this.state = {
      showNewRoomForm: false
    }
  }

  handleClick = () => {
    this.setState({ showNewRoomForm: !this.state.showNewRoomForm });
  }

  render() {
    let { createRoom, rooms, subscribeToRoom, classes, currentRoomId } = this.props;
    return (
      <div className={classes.root}>
        <Typography variant="h5" align="center">Rooms</Typography>
        {this.state.showNewRoomForm ? (
          <NewRoomForm createRoom={createRoom} updateDisplay={this.handleClick} />
        ) : (
            <div>
              <MenuList>
                {rooms.map((room) => {
                  return (
                    <MenuItem href="#" key={room.id} className={classes.menuItem} onClick={() => subscribeToRoom(room.id)}>
                      <Icon color="action" >sms</Icon>
                  <ListItemText inset primary={room.name}/>
                    </MenuItem>
                  )
                })
                }
              </MenuList>
              <Button variant="contained" align="center" color="primary" onClick={this.handleClick}>
                create room <Icon className={classes.rightIcon}>group_add</Icon>
              </Button>
            </div>
          )}
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
  rooms: state.rooms,
  currentRoomId: state.currentRoomId
})

export const mapDispatchToProps = (dispatch) => ({
  updateCurrentRoom: (roomId) => dispatch(updateCurrentRoom(roomId))
})

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(RoomList);

RoomList.propTypes = {
  createRoom: PropTypes.func,
  currentRoomId: PropTypes.string,
  rooms: PropTypes.array,
  updateCurrentRoom: PropTypes.func,
  subscribeToRoom: PropTypes.func
}