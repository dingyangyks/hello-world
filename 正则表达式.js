 var txt = ["55sasasa454","55sasasa454dsafsafdsa","s 0jjdjjjjrfsafasftyrtgr","5dd55awgawjjjgwg","55jjrtysasasartgr","5d2352","5543","751706311@.com","8s7654safas874fsa4a4","你是个傻逼",
            "即时比分ifhoqh5"];
        
        var reg = /^([\u4E00-\u9FA5]){4}.*\d$/;//匹配汉字
        var reg1 = /\d/g;
        function matched(txt, reg) {
            for (var i = 0; i < txt.length; i++) {
                if (reg.test(txt[i])) {
                    console.log(txt[i]);
                    // console.log(reg.exec(txt[i]));
                    // console.log(reg.lastIndex);
                }
            }
        }
        var reg2 = /FA1?$/g
        var str = "aSFA111111111FA";
        console.log(reg2.test(str))
        var str1 = str.replace(/FA1?$/g,"xty ($$)");
        console.log(str1);
        matched(txt, reg);
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        // matched(txt, reg1);
        // console.log(reg.test(txt));
        // console.log(txt.match(reg));
        // alert(reg.exec(txt))
        // if(reg.test(txt)){
        //     console.log(txt)
        // }

        // http://www.jb51.net/article/73342.htm
