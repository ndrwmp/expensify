import React from 'react';
// import { connect } from 'react-redux';
// import { hideModal } from '../actions/modals';
import Modal from 'react-modal';

Modal.setAppElement("#app");

const LoginError = (props) => {
    return (
        <Modal
            isOpen={!!props.showModal}
            onRequestClose={props.onRequestClose}
            contentLabel="Login error"
            closeTimeoutMS={200}
            className="modal"
        >
            <h3 className="modal__title">Error code {}</h3>
        </Modal>
    );
};

export default LoginError;

// export default connect(null, { hideModal })(Confirmation);