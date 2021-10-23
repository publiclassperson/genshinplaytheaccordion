var a = `qadg q tadg t yafh y tadg 
rafh r eadg e wmsg w qadg tadg t rafh r eadg e wmsg tadg t rafh r eadg w e r eadg wmsg
az c ab c gz c gb c hz v hn v gz c v c z fv z dc b dc sm x sb x az c b c 
gz c gb c fz v fn v dz c db c sm x b x gz c gb c fz v fn v dz sc db fn db sm xb
qa d qg d ta d ya f yh f ta d g d rafh rafh eadg eadg wmsg wmsg azcb 
`


var newstr="qwertyu asdfghj zxcvbnm"
var oldstr="qwertyu asdfghj zxcvbnm"
var target = ""
var b = a.split(/[(\r\n)\r\n]/)
console.log(b)
b.forEach(item=>{
    let b_1 = item.split(" ")
    b_1.forEach(item2=>{
        // let b_2 = item2.split("")
        // b_2.forEach((item3,index)=>{
        //     if(index==b_2.length-1){
        //         target +=newstr[oldstr.indexOf(item3)]+",__\r\n"
        
        //     }else{
        //         target +=newstr[oldstr.indexOf(item3)]+",_\r\n"
        
        //     }
        //     })

        target += item2+",__\r\n"

        


        // target+="\r\n"

    })
})
console.log(target)