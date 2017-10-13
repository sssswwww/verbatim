(function(window,$){

    var createAudio = (function(){
        var audio;
        return function(url){
            if(!audio){
                audio = new Audio(url);
                audio.loop = true;
            }
            return audio;
        }
    })()

    function Verbatim(option){
        this.init(option);
        this.verbatim();
    }
    Verbatim.prototype = {
        defaultOption:{
            verbatimContainer:null,
            repeatTimes:1,
            alreadyRepeatTimes:0,
            fn:null,
            html:'',
            interval:80,
            mp3Url:'http://data.huiyi8.com/2014/xll/03/31/1466.mp3'
        },
        init:function(option){
            this.option = $.extend({},this.defaultOption,option||{});
        },
        verbatim:function(){
            var verbatimContainer = $(this.option.verbatimContainer),
                repeatTimes = this.option.repeatTimes,
                alreadyRepeatTimes = this.option.alreadyRepeatTimes,
                fn = this.option.fn,
                html = this.option.html,
                interval = this.option.interval,
                mp3Url = this.option.mp3Url,
                index = 0,
                self = this;
            var audio = createAudio(mp3Url);
                audio.play();
            var timer = setInterval(function(){
                if(index == html.length){
                    clearInterval(timer);
                    audio.pause();
                    self.option.alreadyRepeatTimes++;
                    if(self.option.alreadyRepeatTimes < repeatTimes){
                        self.verbatim();
                    }else{
                        fn&&fn();
                    }
                }else{
                    if(html.slice(index,index+1) == '<'){
                        index = html.indexOf('>',index) + 1;
                    }else{
                        index++;
                    }
                    var str = html.slice(0,index);
                    if(index < html.length){
                        str += (index&1?'_':'');
                    }
                    // console.log(str)
                    verbatimContainer.html(str);
                }
            },interval)
        }
    }
    window.Verbatim = Verbatim;
})(window,jQuery)