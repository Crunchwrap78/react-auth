import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
  class Authentication extends Component {
    static contextTypes = {
      router: PropTypes.object
    };
    
    //Blocks access to this component if you're not logged in
    componentWillMount() {
      if(!this.props.authenticated) {
        this.context.router.push('/')
      }
    }

    //If you log out
    componentWillUpdate(nextProps) {
      if(!nextProps.authenticated) {
        this.context.router.push('/')
      }
    }

    render(){
      console.log(this.props.authenticated);
      return <ComposedComponent {...this.props}/>
    }
  }

  function mapStateToProps(state){
    return {authenticated: state.auth.authenticated}
  }

  return connect(mapStateToProps)(Authentication);
}
