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
}
Character.prototype = {
    constructor : Character,
    init : function(){
        const that = this;
        window.addEventListener('scroll',function(){
            clearTimeout(that.scrollState);
            if(!that.scrollState){
                that.mainElem.classList.add('running');
                console.log('running 클래스 붙음');
            }
            that.scrollState = setTimeout(function(){
                that.scrollState = false;
                that.mainElem.classList.remove('running');
                // console.log('running 클래스 제거');
            },500);
            // console.log('lastScrollTop : ' + that.lastScrollTop);
            // console.log('pageYOffset : ' + pageYOffset);

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
        window.addEventListener('keydown',function(e){});
    }
}