function redirectToMainMenu(){
    console.log("entered main menu");
    let mainMenuEl=document.getElementById("mainMenu");
    mainMenuEl.classList.remove("d-none");
    mainMenuEl.scrollIntoView({behaviour:"smooth"});
    let homePageEl=document.getElementById("homePage");
    homePageEl.classList.add("d-none");
    
}

function redirectToMenu(Element){
    console.log("entered starters menu");
    let mainMenuEl=document.getElementById("mainMenu");
    mainMenuEl.classList.add("d-none");
    let completeMenuEl=document.getElementById("completeMenu");
    completeMenuEl.classList.remove("d-none");
    Element.scrollIntoView({behaviour:"smooth"});
}

function backToMainMenu(){
    let mainMenuEl=document.getElementById("mainMenu");
    mainMenuEl.classList.remove("d-none");
    mainMenuEl.scrollIntoView({behaviour:"smooth"});
    let completeMenuEl=document.getElementById("completeMenu");
    completeMenuEl.classList.add("d-none");
}

function decrement(count)
{
    count=parseInt(count)-1;
    return (count);
}

function increment(count)
{
    count=parseInt(count)+1;
    return (count);
}
let containerEl=null;
function btnHandling(addItemBtnEl,key,isCart){
    let viewCartBtnContainerEl=document.getElementById("viewCartBtnContainer");
    let text = addItemBtnEl.textContent;
    let count=null;
    console.log("Start:",isCart,count,key,selectedItem[key])
    if(text=="Add")
    { 
        let minusEl=null;
        let countEl=null;
        let plusEl=null;
        //let containerEl=null;

        addItemBtnEl.textContent="";
        console.log("1.",isCart,count,key,selectedItem[key])
        if(isCart==false)
        {
                count=1;
                selectedItem[key]=count;
                totalCount+=1;   
        }
        else
        {
            count=selectedItem[key];
        }
        
        totalCountEl.textContent=totalCount;
        console.log("totalCount step 1",totalCount);
        viewCartBtnContainerEl.classList.remove("d-none");

        addItemBtnEl.style.borderWidth="0px";
        containerEl=document.createElement("div");
        containerEl.style.display="flex";
        containerEl.style.justifyContent="center";
        containerEl.id="item"+key+isCart;
        console.log("containerEl.id",containerEl.id);
        addItemBtnEl.appendChild(containerEl);

        minusEl=document.createElement("button");
        minusEl.textContent="-";
        minusEl.classList.add("countBtn");
        minusEl.onclick=function(){
            //console.log("Before decrement:",count);
            if(selectedItem[key]!==undefined)
            {
                console.log("entered minus selectedItem[key]!==undefined");
                count=selectedItem[key];
            }
            count=decrement(count);
            //console.log("After decrement:",count);
            countEl.textContent=count;
            selectedItem[key]=count;
            //console.log(selectedItem);
            totalCount-=1;
            totalCountEl.textContent=totalCount;
            console.log("totalCount sub",totalCount);
            console.log("3.minus",isCart,count,key,selectedItem)
            if(isCart===true){
                let id1=JSON.parse(key)+false;
                let dataEl=document.getElementById(id1);
                if(count!==0){
                    dataEl.textContent=count;
                }
                else{
                    let str =key;
                    let noSpaces = str.replace(/\s+/g, ''); // Removes all whitespace
                    console.log("key",noSpaces);
                    let id1="add"+JSON.parse(noSpaces);
                    let id2="item"+key+false;
                    let btnEl=document.getElementById(id1);
                    let contEl=document.getElementById(id2);
                    console.log("id1:",id1,"id2:",id2);
                    btnEl.removeChild(contEl);
                    btnEl.textContent="Add";
                    delete selectedItem[key];
                    console.log(selectedItem,"after deletion in cart");
                }    
                console.log("In isCart true 1: ",dataEl);
                let temp="latestPrice"+key;
                let updatePrice=document.getElementById(temp);
                updatePrice.textContent = parseInt(selectedItem[key])*parseInt(itemPrice[key]);
                let billEl=document.getElementById("bill");
                bill-=parseInt(itemPrice[key]);
                billEl.textContent=bill;
            }
            if(totalCount===0)
            {
                viewCartBtnContainerEl.classList.add("d-none");
            }
            else{
                viewCartBtnContainerEl.classList.remove("d-none");
            }
        };
        containerEl.appendChild(minusEl);

        countEl=document.createElement("button");
        countEl.textContent=count;
        countEl.id=JSON.parse(key)+isCart;
        countEl.classList.add("countBtn");
        containerEl.appendChild(countEl);

        plusEl=document.createElement("button");
        plusEl.textContent="+";
        plusEl.classList.add("countBtn");
        containerEl.appendChild(plusEl);
        plusEl.onclick=function(){
            //console.log("Before increment:",count);
            if(selectedItem[key]!==undefined)
            {
                console.log("entered plus selectedItem[key]!==undefined");
                count=selectedItem[key];
            }
            count = increment(count);
            //console.log("After increment:",count);
            countEl.textContent=count;
            selectedItem[key]=count;
            console.log(selectedItem);
            totalCount+=1;
            totalCountEl.textContent=totalCount;
            console.log("totalCount add",totalCount);
            console.log("4.plus",isCart,count,key,selectedItem[key])
            if(isCart===true){
                let id1=JSON.parse(key)+false;
                let dataEl=document.getElementById(id1);
                if(count!==0){
                    dataEl.textContent=count;
                }
                else{
                    let str =key;
                    let noSpaces = str.replace(/\s+/g, ''); // Removes all whitespace
                    console.log("key",noSpaces);
                    let id1="add"+JSON.parse(noSpaces);
                    let id2="item"+key+false;
                    let btnEl=document.getElementById(id1);
                    let contEl=document.getElementById(id2);
                    //btnEl.removeChild(contEl);
                    btnEl.textContent="Add";
                }
                console.log("In isCart true 2: ",dataEl);
                let temp="latestPrice"+key;
                let updatePrice=document.getElementById(temp);
                updatePrice.textContent = parseInt(selectedItem[key])*parseInt(itemPrice[key]);
                let billEl=document.getElementById("bill");
                bill+=parseInt(itemPrice[key]);
                billEl.textContent=bill;
            }

            viewCartBtnContainerEl.classList.remove("d-none");
        };   
    }
    else{
        console.log("entered else in",isCart);
        let id="item"+key+isCart;
        containerEl=document.getElementById(id);
        count=selectedItem[key];
        console.log("else",count);
        console.log("2.",isCart,count,key,selectedItem[key])
        if(count===0)
        {
            console.log("entered count=0");
            addItemBtnEl.removeChild(containerEl);
            addItemBtnEl.textContent="Add";
            addItemBtnEl.style.borderWidth="1px";
            delete selectedItem[key];
            console.log("selectedItem",selectedItem);
            viewCartBtnContainerEl.classList.add("d-none");
            if(isCart===true){
                let str =key;
                let noSpaces = str.replace(/\s+/g, ''); // Removes all whitespace
                console.log("key",noSpaces);
                let id1="add"+JSON.parse(noSpaces);
                let id2="item"+key+false;
                let btnEl=document.getElementById(id1);
                let contEl=document.getElementById(id2);
                btnEl.removeChild(contEl);
                btnEl.textContent="Add";

                console.log("In isCart true 3: ",contEl);
            }
        }  
    }
}

