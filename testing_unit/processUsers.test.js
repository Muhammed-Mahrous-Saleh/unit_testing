import { processUsers } from "./processUsers";

describe("processUsers", () => {
    test("should process and return filtered, sorted, and mapped user objects correctly", () => {
        const users = [
            {
                firstName: "John",
                lastName: "Doe",
                age: 25,
                status: "active",
                email: "john@example.com",
                phone: "123-456-7890",
            },
            {
                firstName: "Jane",
                lastName: "Smith",
                age: 17,
                status: "active",
                email: "jane@example.com",
            },
            {
                firstName: "Alice",
                lastName: "Johnson",
                age: 30,
                status: "inactive",
                email: "alice@example.com",
                phone: "234-567-8901",
            },
            {
                firstName: "Bob",
                lastName: "Brown",
                age: 22,
                status: "active",
                email: "bob@example.com",
            },
        ];

        const result = processUsers(users);
        expect(result).toEqual([
            {
                fullName: "Bob Brown",
                contact: {
                    email: "bob@example.com",
                    phone: "N/A",
                },
                isAdult: true,
            },
            {
                fullName: "John Doe",
                contact: {
                    email: "john@example.com",
                    phone: "123-456-7890",
                },
                isAdult: true,
            },
        ]);
    });

    test("should return an empty array if no users match the criteria", () => {
        const users = [
            {
                firstName: "Jane",
                lastName: "Smith",
                age: 17,
                status: "active",
                email: "jane@example.com",
            },
            {
                firstName: "Alice",
                lastName: "Johnson",
                age: 30,
                status: "inactive",
                email: "alice@example.com",
                phone: "234-567-8901",
            },
        ];

        const result = processUsers(users);
        expect(result).toEqual([]);
    });

    test("should throw an error if input is not an array", () => {
        expect(() => processUsers(null)).toThrow(
            "Input must be an array of user objects."
        );
        expect(() => processUsers({})).toThrow(
            "Input must be an array of user objects."
        );
    });
});
