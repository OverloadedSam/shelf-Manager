let str = "aewrqr ZShAuqr";
console.log(str);
console.log(str.charCodeAt(0));

if (isAlphanumeric(str)) {
    console.log("alphanumeric");
}
else{
    console.log("valid string");
}
// st.forEach((str, index) => {
//     if (str.charCodeAt(index) < 65 || (str.charCodeAt(index) > 90 && str.charCodeAt(index) < 97 && str.charCodeAt(index) > 122)) {
//         console.log("alphanumeric");
//     }
//     else{
//         console.log("valid");
//     }
// });

function isAlphanumeric(name) {
    
    for (let index = 0; index < name.length; index++) {
        if (name.charCodeAt(index) < 65 || (name.charCodeAt(index) > 90 && name.charCodeAt(index) < 97 && name.charCodeAt(index) > 122)) {
            if (name.charCodeAt(index) === 32) {
                continue;
            }
            // console.log("alphanumeric");
            return true;
        }
        // else{
        //     console.log("valid");
        // }
    }
    return false;
}
