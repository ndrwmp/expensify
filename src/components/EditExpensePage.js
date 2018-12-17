import React from 'react';
import { connect } from 'react-redux';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';
import ExpenseForm from './ExpenseForm';
import ConfirmationModal from './ConfirmationModal';

export class EditExpensePage extends React.Component {

    constructor(props) {
        super(props);
      
        this.state = {
          showModal: false
        };
    }

    toggleModal = () => {
        this.setState({
            showModal: !this.state.showModal
        });
    }
    
    onEditSubmit = (expense) => {
        this.props.startEditExpense(this.props.expense.id, expense);
        this.props.history.push('/');
    }

    onRemoveSubmit = () => {
        this.props.startRemoveExpense({ id: this.props.expense.id });
        this.toggleModal();
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Edit Expense</h1>
                    </div>
                </div>
                <div className="content-container">
                    <ExpenseForm
                        onSubmit={this.onEditSubmit}
                        expense={this.props.expense}
                    />
                    <button
                        className="button button--secondary"
                        onClick={this.toggleModal}
                    >Remove expense</button>
                    <ConfirmationModal 
                        showModal={this.state.showModal}
                        onRequestClose={this.toggleModal}
                        onSubmit={this.onRemoveSubmit}
                        // ariaHideApp={false}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        expense: state.expenses.find((expense) => expense.id === props.match.params.id)
    };
};

const mapDispatchToProps = (dispatch, props) => ({
    startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
    startRemoveExpense: (id) => dispatch(startRemoveExpense(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);