function updateItemFunction(){
    //console.log("entered updateItemFunction")
    //console.log(keysArray)
    //console.log(selectedItem)
    for(let item of keysArray){
        //console.log("updateItemFunction item",item);
        //console.log("updateItemFunction selectedItem.item",selectedItem[item]);
        if(selectedItem[item]===undefined)
        {
            //console.log("entered updateItemFunction selectedItem.item",selectedItem.item);
            let key=item+"liId";
            let liEl=document.getElementById(key);
            let ulEl=document.getElementById("finalList");
            ulEl.removeChild(liEl);
            keysArray=Object.keys(selectedItem);
        }
    }
    //console.log("keysArray",keysArray,keysArray.length);
    if(keysArray.length === 0){
        let viewCartWindowEl=document.getElementById("viewCartWindow");
        viewCartWindowEl.classList.add("d-none");
        let completeMenuEl=document.getElementById("completeMenu");
        completeMenuEl.classList.remove("d-none");
        clearInterval(intervalId);
    }
}
customizeObject={};
function CustomizeInput(editEl,item,div1){
    if(customizeObject[item]===undefined)
    {
        let divEl=document.createElement("div");
        divEl.id=item+"customize";
        div1.appendChild(divEl)
        let h1El=document.createElement("h1");
        h1El.classList.add("edittxt");
        h1El.textContent="Add a cooking request(optinal)";
        divEl.appendChild(h1El)
        let textEl=document.createElement("input");
        textEl.classList.add("d-block");
        divEl.appendChild(textEl)
        let updateBtn=document.createElement("button");
        updateBtn.classList.add("d-block","updateBtn","mt-3");
        updateBtn.textContent="Update";
        updateBtn.id=item+"update";
        updateBtn.onclick=function(){
            editEl.classList.remove("d-none");
            divEl.classList.add("d-none");
            customizeObject[item]=textEl.value;
        };
        divEl.appendChild(updateBtn)
    }
    else{
       let temp=item+"customize"; 
       let divEl=document.getElementById(temp);
       editEl.classList.add("d-none");
       divEl.classList.remove("d-none");
    }
}

let orderNowButtonEl=document.getElementById("orderNowButton");
orderNowButtonEl.onclick=function(){
    redirectToMainMenu();
};

let startersBtnEl=document.getElementById("startersBtn");
startersBtnEl.onclick=function(){
    let startersEl=document.getElementById("starters");
    redirectToMenu(startersEl);
};

let soupsBtnEl=document.getElementById("soupsBtn");
soupsBtnEl.onclick=function(){
    let soupsEl=document.getElementById("soups");
    redirectToMenu(soupsEl);
};

let rotiBtnEl=document.getElementById("rotiBtn");
rotiBtnEl.onclick=function(){
    let rotiEl=document.getElementById("roti");
    redirectToMenu(rotiEl);
};

let biryaniBtnEl=document.getElementById("biryaniBtn");
biryaniBtnEl.onclick=function(){
    let biryaniEl=document.getElementById("biryani");
    redirectToMenu(biryaniEl);
};

let curriesBtnEl=document.getElementById("curriesBtn");
curriesBtnEl.onclick=function(){
    let curryEl=document.getElementById("curry");
    redirectToMenu(curryEl);
};

let sandwichBtnEl=document.getElementById("sandwichBtn");
sandwichBtnEl.onclick=function(){
    let sandwichEl=document.getElementById("sandwich");
    redirectToMenu(sandwichEl);
};

let burgerBtnEl=document.getElementById("burgerBtn");
burgerBtnEl.onclick=function(){
    let burgerEl=document.getElementById("burger");
    redirectToMenu(burgerEl);
};

let pizzaBtnEl=document.getElementById("pizzaBtn");
pizzaBtnEl.onclick=function(){
    let pizzaEl=document.getElementById("pizza");
    redirectToMenu(pizzaEl);
};

let noodlesBtnEl=document.getElementById("noodlesBtn");
noodlesBtnEl.onclick=function(){
    let noodlesEl=document.getElementById("noodles");
    redirectToMenu(noodlesEl);
};

let frankieBtnEl=document.getElementById("frankieBtn");
frankieBtnEl.onclick=function(){
    let frankieEl=document.getElementById("frankie");
    redirectToMenu(frankieEl);
};

let momoBtnEl=document.getElementById("momoBtn");
momoBtnEl.onclick=function(){
    let momoEl=document.getElementById("momo");
    redirectToMenu(momoEl);
};

let tiffinBtnEl=document.getElementById("tiffinBtn");
tiffinBtnEl.onclick=function(){
    let tiffinsEl=document.getElementById("tiffins");
    redirectToMenu(tiffinsEl);
};

let icecreamBtnEl=document.getElementById("icecreamBtn");
icecreamBtnEl.onclick=function(){
    let iceCreamsEl=document.getElementById("iceCreams");
    redirectToMenu(iceCreamsEl);
};

let sweetbtnEl=document.getElementById("sweetbtn");
sweetbtnEl.onclick=function(){
    let sweetsEl=document.getElementById("sweets");
    redirectToMenu(sweetsEl);
};

let snacksBtnEl=document.getElementById("snacksBtn");
snacksBtnEl.onclick=function(){
    let snacksEl=document.getElementById("snacks");
    redirectToMenu(snacksEl);
};

let backButtonEl=document.getElementById("backButton");
backButtonEl.onclick=function(){
    backToMainMenu();
};

let totalCountEl=document.getElementById("totalCount");

let selectedItem={};
let itemPrice={}
let totalCount=0

let addGobi65El=document.getElementById("addGobi65");
addGobi65El.onclick=function(){
    let key=document.getElementById("Gobi65").textContent;
    key=JSON.stringify(key);
    btnHandling(addGobi65El,key,false);
    let price=document.getElementById("gobi65Price").textContent;
    itemPrice[key]=price;
};

let addPaneerManchuriaEl=document.getElementById("addPaneerManchuria");
addPaneerManchuriaEl.onclick=function(){
    let key=document.getElementById("PaneerManchuria").textContent;
    key=JSON.stringify(key);
    btnHandling(addPaneerManchuriaEl,key,false);
    let price=document.getElementById("paneerManchuriaPrice").textContent;
    itemPrice[key]=price;
};

