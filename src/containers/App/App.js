import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {IndexLink} from 'react-router';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Helmet from 'react-helmet';
import {isLoaded as isInfoLoaded, load as loadInfo} from 'redux/reducers/infoReducer';
import {logout} from 'redux/reducers/authReducer';
import {isLoaded as isCityLoaded, load as loadCity} from 'redux/actions/cityActionCreators';
import {push} from 'react-router-redux';
import config from '../../../config';
import {asyncConnect} from 'redux-async-connect';
// import util from 'util';

@asyncConnect( [{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];

    if (!isInfoLoaded( getState() )) {
      promises.push( dispatch( loadInfo() ) );
    }
    if (!isCityLoaded( getState() )) {
      promises.push( dispatch( loadCity() ) );
    }
    return Promise.all( promises );
  }
}] )
@connect(
  state => ({
    user: state.auth.user,
    city: state.city.data
  }),
  {
    logout,
    pushState: push
  } )

export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    city: PropTypes.object,
    logout: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      // login
      this.props.pushState( '/' );
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.props.pushState( '/' );
    }
  }

  handleLogout = (event) => {
    event.preventDefault();
    this.props.logout();
  };

  render() {
    const {user, city} = this.props;
    const styles = require( './App.scss' );
    return (
      <div className={styles.app}>
        <Helmet {...config.app.head}/>
        <Navbar className={styles.headerBar}>
          <Navbar.Header>
            <Navbar.Brand>
              <IndexLink to="/" activeStyle={{color: '#33e0ff'}}>
                <div className={styles.brand}/>
                <span>{config.app.title}</span>
              </IndexLink>
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>
          <Navbar.Collapse>
            {user && user !== null && <Nav navbar pullRight>
              <Navbar.Text>{user.name}</Navbar.Text>
                <NavItem className="logout-link" onClick={this.handleLogout}>
                  Logout
                </NavItem>
            </Nav>}
            {(!user || user === null) && <Nav navbar pullRight>
                <NavItem className="login-link">
                  <Navbar.Link href="/login">
                    Login
                  </Navbar.Link>
                </NavItem>
            </Nav>}
          </Navbar.Collapse>
          {city && <div className={styles.cityHeader + ' row'}>
            <div className="col-md-offset-3 col-lg-offset-3 col-lg-6 col-md-6" style={{ marginTop: '-40px' }}>
              <h1>{city.name}, {city.state}</h1>
              <div>
                <a className="change" href="#">change city ...</a>
              </div>
            </div>
          </div>}
        </Navbar>

        <div className={styles.appContent}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
