
const addCategoryBtn = document.getElementById("exp-add-category");
const addExpenseBtn = document.getElementById("exp-add-expense");

addCategoryBtn.addEventListener("click", () => {
    const category = document.getElementById("exp-category");
    // console.log("Test", category);
    addCategory(category.value);
    category.value = "";


})


addCategory = (cat) => {
    const allCategory = fetchCategories();

    // console.log("allCategory ", allCategory);
    const catOb = {
        id: allCategory.length + 1,
        category: cat
    };

    allCategory.push(catOb)
    localStorage.setItem("categories", JSON.stringify(allCategory));
}

fetchCategories = () => {
    let allCategory = JSON.parse(localStorage.getItem("categories"));

    if (!allCategory)
        allCategory = [];

    return allCategory;
}

createCategoryOptions = () => {
    const allCategory = fetchCategories();
    const selectEle = document.getElementById("exp-sel-category");

    allCategory.forEach(item => {
        const optionEle = document.createElement("option");
        optionEle.value = item.id;
        optionEle.textContent = item.category
        selectEle.appendChild(optionEle);
    })

}
createCategoryOptions();

// Expense Related 
const fetchExpenses = () => {
    let expenses = JSON.parse(localStorage.getItem("expenses"));
    if (!expenses) expenses = {};
    return expenses;
}

const saveExpenses = (expenses) => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

const getMonthKey = (dateStr) => {
    const d = new Date(dateStr);
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    return `${year}-${month}`;  // e.g. "2025-08"
}


addExpense = (date, amount, category_id) => {
    let expenses = fetchExpenses();
    const monthKey = getMonthKey(date);

    if (!expenses[monthKey]) {
        expenses[monthKey] = {};
    }

    if (!expenses[monthKey][category_id]) {
        expenses[monthKey][category_id] = 0;
    }

    expenses[monthKey][category_id] += parseFloat(amount);

    saveExpenses(expenses);
    // console.log("Updated Expenses:", expenses);
    window.alert("Expense Added Successfully!");

}

addExpenseBtn.addEventListener("click", () => {
    const dateEle = document.getElementById("exp-date");
    const amountEle = document.getElementById("exp-expense");
    const catEle = document.getElementById("exp-sel-category");


    if (!dateEle.value || !amountEle.value || !catEle.value) {
        window.alert("Fill up all Expense details");
        return;
    }

    addExpense(dateEle.value, amountEle.value, catEle.value);


})
 getMonthNameFromNumber = (year, monthNumber) => {
    // monthNumber = 1–12 (Jan = 1, Dec = 12)
    const date = new Date(year, monthNumber - 1); // JS month index 0–11
    return date.toLocaleString("default", { month: "long" });
}

createMonthOptions = () => {
    const expenses = fetchExpenses();
    // console.log(expenses);
    const months = Object.keys(expenses);

    const monthSelect = document.getElementById("exp-month-select");

    if ( !months.length ) {
        const optionEle = document.createElement("option");
        optionEle.value = "NA";
        optionEle.textContent = "No Data";
        monthSelect.appendChild(optionEle);
    }
    months.forEach(month => {
        const yearMonth = month.split("-");
        const monthName = getMonthNameFromNumber(yearMonth[0], yearMonth[1]);
        const optionEle = document.createElement("option");
        optionEle.value = monthName;
        optionEle.textContent = monthName;
        monthSelect.appendChild(optionEle);

    })
    

}
createMonthOptions();


fetchAllExpenses = () => {
    const expenses = fetchExpenses();
}