let addBabyCornDryEl=document.getElementById("addBabyCornDry");
addBabyCornDryEl.onclick=function(){
    let key=document.getElementById("BabyCornDry").textContent;
    key=JSON.stringify(key);
    btnHandling(addBabyCornDryEl,key,false);
    let price=document.getElementById("babyCornDryPrice").textContent;
    itemPrice[key]=price;
};

let addAlooTikkiEl=document.getElementById("addAlooTikki");
addAlooTikkiEl.onclick=function(){
    let key=document.getElementById("AlooTikki").textContent;
    key=JSON.stringify(key);
    btnHandling(addAlooTikkiEl,key,false);
    let price=document.getElementById("alooTikkiPrice").textContent;
    itemPrice[key]=price;
};

let addCheeseBallsEl=document.getElementById("addCheeseBalls");
addCheeseBallsEl.onclick=function(){
    let key=document.getElementById("CheeseBalls").textContent;
    key=JSON.stringify(key);
    btnHandling(addCheeseBallsEl,key,false);
    let price=document.getElementById("cheeseBallsPrice").textContent;
    itemPrice[key]=price;
};

let addFrenchFriesEl=document.getElementById("addFrenchFries");
addFrenchFriesEl.onclick=function(){
    let key=document.getElementById("FrenchFries").textContent;
    key=JSON.stringify(key);
    btnHandling(addFrenchFriesEl,key,false);
    let price=document.getElementById("frenchFriesPrice").textContent;
    itemPrice[key]=price;
};

let addCreamofBroccoliandSpinachSoupEl=document.getElementById("addCreamofBroccoliandSpinachSoup");
addCreamofBroccoliandSpinachSoupEl.onclick=function(){
    let key=document.getElementById("CreamofBroccoliandSpinachSoup").textContent;
    key=JSON.stringify(key);
    btnHandling(addCreamofBroccoliandSpinachSoupEl,key,false);
    let price=document.getElementById("creamofBroccoliandSpinachSoupPrice").textContent;
    itemPrice[key]=price;
};

let addCreamofTomatoSoupEl=document.getElementById("addCreamofTomatoSoup");
addCreamofTomatoSoupEl.onclick=function(){
    let key=document.getElementById("CreamofTomatoSoup").textContent;
    key=JSON.stringify(key);
    btnHandling(addCreamofTomatoSoupEl,key,false);
    let price=document.getElementById("creamofTomatoSoupPrice").textContent;
    itemPrice[key]=price;
};

let addLemonCorianderSoupEl=document.getElementById("addLemonCorianderSoup");
addLemonCorianderSoupEl.onclick=function(){
    let key=document.getElementById("LemonCorianderSoup").textContent;
    key=JSON.stringify(key);
    btnHandling(addLemonCorianderSoupEl,key,false);
    let price=document.getElementById("lemonCorianderSoupPrice").textContent;
    itemPrice[key]=price;
};

let addHotandSourSoupEl=document.getElementById("addHotandSourSoup");
addHotandSourSoupEl.onclick=function(){
    let key=document.getElementById("HotandSourSoup").textContent;
    key=JSON.stringify(key);
    btnHandling(addHotandSourSoupEl,key,false);
    let price=document.getElementById("hotandSourSoupPrice").textContent;
    itemPrice[key]=price;
};

let addTomKhaSoupEl=document.getElementById("addTomKhaSoup");
addTomKhaSoupEl.onclick=function(){
    let key=document.getElementById("TomKhaSoup").textContent;
    key=JSON.stringify(key);
    btnHandling(addTomKhaSoupEl,key,false);
    let price=document.getElementById("tomKhaSoupPrice").textContent;
    itemPrice[key]=price;
};

let addManchowSoupEl=document.getElementById("addManchowSoup");
addManchowSoupEl.onclick=function(){
    let key=document.getElementById("ManchowSoup").textContent;
    key=JSON.stringify(key);
    btnHandling(addManchowSoupEl,key,false);
    let price=document.getElementById("manchowSoupPrice").textContent;
    itemPrice[key]=price;
};

let addTandooriRotiEl=document.getElementById("addTandooriRoti");
addTandooriRotiEl.onclick=function(){
    let key=document.getElementById("TandooriRoti").textContent;
    key=JSON.stringify(key);
    btnHandling(addTandooriRotiEl,key,false);
    let price=document.getElementById("tandooriRotiPrice").textContent;
    itemPrice[key]=price;
};

let addButterRotiEl=document.getElementById("addButterRoti");
addButterRotiEl.onclick=function(){
    let key=document.getElementById("ButterRoti").textContent;
    key=JSON.stringify(key);
    btnHandling(addButterRotiEl,key,false);
    let price=document.getElementById("butterRotiPrice").textContent;
    itemPrice[key]=price;
};

let addGarlicButterRotiEl=document.getElementById("addGarlicButterRoti");
addGarlicButterRotiEl.onclick=function(){
    let key=document.getElementById("GarlicButterRoti").textContent;
    key=JSON.stringify(key);
    btnHandling(addGarlicButterRotiEl,key,false);
    let price=document.getElementById("garlicButterRotiPrice").textContent;
    itemPrice[key]=price;
};

let addAdrakiMirchiRotiEl=document.getElementById("addAdrakiMirchiRoti");
addAdrakiMirchiRotiEl.onclick=function(){
    let key=document.getElementById("AdrakiMirchiRoti").textContent;
    key=JSON.stringify(key);
    btnHandling(addAdrakiMirchiRotiEl,key,false);
    let price=document.getElementById("adrakiMirchiRotiPrice").textContent;
    itemPrice[key]=price;
};

let addMissiRotiEl=document.getElementById("addMissiRoti");
addMissiRotiEl.onclick=function(){
    let key=document.getElementById("MissiRoti").textContent;
    key=JSON.stringify(key);
    btnHandling(addMissiRotiEl,key,false);
    let price=document.getElementById("missiRotiPrice").textContent;
    itemPrice[key]=price;
};

let addButterNaanEl=document.getElementById("addButterNaan");
addButterNaanEl.onclick=function(){
    let key=document.getElementById("ButterNaan").textContent;
    key=JSON.stringify(key);
    btnHandling(addButterNaanEl,key,false);
    let price=document.getElementById("butterNaanPrice").textContent;
    itemPrice[key]=price;
};

let addSpecialDumBiryaniEl=document.getElementById("addSpecialDumBiryani");
addSpecialDumBiryaniEl.onclick=function(){
    let key=document.getElementById("SpecialDumBiryani").textContent;
    key=JSON.stringify(key);
    btnHandling(addSpecialDumBiryaniEl,key,false);
    let price=document.getElementById("specialDumBiryaniPrice").textContent;
    itemPrice[key]=price;
};

