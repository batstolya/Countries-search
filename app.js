const appRoot = document.getElementById('app-root');

let header = document.createElement('header');
document.body.prepend(header);
let h1 = document.createElement('h1');
header.prepend(h1)
h1.innerHTML = "Countries Search"
    // var input = document.createElement("input");
let div = document.createElement('div');
div.className = "div-for-input"; // set the id class
header.append(div);

let div2 = document.createElement('div');
div2.className = "div-for-input2"; // set the id class
header.append(div2);

let form = document.createElement('form');
header.append(form);
form.append(div)
form.append(div2)



document.body.prepend(header);
let input1 = document.createElement('input');
let label1 = document.createElement('label');
input1.id = "region"; // set the id class


var att = document.createAttribute("for"); // Create a "class" attribute
att.value = "region";
label1.setAttributeNode(att); // создает for для инпута с лайблом

input1.type = "radio";
label1.innerHTML = "By Region";
input1.value = 'region'
input1.name = 'choose'

var checked = document.createAttribute("onclick"); // Create a "class" attribute
checked.value = "check('region')";
input1.setAttributeNode(checked); // создает for для инпута с лайблом




div.append(input1)
div.append(label1)
    ///
let input2 = document.createElement('input');
let label2 = document.createElement('label');
input2.id = "language"; // set the id class

var att1 = document.createAttribute("for"); // Create a "class" attribute
att1.value = "language";
label2.setAttributeNode(att1); // создает for для инпута с лайблом

input2.type = "radio";
label2.innerHTML = "By Language";
input2.value = 'language'
input2.name = 'choose'

let checked2 = document.createAttribute("onclick"); // Create a "class" attribute
checked2.value = "check('language')";
input2.setAttributeNode(checked2); // создает for для инпута с лайблом


div2.append(input2)
div2.append(label2)

let p = document.createElement('p')
p.innerHTML = "Please choose type of search:";
header.append(p);

form.append(p)
let div3 = document.createElement('div');
div3.className = "div-for-search-query"; // set the id class
header.append(div3);

let div4 = document.createElement('div');
div4.className = "div4"; // set the id class

form.append(div4)

div4.append(div)
div4.append(div2)

let main = document.createElement('main');

header.append(main);
main.append(div3)

let p2 = document.createElement('p')
p2.innerHTML = "Please choose search query:";
div3.append(p2);


let select = document.createElement('select');
let option = document.createElement('option');
option.text = 'Select value';

select.id = "query-select";


let onchange = document.createAttribute("onchange"); // Create a "class" attribute
onchange.value = "findOption(this)";
select.setAttributeNode(onchange); // создает for для инпута с лайблом


div3.append(select);


select.appendChild(option)

function check(a) {
    let existing = document.getElementById("query-select");
    while (existing.options.length > 1) {
        existing.remove(1);
    }

    let lengthRegionsListinCountry = externalService.getRegionsList().length
    let lengthLanguagesList = externalService.getLanguagesList().length


    if (a === "region") {



        let existing = document.getElementById("messadge");

        if (existing !== null) {
            existing.remove();
        }
        let messadge = document.createElement('p')
        messadge.id = "messadge"
        messadge.innerHTML = "No items, please choose search query";
        main.appendChild(messadge);


        for (let i = 0; i < lengthRegionsListinCountry; i++) {
            let option = document.createElement('option');
            option.value = `value${i}`;
            option.id = "options";

            div3.append(select);
            option.innerHTML = externalService.getRegionsList()[i];
            select.appendChild(option)

        }
    } else if (a === "language") {

        existing = document.getElementById("messadge");

        if (existing !== null) {
            existing.remove();
        }
        messadge = document.createElement('p')
        messadge.id = "messadge"
        messadge.innerHTML = "No items, please choose search query";
        main.appendChild(messadge);






        for (let i = 0; i < lengthLanguagesList; i++) {
            let option = document.createElement('option');
            option.value = `value${i}`;

            option.id = "options";

            div3.append(select);
            option.innerHTML = externalService.getLanguagesList()[i];
            select.appendChild(option)
        }
    }

}

