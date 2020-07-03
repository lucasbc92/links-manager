import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../../actions/AccountActions';

const Layout = ({children, signOut, account}) => {
    const signOutHandler = (e) => {
        e.preventDefault();

        signOut();
    }

    if(!account) {
       return <Redirect to='/sign-in' />
    }

    return (
        <div className="layout">
            <nav className="navbar navbar-expand-lg bg-primary text-light">
                <div className="container d-flex w-100 justify-content-between">
                    <div>
                        <span>BACK</span>
                    </div>
                    <div className="text-center">
                        <strong>Links</strong>
                    </div>
                    <div>
                        <button className="btn btn-clear" onClick={signOutHandler}>Exit</button>
                    </div>
                </div>
            </nav>
            <div className="container">{children}</div>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        account: state.account.account,
    }
}

export default connect(mapStateToProps, {signOut})(Layout);