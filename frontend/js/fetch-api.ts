window.addEventListener("DOMContentLoaded", () => {
    const API_URL = "http://localhost:3000/expenses";

    // DOM Elements
    const loginForm = document.getElementById("login-form") as HTMLFormElement | null;
    const emailInput = document.getElementById("login-email") as HTMLInputElement | null;
    const passwordInput = document.getElementById("login-password") as HTMLInputElement | null;
    const roleSelect = document.getElementById("login-role") as HTMLSelectElement | null;
    const expenseForm = document.getElementById("expense-form") as HTMLFormElement | null;
    const expenseTableBody = document.querySelector("#expense-table tbody") as HTMLTableSectionElement | null;
    const exportCsvButton = document.getElementById("export-csv") as HTMLButtonElement | null;

    if (!loginForm || !emailInput || !passwordInput || !roleSelect || !expenseForm || !expenseTableBody || !exportCsvButton) {
        console.error("Some required DOM elements are missing.");
        return;
    }

    // Helper: Check login state
    const isLoggedIn = () => localStorage.getItem("isLoggedIn") === "true";
    const getRole = () => localStorage.getItem("role");

    const setLoggedInState = (loggedIn: boolean, role: string | null = null) => {
        localStorage.setItem("isLoggedIn", loggedIn.toString());
        if (role) {
            localStorage.setItem("role", role);
        } else {
            role = getRole();
        }
        document.getElementById("login-container")!.style.display = loggedIn ? "none" : "block";
        document.getElementById("expense-tracker")!.style.display = loggedIn ? "block" : "none";
        document.getElementById("auth-nav")!.style.display = loggedIn ? "block" : "none";
        document.querySelectorAll(".delete-btn").forEach((btn) => {
            (btn as HTMLElement).style.display = role === "admin" ? "inline-block" : "none";
        });
    };

    // Fetch and display expenses
    const fetchExpenses = async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error("Failed to fetch expenses");
            const expenses = await response.json();
            displayExpenses(expenses);
        } catch (error) {
            console.error("Error fetching expenses:", error);
        }
    };

    const displayExpenses = (
        expenses: Array<{ id: number; amount: number; description: string; date: string; category: string }>
    ) => {
        const role = getRole();
        expenseTableBody.innerHTML = "";
        expenses.forEach((expense) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${expense.amount}</td>
                <td>${expense.description}</td>
                <td>${expense.date}</td>
                <td>${expense.category}</td>
                <td><button class="delete-btn" data-id="${expense.id}" style="display: ${role === "admin" ? "inline-block" : "none"}">Delete</button></td>
            `;
            expenseTableBody.appendChild(row);

            row.querySelector(".delete-btn")?.addEventListener("click", () => deleteExpense(expense.id));
        });
    };

    // Add expense
    expenseForm.addEventListener("submit", async (e: Event) => {
        e.preventDefault();
        const amount = parseFloat((document.getElementById("amount") as HTMLInputElement).value);
        const description = (document.getElementById("description") as HTMLInputElement).value;
        const date = (document.getElementById("date") as HTMLInputElement).value;
        const category = (document.getElementById("category") as HTMLSelectElement).value;

        if (!amount || !description || !date || !category) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount, description, date, category }),
            });
            if (!response.ok) throw new Error("Failed to add expense");
            fetchExpenses();
            expenseForm.reset();
        } catch (error) {
            console.error("Error adding expense:", error);
        }
    });

    // Delete expense
    const deleteExpense = async (expenseId: number) => {
        try {
            const response = await fetch(`${API_URL}/${expenseId}`, { method: "DELETE" });
            if (!response.ok) throw new Error("Failed to delete expense");
            fetchExpenses();
        } catch (error) {
            console.error("Error deleting expense:", error);
        }
    };

    // Export expenses to CSV
    exportCsvButton.addEventListener("click", async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error("Failed to fetch expenses");
            const expenses = await response.json();

            const csvContent =
                "data:text/csv;charset=utf-8," +
                ["Amount,Description,Date,Category"]
                    .concat(
                        expenses.map(
                            (expense: { amount: number; description: string; date: string; category: string }) =>
                                `${expense.amount},${expense.description},${expense.date},${expense.category}`
                        )
                    )
                    .join("\n");

            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "expenses.csv");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Error exporting expenses:", error);
        }
    });

    // Handle login
    loginForm.addEventListener("submit", (e: Event) => {
        e.preventDefault();
        const email = emailInput.value;
        const password = passwordInput.value;
        const role = roleSelect.value;

        if (!email || !password || !role) {
            alert("Please fill in all fields.");
            return;
        }

        // Role-based logic for login (simple example)
        if ((email === "admin32@gmail.com" && password === "adminpassword" && role === "admin") || 
            (email === "user32@gmail.com" && password === "userpassword" && role === "user")) {
            alert("Login successful!");
            setLoggedInState(true, role);

            // Fetch expenses after login
            fetchExpenses();
        } else {
            alert("Invalid credentials");
        }
    });

    // Logout functionality
    document.getElementById("logout")?.addEventListener("click", () => {
        setLoggedInState(false);
        localStorage.removeItem("role");
        alert("You have been logged out.");
    });
    

    // Initial fetch
    if (isLoggedIn()) fetchExpenses();
});

