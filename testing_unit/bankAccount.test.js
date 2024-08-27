import { Bank } from "./bankAccount.js";

describe("Bank", () => {
    let bank;

    beforeEach(() => {
        bank = new Bank();
    });

    test("should create a new account with an initial balance", () => {
        bank.createAccount("123", 100);
        const account = bank.getAccount("123");
        expect(account.balance).toBe(100);
        expect(account.transactions.length).toBe(1);
    });

    test("should throw an error when creating an account that already exists", () => {
        bank.createAccount("123", 100);
        expect(() => bank.createAccount("123", 200)).toThrow(
            "Account already exists."
        );
    });

    test("should deposit money into an account", () => {
        bank.createAccount("123", 100);
        bank.deposit("123", 50);
        const account = bank.getAccount("123");
        expect(account.balance).toBe(150);
        expect(account.transactions.length).toBe(2);
    });

    test("should throw an error when depositing a non-positive amount", () => {
        bank.createAccount("123", 100);
        expect(() => bank.deposit("123", -50)).toThrow(
            "Deposit amount must be positive."
        );
    });

    test("should withdraw money from an account", () => {
        bank.createAccount("123", 100);
        bank.withdraw("123", 50);
        const account = bank.getAccount("123");
        expect(account.balance).toBe(50);
        expect(account.transactions.length).toBe(2);
    });

    test("should throw an error when withdrawing more than the balance", () => {
        bank.createAccount("123", 100);
        expect(() => bank.withdraw("123", 150)).toThrow("Insufficient funds.");
    });

    test("should throw an error when withdrawing a non-positive amount", () => {
        bank.createAccount("123", 100);
        expect(() => bank.withdraw("123", -50)).toThrow(
            "Withdrawal amount must be positive."
        );
    });

    test("should transfer money between accounts", () => {
        bank.createAccount("123", 100);
        bank.createAccount("456", 200);
        bank.transfer("123", "456", 50);
        const fromAccount = bank.getAccount("123");
        const toAccount = bank.getAccount("456");
        expect(fromAccount.balance).toBe(50);
        expect(toAccount.balance).toBe(250);
        expect(fromAccount.transactions.length).toBe(3);
        expect(toAccount.transactions.length).toBe(3);
    });

    test("should throw an error when transferring to the same account", () => {
        bank.createAccount("123", 100);
        expect(() => bank.transfer("123", "123", 50)).toThrow(
            "Cannot transfer to the same account."
        );
    });

    test("should generate the correct account statement", () => {
        bank.createAccount("123", 100);
        bank.deposit("123", 50);
        bank.withdraw("123", 30);
        const statement = bank.getAccountStatement("123");
        expect(statement.length).toBe(3);
        expect(statement[0].type).toBe("Initial Deposit");
        expect(statement[1].type).toBe("Deposit");
        expect(statement[2].type).toBe("Withdrawal");
    });

    test("should throw an error when accessing a non-existent account", () => {
        expect(() => bank.getAccount("999")).toThrow("Account not found.");
    });
});
