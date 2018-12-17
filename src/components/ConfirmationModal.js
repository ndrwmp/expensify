import React from 'react';
import { connect } from 'react-redux';
import { hideModal } from '../actions/modals';
import Modal from 'react-modal';

Modal.setAppElement("#app");

const Confirmation = (props) => {
    return (
        <Modal
            isOpen={!!props.showModal}
            onRequestClose={props.onRequestClose}
            contentLabel="Confirm removal"
            closeTimeoutMS={200}
            className="modal"
        >
            <h3 className="modal__title">Are you sure?</h3>
            <button onClick={props.onSubmit}>
                Yes
            </button>
            <button onClick={props.onRequestClose}>
                No
            </button>
        </Modal>
    );
};

export default Confirmation;

// export default connect(null, { hideModal })(Confirmation);