export class Bank {
    constructor() {
        this.accounts = {};
    }

    createAccount(accountNumber, initialBalance = 0) {
        if (this.accounts[accountNumber]) {
            throw new Error("Account already exists.");
        }
        if (initialBalance < 0) {
            throw new Error("Initial balance cannot be negative.");
        }
        this.accounts[accountNumber] = {
            balance: initialBalance,
            transactions: [
                {
                    type: "Initial Deposit",
                    amount: initialBalance,
                    balance: initialBalance,
                },
            ],
        };
    }

    deposit(accountNumber, amount) {
        const account = this.getAccount(accountNumber);
        if (amount <= 0) {
            throw new Error("Deposit amount must be positive.");
        }
        account.balance += amount;
        account.transactions.push({
            type: "Deposit",
            amount,
            balance: account.balance,
        });
    }

    withdraw(accountNumber, amount) {
        const account = this.getAccount(accountNumber);
        if (amount <= 0) {
            throw new Error("Withdrawal amount must be positive.");
        }
        if (amount > account.balance) {
            throw new Error("Insufficient funds.");
        }
        account.balance -= amount;
        account.transactions.push({
            type: "Withdrawal",
            amount,
            balance: account.balance,
        });
    }

    transfer(fromAccount, toAccount, amount) {
        if (fromAccount === toAccount) {
            throw new Error("Cannot transfer to the same account.");
        }
        this.withdraw(fromAccount, amount);
        this.deposit(toAccount, amount);
        const fromAcc = this.getAccount(fromAccount);
        const toAcc = this.getAccount(toAccount);
        fromAcc.transactions.push({
            type: "Transfer Out",
            to: toAccount,
            amount,
            balance: fromAcc.balance,
        });
        toAcc.transactions.push({
            type: "Transfer In",
            from: fromAccount,
            amount,
            balance: toAcc.balance,
        });
    }

    getAccountStatement(accountNumber) {
        const account = this.getAccount(accountNumber);
        return account.transactions;
    }

    getAccount(accountNumber) {
        const account = this.accounts[accountNumber];
        if (!account) {
            throw new Error("Account not found.");
        }
        return account;
    }
}
