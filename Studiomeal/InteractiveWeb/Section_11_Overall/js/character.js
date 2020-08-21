function Character(info){   // 생성자니까 함수명 대문자로 시작
    this.mainElem = document.createElement('div');
    this.mainElem.classList.add('character');
    this.mainElem.innerHTML=''
        + '<div class="character-face-con character-head">'
            + '<div class="character-face character-head-face face-front"></div>'
            + '<div class="character-face character-head-face face-back"></div>'
        + '</div>'
        + '<div class="character-face-con character-torso">'
            + '<div class="character-face character-torso-face face-front"></div>'
            + '<div class="character-face character-torso-face face-back"></div>'
        + '</div>'
        + '<div class="character-face-con character-arm character-arm-right">'
            + '<div class="character-face character-arm-face face-front"></div>'
            + '<div class="character-face character-arm-face face-back"></div>'
        + '</div>'
        + '<div class="character-face-con character-arm character-arm-left">'
            + '<div class="character-face character-arm-face face-front"></div>'
            + '<div class="character-face character-arm-face face-back"></div>'
        + '</div>'
        + '<div class="character-face-con character-leg character-leg-right">'
            + '<div class="character-face character-leg-face face-front"></div>'
            + '<div class="character-face character-leg-face face-back"></div>'
        + '</div>'
        + '<div class="character-face-con character-leg character-leg-left">'
            + '<div class="character-face character-leg-face face-front"></div>'
            + '<div class="character-face character-leg-face face-back"></div>'
        + '</div>';
    document.querySelector('.stage').appendChild(this.mainElem);
    this.mainElem.style.left = info.xPos + '%';
    this.init();
    this.scrollState = false;
    // 바로 이전(마지막) 스크롤 위치
    this.lastScrollTop = 0;
    this.xPos = info.xPos;
    this.direction;
    this.speed = 0.3;
    // 좌우 이동 중인지 아닌지
    this.runningState = false;
    this.rafId;
}
Character.prototype = {
    constructor : Character,
    init : function(){
        const that = this;
        window.addEventListener('scroll',function(){
            clearTimeout(that.scrollState);
            if(!that.scrollState){
                that.mainElem.classList.add('running');
                // console.log('running 클래스 붙음');
            }
            that.scrollState = setTimeout(function(){
                that.scrollState = false;
                that.mainElem.classList.remove('running');
                // console.log('running 클래스 제거');
            },500);

            // 이전 스크롤 위치와 현재 스크롤 위치를 비교
            if(that.lastScrollTop>pageYOffset){
                // 이전 스크롤 위치가 크다면 : 스크롤 올림
                that.mainElem.setAttribute('data-diraction','backward');
            }else{
                // 현재 스크롤 위치가 크다면 : 스크롤 내림
                that.mainElem.setAttribute('data-diraction','forward');
            }
            that.lastScrollTop = pageYOffset;
        });
        window.addEventListener('keydown',function(e){
            if(that.runningState) return;
            console.log('키다운');
            if(e.keyCode == 37){
                that.direction = 'left';
                that.mainElem.setAttribute('data-diraction','left');
                that.mainElem.classList.add('running');
                that.run(that);
                that.runningState = true;
            }else if(e.keyCode == 39){
                that.direction = 'right';
                that.mainElem.setAttribute('data-diraction','right');
                that.mainElem.classList.add('running');
                that.run(that);
                that.runningState = true;
            }
        });
        window.addEventListener('keyup',function(e){
            that.mainElem.classList.remove('running');
            cancelAnimationFrame(that.rafId);
            that.runningState = false;
            console.log(that.runningState);
        });
    },
    run : function(that){
        console.log(that.xPos)
        if(that.direction == 'left'){
            that.xPos -= that.speed;
            // that.zPos = that.xPos - that.speed;
        }
        else if(that.direction == 'right'){
            that.xPos += that.speed;
            // that.zPos = that.xPos + that.speed;
        }
        // if(that.xPos <= 2 || that.xPos >= 88) return;
        if(that.xPos <= 2){
            that.xPos = 2;
        }else if(that.xPos >= 88){
            that.xPos = 88;
        }
        that.mainElem.style.left = that.xPos + '%';
        that.rafId = requestAnimationFrame(function(){
            that.run(that)
        });
    }
}