let addHariyaliPaneerTikkaBiryaniEl=document.getElementById("addHariyaliPaneerTikkaBiryani");
addHariyaliPaneerTikkaBiryaniEl.onclick=function(){
    let key=document.getElementById("HariyaliPaneerTikkaBiryani").textContent;
    key=JSON.stringify(key);
    btnHandling(addHariyaliPaneerTikkaBiryaniEl,key,false);
    let price=document.getElementById("hariyaliPaneerTikkaBiryaniPrice").textContent;
    itemPrice[key]=price;
};

let addSpecialHyderabadiBiryaniEl=document.getElementById("addSpecialHyderabadiBiryani");
addSpecialHyderabadiBiryaniEl.onclick=function(){
    let key=document.getElementById("SpecialHyderabadiBiryani").textContent;
    key=JSON.stringify(key);
    btnHandling(addSpecialHyderabadiBiryaniEl,key,false);
    let price=document.getElementById("specialHyderabadiBiryaniPrice").textContent;
    itemPrice[key]=price;
};

let addSpecialChaapBiryaniEl=document.getElementById("addSpecialChaapBiryani");
addSpecialChaapBiryaniEl.onclick=function(){
    let key=document.getElementById("SpecialChaapBiryani").textContent;
    key=JSON.stringify(key);
    btnHandling(addSpecialChaapBiryaniEl,key,false);
    let price=document.getElementById("specialChaapBiryaniPrice").textContent;
    itemPrice[key]=price;
};

let addSpecialTawaKumbhBiryaniEl=document.getElementById("addSpecialTawaKumbhBiryani");
addSpecialTawaKumbhBiryaniEl.onclick=function(){
    let key=document.getElementById("SpecialTawaKumbhBiryani").textContent;
    key=JSON.stringify(key);
    btnHandling(addSpecialTawaKumbhBiryaniEl,key,false);
    let price=document.getElementById("specialTawaKumbhBiryaniPrice").textContent;
    itemPrice[key]=price;
};

let addDiwaniHandiEl=document.getElementById("addDiwaniHandi");
addDiwaniHandiEl.onclick=function(){
    let key=document.getElementById("DiwaniHandi").textContent;
    key=JSON.stringify(key);
    btnHandling(addDiwaniHandiEl,key,false);
    let price=document.getElementById("diwaniHandiPrice").textContent;
    itemPrice[key]=price;
};

let addKolhapuriEl=document.getElementById("addKolhapuri");
addKolhapuriEl.onclick=function(){
    let key=document.getElementById("Kolhapuri").textContent;
    key=JSON.stringify(key);
    btnHandling(addKolhapuriEl,key,false);
    let price=document.getElementById("kolhapuriPrice").textContent;
    itemPrice[key]=price;
};

let addBindiMasalaEl=document.getElementById("addBindiMasala");
addBindiMasalaEl.onclick=function(){
    let key=document.getElementById("BindiMasala").textContent;
    key=JSON.stringify(key);
    btnHandling(addBindiMasalaEl,key,false);
    let price=document.getElementById("bindiMasalaPrice").textContent;
    itemPrice[key]=price;
};

let addSarsonKhaSaagEl=document.getElementById("addSarsonKhaSaag");
addSarsonKhaSaagEl.onclick=function(){
    let key=document.getElementById("SarsonKhaSaag").textContent;
    key=JSON.stringify(key);
    btnHandling(addSarsonKhaSaagEl,key,false);
    let price=document.getElementById("sarsonKhaSaagPrice").textContent;
    itemPrice[key]=price;
};

let addRajmaMasalaEl=document.getElementById("addRajmaMasala");
addRajmaMasalaEl.onclick=function(){
    let key=document.getElementById("RajmaMasala").textContent;
    key=JSON.stringify(key);
    btnHandling(addRajmaMasalaEl,key,false);
    let price=document.getElementById("rajmaMasalaPrice").textContent;
    itemPrice[key]=price;
};

let addCornPalakEl=document.getElementById("addCornPalak");
addCornPalakEl.onclick=function(){
    let key=document.getElementById("CornPalak").textContent;
    key=JSON.stringify(key);
    btnHandling(addCornPalakEl,key,false);
    let price=document.getElementById("cornPalakPrice").textContent;
    itemPrice[key]=price;
};

let addClubSandwichEl=document.getElementById("addClubSandwich");
addClubSandwichEl.onclick=function(){
    let key=document.getElementById("ClubSandwich").textContent;
    key=JSON.stringify(key);
    btnHandling(addClubSandwichEl,key,false);
    let price=document.getElementById("clubSandwichPrice").textContent;
    itemPrice[key]=price;
};

let addCheeseMayoSandwichEl=document.getElementById("addCheeseMayoSandwich");
addCheeseMayoSandwichEl.onclick=function(){
    let key=document.getElementById("CheeseMayoSandwich").textContent;
    key=JSON.stringify(key);
    btnHandling(addCheeseMayoSandwichEl,key,false);
    let price=document.getElementById("cheeseMayoSandwichPrice").textContent;
    itemPrice[key]=price;
};

let addCheeseKhakhraSandwichEl=document.getElementById("addCheeseKhakhraSandwich");
addCheeseKhakhraSandwichEl.onclick=function(){
    let key=document.getElementById("CheeseKhakhraSandwich").textContent;
    key=JSON.stringify(key);
    btnHandling(addCheeseKhakhraSandwichEl,key,false);
    let price=document.getElementById("cheeseKhakhraSandwichPrice").textContent;
    itemPrice[key]=price;
};

let addTripleGrilledSandwichEl=document.getElementById("addTripleGrilledSandwich");
addTripleGrilledSandwichEl.onclick=function(){
    let key=document.getElementById("TripleGrilledSandwich").textContent;
    key=JSON.stringify(key);
    btnHandling(addTripleGrilledSandwichEl,key,false);
    let price=document.getElementById("tripleGrilledSandwichPrice").textContent;
    itemPrice[key]=price;
};

let addCheeseSandwichEl=document.getElementById("addCheeseSandwich");
addCheeseSandwichEl.onclick=function(){
    let key=document.getElementById("CheeseSandwich").textContent;
    key=JSON.stringify(key);
    btnHandling(addCheeseSandwichEl,key,false);
    let price=document.getElementById("cheeseSandwichPrice").textContent;
    itemPrice[key]=price;
};

let addMumbaiSandwichEl=document.getElementById("addMumbaiSandwich");
addMumbaiSandwichEl.onclick=function(){
    let key=document.getElementById("MumbaiSandwich").textContent;
    key=JSON.stringify(key);
    btnHandling(addMumbaiSandwichEl,key,false);
    let price=document.getElementById("mumbaiSandwichPrice").textContent;
    itemPrice[key]=price;
};

