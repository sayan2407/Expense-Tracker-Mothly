
const addCategoryBtn = document.getElementById("exp-add-category");
const addExpenseBtn = document.getElementById("exp-add-expense");

addCategoryBtn.addEventListener("click", () => {
    const category = document.getElementById("exp-category") ;
    // console.log("Test", category);
    addCategory(category.value);
    category.value = "";

    
})


addCategory = ( cat ) => {
    const allCategory = fetchCategories();
   
    // console.log("allCategory ", allCategory);
    const catOb = {
        id: allCategory.length + 1,
        category: cat
    };

    allCategory.push(catOb)
    localStorage.setItem("categories", JSON.stringify(allCategory) );
}

fetchCategories = () => {
    let allCategory = JSON.parse( localStorage.getItem("categories") );
    
    if ( !allCategory )
        allCategory = [];

    return allCategory;
}

createCategoryOptions = () => {
    const allCategory = fetchCategories();
    const selectEle = document.getElementById("exp-sel-category");

    allCategory.forEach(item=> {
        const optionEle = document.createElement("option");
        optionEle.value = item.id;
        optionEle.textContent = item.category
        selectEle.appendChild(optionEle);
    })

}
createCategoryOptions();


