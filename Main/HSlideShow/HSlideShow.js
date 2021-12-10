/*!
 * HSlideShow.js
 * Small js script for WebPresentation
 * https://github.com/MatyasHarvanek04/HSlideShow
 * @inspiration https://revealjs.com/
 * @author Matyáš Harvánek 
 * @author Martin Álló
 * @author Jakub Holán
 * Swiping provided by: John Doherty <www.johndoherty.info>
 * https://github.com/john-doherty/swiped-events
 * @license MIT
 */

var pages = [];
var targetHorizontalScroll = 0;
var targetPage;
var targetScrollX;
var lastPage;
var MainDiv;

var LeftArrow;
var RightArrow;


class Page {
    constructor(x, y, div) {
        console.log("x: " + x + " y: " + y);
        this.x = x;
        this.y = y;
        this.RealX = Number(this.x * MainDiv.clientWidth);
        this.RealY = this.y * MainDiv.clientHeight;
        this.div = div;
    }

    Refresh() {
        this.div.style.left = (this.x * MainDiv.clientWidth) + "px";
        this.div.style.top = (this.y * MainDiv.clientHeight) + "px";
        this.RealX = this.x * MainDiv.clientWidth;
        this.RealY = this.y * MainDiv.clientHeight;
    }
}

Init();
setInterval(Update, 1);
setInterval(() => {
    SwitchPage("ArrowRight")
}, 5000);

function Init() {

    //Getting DOM elemnts
    MainDiv = document.getElementById("Presentation");
    var divs = document.getElementsByTagName("div");
    LeftArrow = document.getElementById("Left");
    RightArrow = document.getElementById("Right");
    UpArrow = document.getElementById("Up");
    DownArrow = document.getElementById("Down");

    //Loading Pages
    var StartPage;
    for (let i = 0; i < divs.length; i++) {
        if (divs[i].classList.contains("page")) {
            var position = divs[i].id.split("-");

            pages.push(new Page(position[0].substring(1), position[1], divs[i]));
            if (divs[i].classList.contains("startingPage")) {
                StartPage = pages[pages.length - 1];
            }
        }
    }

    //Adding EventListeners
    LeftArrow.addEventListener("click", function() { SwitchPage("ArrowLeft"); });
    RightArrow.addEventListener("click", function() { SwitchPage("ArrowRight"); });
    window.addEventListener("resize", RefreshPages);


    //Init variables
    targetPage = StartPage;
    targetScrollX = StartPage.RealX;

    //Calling Refresh Methods
    RefreshPages();
}


// Swiping
document.addEventListener('swiped', function(e) {
    if (MainDiv.contains(e.target)) {
        if (e.detail.dir == "right") SwitchPage("ArrowLeft");
        if (e.detail.dir == "left") SwitchPage("ArrowRight");
    }
});


function OnKeyDown(e) {
    SwitchPage(e.code);
}

function SwitchPage(Code) {
    if (Code == "ArrowRight") {
        if (GetPage(Number(targetPage.x) + 1, targetPage.y) != null) {
            ChangePage(GetPage(Number(targetPage.x) + 1, Number(targetPage.y)));
            return;
        }
    }
    if (Code == "ArrowLeft") {
        if (GetPage(Number(targetPage.x) - 1, targetPage.y) != null) {
            ChangePage(GetPage(Number(targetPage.x) - 1, Number(targetPage.y)));
            return;
        }
    }
}

function ChangePage(page) {
    targetPage = page;
}


function GetPage(x) {
    if (x == pages.length) {
        return pages[0];
    }
    if (x == -1) {
        return pages[pages.length - 1];
    }

    for (let i = 0; i < pages.length; i++) {
        if (pages[i].x == x) {
            return pages[i];
        }
    }
}

function Update() {
    if (targetScrollX != targetPage.RealX) {
        targetScrollX = Lerp(targetScrollX, targetPage.RealX, 0.02);
        if (Math.abs(targetScrollX - targetPage.RealX) < 0.5) {
            targetScrollX = targetPage.RealX;
        }
    }
    if (targetPage != null) {
        MainDiv.scroll(targetScrollX, 0);
    }
}

function Lerp(start, end, t) {
    return start + (end - start) * t;
}

function RefreshPages() {
    for (let i = 0; i < pages.length; i++) {
        pages[i].Refresh();
    }
    targetScrollX = targetPage.RealX;
}