let addMomoBurgerEl=document.getElementById("addMomoBurger");
addMomoBurgerEl.onclick=function(){
    let key=document.getElementById("MomoBurger").textContent;
    key=JSON.stringify(key);
    btnHandling(addMomoBurgerEl,key,false);
    let price=document.getElementById("momoBurgerPrice").textContent;
    itemPrice[key]=price;
};

let addCheeseBurgerEl=document.getElementById("addCheeseBurger");
addCheeseBurgerEl.onclick=function(){
    let key=document.getElementById("CheeseBurger").textContent;
    key=JSON.stringify(key);
    btnHandling(addCheeseBurgerEl,key,false);
    let price=document.getElementById("cheeseBurgerPrice").textContent;
    itemPrice[key]=price;
};

let addCottageCheeseBurgerEl=document.getElementById("addCottageCheeseBurger");
addCottageCheeseBurgerEl.onclick=function(){
    let key=document.getElementById("CottageCheeseBurger").textContent;
    key=JSON.stringify(key);
    btnHandling(addCottageCheeseBurgerEl,key,false);
    let price=document.getElementById("cottageCheeseBurgerPrice").textContent;
    itemPrice[key]=price;
};

let addAlooTikkiBurgerEl=document.getElementById("addAlooTikkiBurger");
addAlooTikkiBurgerEl.onclick=function(){
    let key=document.getElementById("AlooTikkiBurger").textContent;
    key=JSON.stringify(key);
    btnHandling(addAlooTikkiBurgerEl,key,false);
    let price=document.getElementById("alooTikkiBurgerPrice").textContent;
    itemPrice[key]=price;
};

let addPannerTikkiBurgerEl=document.getElementById("addPannerTikkiBurger");
addPannerTikkiBurgerEl.onclick=function(){
    let key=document.getElementById("PannerTikkiBurger").textContent;
    key=JSON.stringify(key);
    btnHandling(addPannerTikkiBurgerEl,key,false);
    let price=document.getElementById("pannerTikkiBurgerPrice").textContent;
    itemPrice[key]=price;
};

let addMargeritaPizzaEl=document.getElementById("addMargeritaPizza");
addMargeritaPizzaEl.onclick=function(){
    let key=document.getElementById("MargeritaPizza").textContent;
    key=JSON.stringify(key);
    btnHandling(addMargeritaPizzaEl,key,false);
    let price=document.getElementById("margeritaPizzaPrice").textContent;
    itemPrice[key]=price;
};

let addPaneerTikkaPizzaEl=document.getElementById("addPaneerTikkaPizza");
addPaneerTikkaPizzaEl.onclick=function(){
    let key=document.getElementById("PaneerTikkaPizza").textContent;
    key=JSON.stringify(key);
    btnHandling(addPaneerTikkaPizzaEl,key,false);
    let price=document.getElementById("paneerTikkaPizzaPrice").textContent;
    itemPrice[key]=price;
};

let addOnionPizzaEl=document.getElementById("addOnionPizza");
addOnionPizzaEl.onclick=function(){
    let key=document.getElementById("OnionPizza").textContent;
    key=JSON.stringify(key);
    btnHandling(addOnionPizzaEl,key,false);
    let price=document.getElementById("onionPizzaPrice").textContent;
    itemPrice[key]=price;
};

let addFarmHousePizzaEl=document.getElementById("addFarmHousePizza");
addFarmHousePizzaEl.onclick=function(){
    let key=document.getElementById("FarmHousePizza").textContent;
    key=JSON.stringify(key);
    btnHandling(addFarmHousePizzaEl,key,false);
    let price=document.getElementById("farmHousePizzaPrice").textContent;
    itemPrice[key]=price;
};

let addVegExtravaganzaPizzaEl=document.getElementById("addVegExtravaganzaPizza");
addVegExtravaganzaPizzaEl.onclick=function(){
    let key=document.getElementById("VegExtravaganzaPizza").textContent;
    key=JSON.stringify(key);
    btnHandling(addVegExtravaganzaPizzaEl,key,false);
    let price=document.getElementById("vegExtravaganzaPizzaPrice").textContent;
    itemPrice[key]=price;
};

let addHakkaNoodlesEl=document.getElementById("addHakkaNoodles");
addHakkaNoodlesEl.onclick=function(){
    let key=document.getElementById("HakkaNoodles").textContent;
    key=JSON.stringify(key);
    btnHandling(addHakkaNoodlesEl,key,false);
    let price=document.getElementById("hakkaNoodlesPrice").textContent;
    itemPrice[key]=price;
};

let addSchezwanNoodlesEl=document.getElementById("addSchezwanNoodles");
addSchezwanNoodlesEl.onclick=function(){
    let key=document.getElementById("SchezwanNoodles").textContent;
    key=JSON.stringify(key);
    btnHandling(addSchezwanNoodlesEl,key,false);
    let price=document.getElementById("schezwanNoodlesPrice").textContent;
    itemPrice[key]=price;
};

let addChowmeinEl=document.getElementById("addChowmein");
addChowmeinEl.onclick=function(){
    let key=document.getElementById("Chowmein").textContent;
    key=JSON.stringify(key);
    btnHandling(addChowmeinEl,key,false);
    let price=document.getElementById("chowmeinPrice").textContent;
    itemPrice[key]=price;
};

let addManchowSoupwithCrispyNoodlesEl=document.getElementById("addManchowSoupwithCrispyNoodles");
addManchowSoupwithCrispyNoodlesEl.onclick=function(){
    let key=document.getElementById("ManchowSoupwithCrispyNoodles").textContent;
    key=JSON.stringify(key);
    btnHandling(addManchowSoupwithCrispyNoodlesEl,key,false);
    let price=document.getElementById("manchowSoupwithCrispyNoodlesPrice").textContent;
    itemPrice[key]=price;
};

let addChilliGarlicNoodlesEl=document.getElementById("addChilliGarlicNoodles");
addChilliGarlicNoodlesEl.onclick=function(){
    let key=document.getElementById("ChilliGarlicNoodles").textContent;
    key=JSON.stringify(key);
    btnHandling(addChilliGarlicNoodlesEl,key,false);
    let price=document.getElementById("chilliGarlicNoodlesPrice").textContent;
    itemPrice[key]=price;
};

let addBurntGarlicNoodlesEl=document.getElementById("addBurntGarlicNoodles");
addBurntGarlicNoodlesEl.onclick=function(){
    let key=document.getElementById("BurntGarlicNoodles").textContent;
    key=JSON.stringify(key);
    btnHandling(addBurntGarlicNoodlesEl,key,false);
    let price=document.getElementById("burntGarlicNoodlesPrice").textContent;
    itemPrice[key]=price;
};

