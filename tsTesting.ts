main();

interface Transaction {
    id: string;
    type: string;
    method: string;
    amount: string;
    status: string;
}

interface Method {
    payment: null | ((transaction: Transaction) => void);
    refund: null | ((transaction: Transaction) => void);
}

class TransactionError extends Error {
    item: Transaction | object;
    constructor(message: string, transaction: Transaction | object = {}) {
        super(message);
        this.name = 'TransactionError';
        this.message = message;
        this.item = transaction;
    }
}

const PayPal_METHOD = 'PAYPAL';
const CreditCard_METHOD = 'CREDIT_CARD';
const Plan_METHOD = 'PLAN';
const Open_STATUS = 'OPEN';
const Closed_STATUS = 'CLOSED';

function main() {
    const transactions: Transaction[] = [
        {
            id: 't1',
            type: 'PAYMENT',
            status: 'OPEN',
            method: 'CREDIT_CARD',
            amount: '23.99',
        },
        {
            id: 't2',
            type: 'PAYMENT',
            status: 'OPEN',
            method: 'PAYPAL',
            amount: '100.43',
        },
        {
            id: 't3',
            type: 'REFUND',
            status: 'OPEN',
            method: 'CREDIT_CARD',
            amount: '10.99',
        },
        {
            id: 't4',
            type: 'PAYMENT',
            status: 'CLOSED',
            method: 'PLAN',
            amount: '15.99',
        },
    ];
    try {
        processTransactions(transactions);
    } catch (error) {
        showErrorMessage(error);
    }
}

export function processTransactions(transactions: Transaction[]) {
    if (isEmpty(transactions)) {
        const error = new TransactionError('No transactions to process!');
        throw error;
    }

    for (const transaction of transactions) {
        try {
            let method = getTransactionMethod(transaction);
            if (method.payment === null || method.refund === null) {
                continue;
            }
            if (isTransactionType(transaction, 'PAYMENT')) {
                method.payment(transaction);
            } else if (isTransactionType(transaction, 'REFUND')) {
                method.refund(transaction);
            }
        } catch (error) {
            showErrorMessage(error.message, error.item);
        }
    }
}

function getTransactionMethod(transaction: Transaction): Method {
    let method: Method = {
        payment: null,
        refund: null,
    };
    if (isMethod(transaction, CreditCard_METHOD)) {
        method.payment = processCreditCardPayment;
        method.refund = processCreditCardRefund;
    } else if (isMethod(transaction, PayPal_METHOD)) {
        method.payment = processPayPalPayment;
        method.refund = processPayPalRefund;
    } else if (isMethod(transaction, Plan_METHOD)) {
        method.payment = processPlanPayment;
        method.refund = processPlanRefund;
    } else {
        const error = new TransactionError('Invalid transaction method!', transaction);
        throw error;
    }
    return method;
}

function isMethod(transaction: Transaction, method: string) {
    return transaction.method === method;
}

function isTransactionType(transaction: Transaction, type: string) {
    return transaction.type === type;
}

function showErrorMessage(message: string, transaction: Transaction | object = {}) {
    console.log('Error: ' + message);
    console.log('Transaction: ' + JSON.stringify(transaction));
}

function isEmpty(transaction: Transaction[]) {
    return !transaction || transaction.length === 0;
}

function processCreditCardPayment(transaction: Transaction) {
    console.log('Processing credit card payment for amount: ' + transaction.amount);
}

function processCreditCardRefund(transaction: Transaction) {
    console.log('Processing credit card refund for amount: ' + transaction.amount);
}

function processPayPalPayment(transaction: Transaction) {
    console.log('Processing PayPal payment for amount: ' + transaction.amount);
}

function processPayPalRefund(transaction: Transaction) {
    console.log('Processing PayPal refund for amount: ' + transaction.amount);
}

function processPlanPayment(transaction: Transaction) {
    console.log('Processing plan payment for amount: ' + transaction.amount);
}

function processPlanRefund(transaction: Transaction) {
    console.log('Processing plan refund for amount: ' + transaction.amount);
}
