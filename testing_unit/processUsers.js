export function processUsers(users) {
    if (!Array.isArray(users)) {
        throw new Error("Input must be an array of user objects.");
    }

    return users
        .filter((user) => user.age >= 18 && user.status === "active")
        .sort((a, b) => {
            const nameA = a.firstName + " " + a.lastName;
            const nameB = b.firstName + " " + b.lastName;
            if (nameA && nameB) {
                return nameA.localeCompare(nameB);
            } else if (nameA) {
                return -1;
            } else if (nameB) {
                return 1;
            } else {
                return 0;
            }
        })
        .map((user) => ({
            fullName: `${user.firstName} ${user.lastName}`,
            contact: {
                email: user.email,
                phone: user.phone || "N/A",
            },
            isAdult: user.age >= 18,
        }));
}