let addPannerTikkaSignatureWrapEl=document.getElementById("addPannerTikkaSignatureWrap");
addPannerTikkaSignatureWrapEl.onclick=function(){
    let key=document.getElementById("PannerTikkaSignatureWrap").textContent;
    key=JSON.stringify(key);
    btnHandling(addPannerTikkaSignatureWrapEl,key,false);
    let price=document.getElementById("pannerTikkaSignatureWrapPrice").textContent;
    itemPrice[key]=price;
};

let addCornandPeasSignatureWrapEl=document.getElementById("addCornandPeasSignatureWrap");
addCornandPeasSignatureWrapEl.onclick=function(){
    let key=document.getElementById("CornandPeasSignatureWrap").textContent;
    key=JSON.stringify(key);
    btnHandling(addCornandPeasSignatureWrapEl,key,false);
    let price=document.getElementById("cornandPeasSignatureWrapPrice").textContent;
    itemPrice[key]=price;
};

let addShammiKebabSignatureWrapEl=document.getElementById("addShammiKebabSignatureWrap");
addShammiKebabSignatureWrapEl.onclick=function(){
    let key=document.getElementById("ShammiKebabSignatureWrap").textContent;
    key=JSON.stringify(key);
    btnHandling(addShammiKebabSignatureWrapEl,key,false);
    let price=document.getElementById("shammiKebabSignatureWrapPrice").textContent;
    itemPrice[key]=price;
};

let addAlooPattySignatureWrapEl=document.getElementById("addAlooPattySignatureWrap");
addAlooPattySignatureWrapEl.onclick=function(){
    let key=document.getElementById("AlooPattySignatureWrap").textContent;
    key=JSON.stringify(key);
    btnHandling(addAlooPattySignatureWrapEl,key,false);
    let price=document.getElementById("alooPattySignatureWrapPrice").textContent;
    itemPrice[key]=price;
};

let addChilliBeanSignatureWrapEl=document.getElementById("addChilliBeanSignatureWrap");
addChilliBeanSignatureWrapEl.onclick=function(){
    let key=document.getElementById("ChilliBeanSignatureWrap").textContent;
    key=JSON.stringify(key);
    btnHandling(addChilliBeanSignatureWrapEl,key,false);
    let price=document.getElementById("chilliBeanSignatureWrapPrice").textContent;
    itemPrice[key]=price;
};

let addDeliteSignatureWrapEl=document.getElementById("addDeliteSignatureWrap");
addDeliteSignatureWrapEl.onclick=function(){
    let key=document.getElementById("DeliteSignatureWrap").textContent;
    key=JSON.stringify(key);
    btnHandling(addDeliteSignatureWrapEl,key,false);
    let price=document.getElementById("deliteSignatureWrapPrice").textContent;
    itemPrice[key]=price;
};

let addSteamedVegMomosEl=document.getElementById("addSteamedVegMomos");
addSteamedVegMomosEl.onclick=function(){
    let key=document.getElementById("SteamedVegMomos").textContent;
    key=JSON.stringify(key);
    btnHandling(addSteamedVegMomosEl,key,false);
    let price=document.getElementById("steamedVegMomosPrice").textContent;
    itemPrice[key]=price;
};

let addFriedMomoEl=document.getElementById("addFriedMomos");
addFriedMomoEl.onclick=function(){
    let key=document.getElementById("FriedMomos").textContent;
    key=JSON.stringify(key);
    btnHandling(addFriedMomoEl,key,false);
    let price=document.getElementById("friedMomosPrice").textContent;
    itemPrice[key]=price;
};

let addSchezwanPanFriedMomosEl=document.getElementById("addSchezwanPanFriedMomos");
addSchezwanPanFriedMomosEl.onclick=function(){
    let key=document.getElementById("SchezwanPanFriedMomos").textContent;
    key=JSON.stringify(key);
    btnHandling(addSchezwanPanFriedMomosEl,key,false);
    let price=document.getElementById("schezwanPanFriedMomosPrice").textContent;
    itemPrice[key]=price;
};

let addBarbequeFriedMomosEl=document.getElementById("addBarbequeFriedMomos");
addBarbequeFriedMomosEl.onclick=function(){
    let key=document.getElementById("BarbequeFriedMomos").textContent;
    key=JSON.stringify(key);
    btnHandling(addBarbequeFriedMomosEl,key,false);
    let price=document.getElementById("barbequeFriedMomosPrice").textContent;
    itemPrice[key]=price;
};

let addPaneerSchezwanFriedMomosEl=document.getElementById("addPaneerSchezwanFriedMomos");
addPaneerSchezwanFriedMomosEl.onclick=function(){
    let key=document.getElementById("PaneerSchezwanFriedMomos").textContent;
    key=JSON.stringify(key);
    btnHandling(addPaneerSchezwanFriedMomosEl,key,false);
    let price=document.getElementById("paneerSchezwanFriedMomosPrice").textContent;
    itemPrice[key]=price;
};

let addPaneerBarbequeFriedMomosEl=document.getElementById("addPaneerBarbequeFriedMomos");
addPaneerBarbequeFriedMomosEl.onclick=function(){
    let key=document.getElementById("PaneerBarbequeFriedMomos").textContent;
    key=JSON.stringify(key);
    btnHandling(addPaneerBarbequeFriedMomosEl,key,false);
    let price=document.getElementById("paneerBarbequeFriedMomosPrice").textContent;
    itemPrice[key]=price;
};

let addIdlyEl=document.getElementById("addIdly");
addIdlyEl.onclick=function(){
    let key=document.getElementById("Idly").textContent;
    key=JSON.stringify(key);
    btnHandling(addIdlyEl,key,false);
    let price=document.getElementById("idlyPrice").textContent;
    itemPrice[key]=price;
};

let addMasalaDosaEl=document.getElementById("addMasalaDosa");
addMasalaDosaEl.onclick=function(){
    let key=document.getElementById("MasalaDosa").textContent;
    key=JSON.stringify(key);
    btnHandling(addMasalaDosaEl,key,false);
    let price=document.getElementById("masalaDosaPrice").textContent;
    itemPrice[key]=price;
};

let addPooriMasalaEl=document.getElementById("addPooriMasala");
addPooriMasalaEl.onclick=function(){
    let key=document.getElementById("PooriMasala").textContent;
    key=JSON.stringify(key);
    btnHandling(addPooriMasalaEl,key,false);
    let price=document.getElementById("pooriMasalaPrice").textContent;
    itemPrice[key]=price;
};

let addTawaParathaandCurryEl=document.getElementById("addTawaParathaandCurry");
addTawaParathaandCurryEl.onclick=function(){
    let key=document.getElementById("TawaParathaandCurry").textContent;
    key=JSON.stringify(key);
    btnHandling(addTawaParathaandCurryEl,key,false);
    let price=document.getElementById("tawaParathaandCurryPrice").textContent;
    itemPrice[key]=price;
};