function findOption(select) {
    aaa = document.getElementById("messadge");


    if (aaa !== null) {
        aaa.remove();
    }
    let existing = document.getElementById("my-table");

    if (existing !== null) {
        existing.remove();
    }
    let arrayOfCountry = null;

    let elem = document.querySelector('body')

    const option = select.querySelector(`option[value = "${select.value}"]`)

    arrayOfCountry = externalService.getCountryListByRegion(option.innerHTML);




    if (arrayOfCountry === null || arrayOfCountry.length === 0) {
        arrayOfCountry = externalService.getCountryListByLanguage(option.innerHTML)

    }



    // td.id = "array"

    // sortByCountryName(arrayOfCountry);
    // sortByArea(arrayOfCountry);

    createTable(elem, arrayOfCountry);


}


function sortByCountryName(arrayOfCountry) { // A -> X 
    console.log("arrayOfCountry");
    console.log(arrayOfCountry);
    return arrayOfCountry.sort(a, b => {
        console.log(a.name);
        console.log(b.name);
    });
}

function sortArray(a, b) {
    if (a.name > b.name) {
        return 1;
    } else if (b.name > a.name) {
        return -1
    }
    return 0;
}

function sortByArea(arrayOfCountry) { // 100 -> 99 
    return arrayOfCountry.sort(a, b => a.area > b.area ? 1 : b.area > a.area ? -1 : 0)
}


function createTable(parent, arrayOfCountry) {


    let numberOfRegions = arrayOfCountry.length + 1;




    let table = document.createElement('table');
    table.id = "my-table"

    let cols = 6;
    for (let i = 0; i < numberOfRegions; i++) {
        let tr = document.createElement('tr');

        for (let j = 0; j < cols; j++) {
            let td = document.createElement('td');
            tr.appendChild(td);
            let t = ['Country name', "Capital", "World Region", "Languages", "Area", "Flag"]
            if (i === 0) {
                td.innerHTML = t[j];
                td.style.border = '1px solid red';
                td.style.backgroundColor = '  green';
                if (t[j] === 'Country name') {
                    td.id = "array"
                    td.innerHTML = `${t[0]} &#129045;`;
                    td.style.cursor = "pointer"


                }
                if (t[j] === "Area") {
                    td.id = "array1"
                    td.innerHTML = `${t[0]} &#129047;`;
                    td.style.cursor = "pointer"

                }

            }

            for (let k = 0; k < numberOfRegions; k++) {
                if (i === k + 1 && j === 0) {

                    td.innerHTML = arrayOfCountry[k].name;


                    console.log(k)

                    td.style.border = '1px solid red';
                    td.style.backgroundColor = '   #FFC0CB';

                }
                getCountryAndCreatesTable()

                function getCountryAndCreatesTable() {
                    if (i === k + 1 && j === 1) {

                        td.innerHTML = arrayOfCountry[k].capital;

                        td.style.border = '1px solid red';
                        td.style.backgroundColor = '  lightblue';

                    } else if (i === k + 1 && j === 2) {
                        td.innerHTML = arrayOfCountry[k].region;


                        td.style.border = '1px solid red';
                        td.style.backgroundColor = '  lightblue';

                    } else if (i === k + 1 && j === 3) {
                        let language = arrayOfCountry[k].languages;

                        td.innerHTML = Object.values(language);

                        td.style.border = '1px solid red';
                        td.style.backgroundColor = '  lightblue';

                    } else if (i === k + 1 && j === 4) {
                        td.innerHTML = arrayOfCountry[k].area;



                        td.style.border = '1px solid red';
                        td.style.backgroundColor = '  lightblue';

                    } else if (i === k + 1 && j === 5) {
                        let img = document.createElement('img');
                        td.append(img)
                        var href = document.createAttribute("src"); // Create a "class" attribute
                        href.value = `${arrayOfCountry[k].flagURL}`;
                        img.setAttributeNode(href); // создает for для инпута с лайблом



                        td.style.border = '1px solid red';
                        td.style.backgroundColor = ' lightblue';

                    }
                }

            }

        }
        table.appendChild(tr);
    }
    main.append(table);

}