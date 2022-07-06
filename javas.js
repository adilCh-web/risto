

let submit = document.getElementById("s")

let dataTable = document.getElementById("data")
submit.addEventListener("click",submitting)



function submitting()
{
    var currentTime = new Date()
    var timing= currentTime.toTimeString().slice(0,5)
    let returnmoney = document.getElementById("return").value
    let invest = document.getElementById("invest").value
    if(returnmoney!=="" && invest!=="")
    {
  
        let profitPercentage = 100*(returnmoney -invest)/invest

        if(profitPercentage - Math.floor(profitPercentage) !== 0)
        {
            profitPercentage=profitPercentage.toFixed(2)
        }

        letmyArray = [timing,invest,returnmoney,profitPercentage+"%"]
        let row= document.createElement("tr")
        dataTable.appendChild(row)
        for(let i=0;i<4;i++)
        {
            let td=document.createElement("td")
            td.textContent=letmyArray[i]
            td.className = "class_"+i
            row.appendChild(td)

        }
    }
    document.getElementById("invest").value = ""
    document.getElementById("return").value = ""

    updateData()
    

}


function updateData()
{
    let totalInvest=0;totalReturn=0;avgProfit=0;totalProfit=0;
    var tInvest = document.getElementsByClassName("class_1");
    var tReturn = document.getElementsByClassName("class_2");
    var tProfit = document.getElementsByClassName("class_3");
    for (var i =0; i <tInvest.length; i++) 
    {
    totalInvest=totalInvest + Number(tInvest[i].innerHTML)
    totalReturn=totalReturn + Number(tReturn[i].innerHTML)
    avgProfit=avgProfit + Number(tProfit[i].innerHTML.replace("%",""))
    totalProfit = totalProfit + Number(tReturn[i].innerHTML)-Number(tInvest[i].innerHTML)
    }
    avgProfit=avgProfit/tProfit.length
    document.getElementById("tInvest").innerHTML="£"+totalInvest
    document.getElementById("tReturn").innerHTML="£"+totalReturn
    if(avgProfit - Math.floor(avgProfit) !== 0)
    {
        document.getElementById("avgProfit").innerHTML=avgProfit.toFixed(2)+"%"
    }
    else
    {
    document.getElementById("avgProfit").innerHTML=avgProfit+"%"
    }
    if(avgProfit <0)
    {
        document.getElementById("avgProfit").style.color="red"
    }
    else
    {
        document.getElementById("avgProfit").style.color="green"
    }

    document.getElementById("totalProfit").innerHTML="£"+totalProfit
    if(totalProfit>0)
    {
        document.getElementById("totalProfit").style.color="green"
    }
    else if(totalProfit<0)
    {
        document.getElementById("totalProfit").style.color="red"
    }
        

}