let addUpmaEl=document.getElementById("addUpma");
addUpmaEl.onclick=function(){
    let key=document.getElementById("Upma").textContent;
    key=JSON.stringify(key);
    btnHandling(addUpmaEl,key,false);
    let price=document.getElementById("upmaPrice").textContent;
    itemPrice[key]=price;
};

let addMixedDryFruitIcecreamEl=document.getElementById("addMixedDryFruitIcecream");
addMixedDryFruitIcecreamEl.onclick=function(){
    let key=document.getElementById("MixedDryFruitIcecream").textContent;
    key=JSON.stringify(key);
    btnHandling(addMixedDryFruitIcecreamEl,key,false);
    let price=document.getElementById("mixedDryFruitIcecreamPrice").textContent;
    itemPrice[key]=price;
};

let addTenderCoconutIcecreamEl=document.getElementById("addTenderCoconutIcecream");
addTenderCoconutIcecreamEl.onclick=function(){
    let key=document.getElementById("TenderCoconutIcecream").textContent;
    key=JSON.stringify(key);
    btnHandling(addTenderCoconutIcecreamEl,key,false);
    let price=document.getElementById("tenderCoconutIcecreamPrice").textContent;
    itemPrice[key]=price;
};

let addRoastedAlmondIcecreamEl=document.getElementById("addRoastedAlmondIcecream");
addRoastedAlmondIcecreamEl.onclick=function(){
    let key=document.getElementById("RoastedAlmondIcecream").textContent;
    key=JSON.stringify(key);
    btnHandling(addRoastedAlmondIcecreamEl,key,false);
    let price=document.getElementById("roastedAlmondIcecreamPrice").textContent;
    itemPrice[key]=price;
};

let addJackFruitIcecreamEl=document.getElementById("addJackFruitIcecream");
addJackFruitIcecreamEl.onclick=function(){
    let key=document.getElementById("JackFruitIcecream").textContent;
    key=JSON.stringify(key);
    btnHandling(addJackFruitIcecreamEl,key,false);
    let price=document.getElementById("jackFruitIcecreamPrice").textContent;
    itemPrice[key]=price;
};

let addChocoliciousIcecreamEl=document.getElementById("addChocoliciousIcecream");
addChocoliciousIcecreamEl.onclick=function(){
    let key=document.getElementById("ChocoliciousIcecream").textContent;
    key=JSON.stringify(key);
    btnHandling(addChocoliciousIcecreamEl,key,false);
    let price=document.getElementById("chocoliciousIcecreamPrice").textContent;
    itemPrice[key]=price;
};

let addBlackCurrentIcecreamEl=document.getElementById("addBlackCurrentIcecream");
addBlackCurrentIcecreamEl.onclick=function(){
    let key=document.getElementById("BlackCurrentIcecream").textContent;
    key=JSON.stringify(key);
    btnHandling(addBlackCurrentIcecreamEl,key,false);
    let price=document.getElementById("blackCurrentIcecreamPrice").textContent;
    itemPrice[key]=price;
};

let addRasmalaiEl=document.getElementById("addRasmalai");
addRasmalaiEl.onclick=function(){
    let key=document.getElementById("Rasmalai").textContent;
    key=JSON.stringify(key);
    btnHandling(addRasmalaiEl,key,false);
    let price=document.getElementById("rasmalaiPrice").textContent;
    itemPrice[key]=price;
};

let addKajuKatliEl=document.getElementById("addKajuKatli");
addKajuKatliEl.onclick=function(){
    let key=document.getElementById("KajuKatli").textContent;
    key=JSON.stringify(key);
    btnHandling(addKajuKatliEl,key,false);
    let price=document.getElementById("kajuKatliPrice").textContent;
    itemPrice[key]=price;
};

let addGulabJamunEl=document.getElementById("addGulabJamun");
addGulabJamunEl.onclick=function(){
    let key=document.getElementById("GulabJamun").textContent;
    key=JSON.stringify(key);
    btnHandling(addGulabJamunEl,key,false);
    let price=document.getElementById("gulabJamunPrice").textContent;
    itemPrice[key]=price;
};

let addMalaiKhajaEl=document.getElementById("addMalaiKhaja");
addMalaiKhajaEl.onclick=function(){
    let key=document.getElementById("MalaiKhaja").textContent;
    key=JSON.stringify(key);
    btnHandling(addMalaiKhajaEl,key,false);
    let price=document.getElementById("malaiKhajaPrice").textContent;
    itemPrice[key]=price;
};

let addChamchamEl=document.getElementById("addChamcham");
addChamchamEl.onclick=function(){
    let key=document.getElementById("Chamcham").textContent;
    key=JSON.stringify(key);
    btnHandling(addChamchamEl,key,false);
    let price=document.getElementById("chamchamPrice").textContent;
    itemPrice[key]=price;
};

let addJangriEl=document.getElementById("addJangri");
addJangriEl.onclick=function(){
    let key=document.getElementById("Jangri").textContent;
    key=JSON.stringify(key);
    btnHandling(addJangriEl,key,false);
    let price=document.getElementById("jangriPrice").textContent;
    itemPrice[key]=price;
};

let addArisaluEl=document.getElementById("addArisalu");
addArisaluEl.onclick=function(){
    let key=document.getElementById("Arisalu").textContent;
    key=JSON.stringify(key);
    btnHandling(addArisaluEl,key,false);
    let price=document.getElementById("arisaluPrice").textContent;
    itemPrice[key]=price;
};

let addChakaluEl=document.getElementById("addChakalu");
addChakaluEl.onclick=function(){
    let key=document.getElementById("Chakalu").textContent;
    key=JSON.stringify(key);
    btnHandling(addChakaluEl,key,false);
    let price=document.getElementById("chakaluPrice").textContent;
    itemPrice[key]=price;
};

let addAkuPakodiEl=document.getElementById("addAkuPakodi");
addAkuPakodiEl.onclick=function(){
    let key=document.getElementById("AkuPakodi").textContent;
    key=JSON.stringify(key);
    btnHandling(addAkuPakodiEl,key,false);
    let price=document.getElementById("akuPakodiPrice").textContent;
    itemPrice[key]=price;
};

let addKobariBureluEl=document.getElementById("addKobariBurelu");
addKobariBureluEl.onclick=function(){
    let key=document.getElementById("KobariBurelu").textContent;
    key=JSON.stringify(key);
    btnHandling(addKobariBureluEl,key,false);
    let price=document.getElementById("kobariBureluPrice").textContent;
    itemPrice[key]=price;
};

let addKaramPusaEl=document.getElementById("addKaramPusa");
addKaramPusaEl.onclick=function(){
    let key=document.getElementById("KaramPusa").textContent;
    key=JSON.stringify(key);
    btnHandling(addKaramPusaEl,key,false);
    let price=document.getElementById("karamPusaPrice").textContent;
    itemPrice[key]=price;
};

