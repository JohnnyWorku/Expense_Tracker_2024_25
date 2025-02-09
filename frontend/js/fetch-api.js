"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
window.addEventListener("DOMContentLoaded", function () {
    var _a;
    var API_URL = "http://localhost:3000/expenses";
    // DOM Elements
    var loginForm = document.getElementById("login-form");
    var emailInput = document.getElementById("login-email");
    var passwordInput = document.getElementById("login-password");
    var roleSelect = document.getElementById("login-role");
    var expenseForm = document.getElementById("expense-form");
    var expenseTableBody = document.querySelector("#expense-table tbody");
    var exportCsvButton = document.getElementById("export-csv");
    if (!loginForm || !emailInput || !passwordInput || !roleSelect || !expenseForm || !expenseTableBody || !exportCsvButton) {
        console.error("Some required DOM elements are missing.");
        return;
    }
    // Helper: Check login state
    var isLoggedIn = function () { return localStorage.getItem("isLoggedIn") === "true"; };
    var getRole = function () { return localStorage.getItem("role"); };
    var setLoggedInState = function (loggedIn, role) {
        if (role === void 0) { role = null; }
        localStorage.setItem("isLoggedIn", loggedIn.toString());
        if (role) {
            localStorage.setItem("role", role);
        }
        else {
            role = getRole();
        }
        document.getElementById("login-container").style.display = loggedIn ? "none" : "block";
        document.getElementById("expense-tracker").style.display = loggedIn ? "block" : "none";
        document.getElementById("auth-nav").style.display = loggedIn ? "block" : "none";
        document.querySelectorAll(".delete-btn").forEach(function (btn) {
            btn.style.display = role === "admin" ? "inline-block" : "none";
        });
    };
    // Fetch and display expenses
    var fetchExpenses = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, expenses, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch(API_URL)];
                case 1:
                    response = _a.sent();
                    if (!response.ok)
                        throw new Error("Failed to fetch expenses");
                    return [4 /*yield*/, response.json()];
                case 2:
                    expenses = _a.sent();
                    displayExpenses(expenses);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error("Error fetching expenses:", error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var displayExpenses = function (expenses) {
        var role = getRole();
        expenseTableBody.innerHTML = "";
        expenses.forEach(function (expense) {
            var _a;
            var row = document.createElement("tr");
            row.innerHTML = "\n                <td>".concat(expense.amount, "</td>\n                <td>").concat(expense.description, "</td>\n                <td>").concat(expense.date, "</td>\n                <td>").concat(expense.category, "</td>\n                <td><button class=\"delete-btn\" data-id=\"").concat(expense.id, "\" style=\"display: ").concat(role === "admin" ? "inline-block" : "none", "\">Delete</button></td>\n            ");
            expenseTableBody.appendChild(row);
            (_a = row.querySelector(".delete-btn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () { return deleteExpense(expense.id); });
        });
    };
    // Add expense
    expenseForm.addEventListener("submit", function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var amount, description, date, category, response, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    amount = parseFloat(document.getElementById("amount").value);
                    description = document.getElementById("description").value;
                    date = document.getElementById("date").value;
                    category = document.getElementById("category").value;
                    if (!amount || !description || !date || !category) {
                        alert("Please fill in all fields.");
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fetch(API_URL, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ amount: amount, description: description, date: date, category: category }),
                        })];
                case 2:
                    response = _a.sent();
                    if (!response.ok)
                        throw new Error("Failed to add expense");
                    fetchExpenses();
                    expenseForm.reset();
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.error("Error adding expense:", error_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    // Delete expense
    var deleteExpense = function (expenseId) { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetch("".concat(API_URL, "/").concat(expenseId), { method: "DELETE" })];
                case 1:
                    response = _a.sent();
                    if (!response.ok)
                        throw new Error("Failed to delete expense");
                    fetchExpenses();
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    console.error("Error deleting expense:", error_3);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    // Export expenses to CSV
    exportCsvButton.addEventListener("click", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, expenses, csvContent, encodedUri, link, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch(API_URL)];
                case 1:
                    response = _a.sent();
                    if (!response.ok)
                        throw new Error("Failed to fetch expenses");
                    return [4 /*yield*/, response.json()];
                case 2:
                    expenses = _a.sent();
                    csvContent = "data:text/csv;charset=utf-8," +
                        ["Amount,Description,Date,Category"]
                            .concat(expenses.map(function (expense) {
                            return "".concat(expense.amount, ",").concat(expense.description, ",").concat(expense.date, ",").concat(expense.category);
                        }))
                            .join("\n");
                    encodedUri = encodeURI(csvContent);
                    link = document.createElement("a");
                    link.setAttribute("href", encodedUri);
                    link.setAttribute("download", "expenses.csv");
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    return [3 /*break*/, 4];
                case 3:
                    error_4 = _a.sent();
                    console.error("Error exporting expenses:", error_4);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    // Handle login
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var email = emailInput.value;
        var password = passwordInput.value;
        var role = roleSelect.value;
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
        }
        else {
            alert("Invalid credentials");
        }
    });
    // Logout functionality
    (_a = document.getElementById("logout")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
        setLoggedInState(false);
        localStorage.removeItem("role");
        alert("You have been logged out.");
    });
    // Initial fetch
    if (isLoggedIn())
        fetchExpenses();
});
