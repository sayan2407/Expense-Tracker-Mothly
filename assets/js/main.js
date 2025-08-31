
const addCategoryBtn = document.getElementById("exp-add-category");

addCategoryBtn.addEventListener("click", () => {
    const category = document.getElementById("exp-category") ;
    // console.log("Test", category);
    addCategory(category.value);
    category.value = "";

    
})


addCategory = ( cat ) => {
    let allCategory = JSON.parse( localStorage.getItem("categories") );
    console.log("allCategory ", allCategory);
    
    if ( !allCategory )
        allCategory = [];

    console.log("allCategory ", allCategory);


    allCategory.push(cat)
    localStorage.setItem("categories", JSON.stringify(allCategory) );
}