let addGavalluEl=document.getElementById("addGavallu");
addGavalluEl.onclick=function(){
    let key=document.getElementById("Gavallu").textContent;
    key=JSON.stringify(key);
    btnHandling(addGavalluEl,key,false);
    let price=document.getElementById("gavalluPrice").textContent;
    itemPrice[key]=price;
};

let viewCartBtnEl=document.getElementById("viewCartBtn");
let keysArray=null;
let viewCartInfoEl=null;
let intervalId=null;
let ulEl=null;
let bill=0;
viewCartBtnEl.onclick=function(){
    let viewCartWindowEl=document.getElementById("viewCartWindow");
    viewCartWindowEl.classList.remove("d-none");
    let completeMenuEl=document.getElementById("completeMenu");
    completeMenuEl.classList.add("d-none");

    viewCartInfoEl=document.getElementById("viewCartInfo");
    if(ulEl !== null)
    {
        viewCartInfoEl.removeChild(ulEl);
    }
    ulEl=document.createElement("ul");
    ulEl.id="finalList";
    viewCartInfoEl.appendChild(ulEl);
    keysArray=Object.keys(selectedItem);
    //console.log(selectedItem);
    //console.log(keysArray);
    for(let item of keysArray){
        let liEl=document.createElement("li");
        liEl.id=item+"liId";
        liEl.style.color="white";
        liEl.classList.add("d-flex","flex-row","justify-content-between","mr-5");
        ulEl.appendChild(liEl);
        let div1=document.createElement("div");
        liEl.appendChild(div1);
        let itemEl=document.createElement("p");
        itemEl.textContent=JSON.parse(item);
        itemEl.classList.add("p-1");
        div1.appendChild(itemEl);
        let editEl=document.createElement("button");
        editEl.textContent="Customize";
        editEl.classList.add("editBtn");
        editEl.id="Edit"
        editEl.onclick=function(){
            editEl.classList.add("d-none");
            CustomizeInput(editEl,item,div1);
        };
        div1.appendChild(editEl);
        let div2=document.createElement("div");
        liEl.appendChild(div2);
        let btnEl=document.createElement("button");
        btnEl.textContent="Add";
        btnEl.classList.add("addItemBtn");
        btnHandling(btnEl,item,true);
        div2.appendChild(btnEl);
        let priceEl=document.createElement("p");
        priceEl.id="latestPrice"+item;
        priceEl.textContent=parseInt(selectedItem[item])*parseInt(itemPrice[item]);
        bill+=parseInt(priceEl.textContent);
        console.log("***********",parseInt(selectedItem[item]));
        console.log("***********",parseInt(itemPrice[item]));
        div2.appendChild(priceEl);
        intervalId=setInterval(updateItemFunction,100);
        //console.log(selectedItem[item]);
        //console.log(selectedItem.item);
    }
    let liEl=document.createElement("li");
    liEl.style.color="red";
    ulEl.appendChild(liEl);
    let btnEl=document.createElement("button");
    btnEl.textContent="Add more items";
    btnEl.classList.add("addMoreItemBtn");
    btnEl.onclick=function(){
        let viewCartWindowEl=document.getElementById("viewCartWindow");
        viewCartWindowEl.classList.add("d-none");
        let completeMenuEl=document.getElementById("completeMenu");
        completeMenuEl.classList.remove("d-none");
        clearInterval(intervalId);
    }
    liEl.appendChild(btnEl);

    let DelTimeliEl=document.createElement("li");
    ulEl.appendChild(DelTimeliEl);
    let delTimeEl=document.createElement("p");
    delTimeEl.textContent="Delivery in 45-50 mins";
    delTimeEl.classList.add("text-center");
    DelTimeliEl.appendChild(delTimeEl);
    let totalBillEl=document.createElement("p");
    totalBillEl.textContent="Total Bill"
    totalBillEl.classList.add("text-center");
    DelTimeliEl.appendChild(totalBillEl);
    let billValueEl=document.createElement("p");
    billValueEl.classList.add("text-center");
    billValueEl.id="bill"
    billValueEl.textContent=bill;
    DelTimeliEl.appendChild(billValueEl);
    let modeEl=document.createElement("p");
    modeEl.classList.add("text-center");
    modeEl.textContent="Payment Mode: Cash On Delivery";
    DelTimeliEl.appendChild(modeEl);
    let br1El=document.createElement("br");
    DelTimeliEl.appendChild(br1El);
    let br2El=document.createElement("br");
    DelTimeliEl.appendChild(br2El);
    let br3El=document.createElement("br");
    DelTimeliEl.appendChild(br3El);
};

let addressBtnEl=document.getElementById("addressBtn");
addressBtnEl.onclick=function(){
    let viewCartWindowEl=document.getElementById("viewCartWindow");
    viewCartWindowEl.classList.add("d-none");
    let AddressWindowEl=document.getElementById("AddressWindow");
    AddressWindowEl.classList.remove("d-none");
}

function checknumber(event){
    let value=(event.key);
    let ascii=value.charCodeAt(0);
    console.log(value,ascii);
    let mobilenoEl= document.getElementById("mobileNumber");
    if((ascii<58) && (ascii>47)){
        let data=mobilenoEl.value;
        console.log(data.length);
        if(data.length>=10){
            alert("Please enter your 10-digit phone number 1");
            mobilenoEl.value="";
        }
    }
    else{
        alert("Please enter your 10-digit phone number 2");
        mobilenoEl.value="";
    }

}
let mobilenoEl= document.getElementById("mobileNumber");
mobilenoEl.addEventListener("keydown",checknumber);

let addressBackEl=document.getElementById("AddressBack");
addressBackEl.onclick=function(){
    let viewCartWindowEl=document.getElementById("viewCartWindow");
    viewCartWindowEl.classList.remove("d-none");
    let AddressWindowEl=document.getElementById("AddressWindow");
    AddressWindowEl.classList.add("d-none");
};

let addressContinueEl=document.getElementById("AddressContinue");
addressContinueEl.onclick=function(){
    let nameEl=document.getElementById("name");
    let mobileNumberEl=document.getElementById("mobileNumber");
    let addressEl=document.getElementById("address");
    if(nameEl.value===""){
        alert("Please enter a valid name");
    }
    else if((mobileNumberEl.value==="")/*||(mobileNumberEl.length<9)*/){
        alert("Please enter your 10-digit Mobile Number 3");
    }
    else if(addressEl.value===""){
        alert("Please enter Address");
    }
    else{
        let AddressWindowEl=document.getElementById("AddressWindow");
        AddressWindowEl.classList.add("d-none");
        let ThankYouWindowEl=document.getElementById("ThankYouWindow");
        ThankYouWindowEl.classList.remove("d-none");
    }

};

