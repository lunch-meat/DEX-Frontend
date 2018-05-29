import React, { Component } from 'react';
import { connect } from 'react-redux';

// Import Material-UI Components
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

// Import Order Actions

// Declare Styles
const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
  },
});

class Buy extends Component {
  componentDidMount() {
    //this.props.fetchData('http://localhost:8000/orders/1');
  }

  render() {
    return <div />;
  }
}

Buy.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: url => dispatch(),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(Buy),
);
