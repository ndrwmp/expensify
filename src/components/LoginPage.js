import React from 'react';
import { connect } from 'react-redux';
import { startLoginWithGoogle, startLoginWithTwitter, startLoginWithGithub } from '../actions/auth';
import LoginErrorModal from './LoginErrorModal';

export const LoginPage = ({ startLoginWithGoogle, startLoginWithTwitter, startLoginWithGithub }) => (
    <div className="box-layout">
        <div className="box-layout__box">
            <h1 className="box-layout__title">Expens1fy</h1>
            <p>It's time to get your expenses under control.</p>
            <button className="button button--login" onClick={startLoginWithGoogle}>Log in with Google</button>
            <button style={{background: "#464b5e"}} className="button button--login" onClick={startLoginWithTwitter}>Log in with Twitter</button>
            <button style={{background: "#364051"}} className="button button--login" onClick={startLoginWithGithub}>Log in with GitHub</button>
        </div>
        {/* <LoginErrorModal 
            showModal={}
            onRequestClose={this.toggleModal}
        /> */}
    </div>
);

const mapDispatchToProps = (dispatch) => ({
    startLoginWithGoogle: () => dispatch(startLoginWithGoogle()),
    startLoginWithTwitter: () => dispatch(startLoginWithTwitter()),
    startLoginWithGithub: () => dispatch(startLoginWithGithub())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);