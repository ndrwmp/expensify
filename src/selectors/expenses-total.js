// calculate total of given expenses
export default (expenses) => {
    // let total = 0;
    // expenses.map((expense) => {
    //     total += expense.amount;
    // });
    // return total;

    // or use reduce: 
    // first map the expenses array to their amounts,
    // then call that new array of the amounts using reduce
    // which will add up all of the values, starting with a sum of 0
    return expenses
        .map((expense) => expense.amount)
        .reduce((sum, value) => sum+value, 0);
};