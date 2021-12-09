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
var targetScrollY;
var lastPage;
var MainDiv;

var UpArrow;
var DownArrow;
var LeftArrow;
var RightArrow;


class Page
{
    constructor(x, y, div)
    {
        console.log("x: " +  x + " y: " + y);
        this.x = x;
        this.y = y;
        this.RealX = Number(this.x * MainDiv.clientWidth);
        this.RealY = this.y * MainDiv.clientHeight;
        this.div = div;
    }

    Refresh()
    {
        this.div.style.left = (this.x * MainDiv.clientWidth) + "px";
        this.div.style.top = (this.y * MainDiv.clientHeight) + "px";
        this.RealX = this.x * MainDiv.clientWidth;
        this.RealY = this.y * MainDiv.clientHeight;
    }
}

Init();
setInterval(Update, 1);

function Init()
{

    //Getting DOM elemnts
    MainDiv = document.getElementById("Presentation");
    var divs = document.getElementsByTagName("div");
    LeftArrow = document.getElementById("Left");
    RightArrow = document.getElementById("Right");
    UpArrow = document.getElementById("Up");
    DownArrow = document.getElementById("Down");

    //Loading Pages
    var StartPage;
    for (let i = 0; i < divs.length; i++) 
    {
        if(divs[i].classList.contains("page"))
        {
            var position = divs[i].id.split("-");
            
            pages.push(new Page(position[0].substring(1), position[1], divs[i]));
            if(divs[i].classList.contains("startingPage"))
            {
                StartPage = pages[pages.length - 1];
            }
        }
    }

    //Adding EventListeners
    DownArrow.addEventListener("click", function () {SwitchPage("ArrowDown");});
    UpArrow.addEventListener("click", function () {SwitchPage("ArrowUp");});
    LeftArrow.addEventListener("click", function () {SwitchPage("ArrowLeft");});
    RightArrow.addEventListener("click", function () {SwitchPage("ArrowRight");});
    window.addEventListener("resize", RefreshPages);


    //Init variables
    targetPage = StartPage;
    targetScrollX = StartPage.RealX;
    targetScrollY = StartPage.RealY;

    //Calling Refresh Methods
    RefreshPages();
    UpdateArrows();
}


// Swiping
document.addEventListener('swiped', function(e) 
{
    if(MainDiv.contains(e.target))
    {
        if(e.detail.dir == "down") SwitchPage("ArrowUp");
        if(e.detail.dir == "up") SwitchPage("ArrowDown");
        if(e.detail.dir == "right") SwitchPage("ArrowLeft");
        if(e.detail.dir == "left") SwitchPage("ArrowRight");
    }
});


function OnKeyDown(e)
{
    SwitchPage(e.code);
}

function SwitchPage(Code)
{
    if(Code == "ArrowRight")
    {
        if(GetPage(Number(targetPage.x) +1, targetPage.y) != null)
        {
            ChangePage(GetPage(Number(targetPage.x) +1 ,Number(targetPage.y)));
            return;
        }
    }
    if(Code == "ArrowLeft")
    {
        if(GetPage(Number(targetPage.x) -1, targetPage.y) != null)
        {
            ChangePage(GetPage(Number(targetPage.x) -1 , Number(targetPage.y)));
            return;
        }
    }
    if(Code == "ArrowDown")
    {
        if(GetPage(Number(targetPage.x), Number(targetPage.y) +1) != null)
        {
            ChangePage(GetPage(Number(targetPage.x), Number(targetPage.y) +1));
            return;
        }
    }
    if(Code == "ArrowUp")
    {
        if(GetPage(Number(targetPage.x), Number(targetPage.y) -1) != null)
        {
            ChangePage(GetPage(Number(targetPage.x), Number(targetPage.y) -1));
            return;
        }
    }
}

function ChangePage(page)
{
    targetPage = page;
    UpdateArrows();
}

function UpdateArrows()
{
    console.log("jess");
    if(GetPage(Number(targetPage.x) + 1, Number(targetPage.y)) != null) RightArrow.style.display = "block";
    else RightArrow.style.display = "none";
    if(GetPage(Number(targetPage.x) -1, Number(targetPage.y)) != null) LeftArrow.style.display = "block";
    else LeftArrow.style.display = "none";
    if(GetPage(Number(targetPage.x), Number(targetPage.y) - 1) != null) UpArrow.style.display = "block";
    else UpArrow.style.display = "none";
    if(GetPage(Number(targetPage.x), Number(targetPage.y) + 1) != null) DownArrow.style.display = "block";
    else DownArrow.style.display = "none";
        
    

}

function GetPage(x,y)
{
    for (let i = 0; i < pages.length; i++) 
    {
        if(pages[i].x == x && pages[i].y == y)
        {
            return pages[i];
        }
    }
}

function Update()
{
    if(targetScrollX != targetPage.RealX)
    {
        targetScrollX = Lerp(targetScrollX, targetPage.RealX, 0.02);
        if(Math.abs(targetScrollX - targetPage.RealX) < 0.5)
        {
            targetScrollX = targetPage.RealX;
        }
    }
    if(targetScrollY != targetPage.RealY)
    {
        targetScrollY = Lerp(targetScrollY, targetPage.RealY, 0.02);
        if(Math.abs(targetScrollY - targetPage.RealY) < 0.5)
        {
            targetScrollY = targetPage.RealY;
        }
    }
    if(targetPage != null)
    {
        MainDiv.scroll(targetScrollX , targetScrollY);
    }
}

function Lerp(start, end, t)
{
    return start + (end - start) * t; 
}

function RefreshPages()
{
    for (let i = 0; i < pages.length; i++) 
    {
        pages[i].Refresh();
    }
    targetScrollX = targetPage.RealX;
    targetScrollY = targetPage.RealY;
}


