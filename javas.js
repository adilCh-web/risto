

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
  

        letmyArray = [timing,invest,returnmoney,returnmoney -invest]
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
    let totalInvest=0;totalReturn=0;avgProfit=0
    var tInvest = document.getElementsByClassName("class_1");
    var tReturn = document.getElementsByClassName("class_2");
    var tProfit = document.getElementsByClassName("class_3");
    for (var i =0; i <tInvest.length; i++) 
    {
    totalInvest=totalInvest + Number(tInvest[i].innerHTML)
    totalReturn=totalReturn + Number(tReturn[i].innerHTML)
    avgProfit=avgProfit + Number(tProfit[i].innerHTML)
    }
    avgProfit=avgProfit/tProfit.length
    document.getElementById("tInvest").innerHTML="£"+totalInvest
    document.getElementById("tReturn").innerHTML="£"+totalReturn
    document.getElementById("avgProfit").innerHTML="£"+avgProfit

}