window.onload = function () {
    var bodyHeight = document.documentElement.clientHeight;
    var muBiao1 = my$('target').children[0].children[0];
    var muBiao2 = my$('target').children[0].children[0].children[0];
    var bodyWidth = document.documentElement.clientWidth;
    var numAni = 1;
    my$('body').style.height = bodyHeight + 'px';
    var jingTouWidthCopy;
    var arr = ["王震烁", "许世豪","张家庚", "尚晶晶", "付婷婷", "王超", "李家浩", "邱双",
        "肖央", "高盛睿", "钟惠东", "李永泽", "刘智添", "黄艳晶", "刘聪", "冯紫丹", "王冬阳", "刘嘉印"
        , "李雷明", "王成文", "靳军锋", "李雪梅", "乔建", "付金彪", "杜宝强", "黄蕾蕾", "李慎业", "燕灿"
        , "滑松松", "张子健", "张强", "乔永冉", "康蜀东", "赵东晨", "张梦珂", "范雪洁", "贾晓宁", "邓琦"
        , "牛晓妮", "张岩", "马鑫景", "陈家强", "汪帅", "庞雨桐","李祖鹏","刘超","孔蕾蕾","王晓丙","刘超","霍钊","朱敬隆","李志童","陈友琪","郑志豪","徐菁昭","徐文文","冯成功","刘岂鑫","杨达"
    ];

    //取到装数据的ul元素
    var oContUl = my$('content').getElementsByClassName('contUl')[0];
    //定义一个变量 用来存储选择的目标
    var random = 0;
    //遍历数组 创建li元素 并添加数据
    for (var i = 0; i < arr.length; i++) {
        var oContLi = document.createElement('li');
        // oContLi.innerHTML = arr[i];
        oContUl.appendChild(oContLi);
        var oContLiPic = document.createElement('div');
        oContLi.appendChild(oContLiPic);
    }
    //开始按钮点击
    var abtnA = my$('btn').children[0];
    abtnA.onclick = function () {
        //移动 开始父元素
        movePos(my$('btn'),0,-200,'bottom',5,function () {
            setTimeout(function () {
                //开始父元素 移动后 移动 遮挡层shade
                movePos(my$('shade'),0,-bodyHeight,'top',10)
            },500);
        });
        return false;
    };

    //获取镜头元素
    var jingTou = my$('target').children[0];

    //点名按钮点击
    var dianMingBtn = my$('dianMing').children[0];
    dianMingBtn.onclick = function () {
        jingTou.style.width = bodyWidth + 'px';
        jingTou.style.backgroundPosition = 'center';
        //移动 点名父元素 隐藏
        movePos(my$('dianMing'),0,-200,'bottom',5,function () {
            //0.5秒后 执行下一步
            setTimeout(function () {
                my$('target').style.display = 'block';
                //镜头宽度
                var jingTouWidth = jingTou.offsetWidth;
                jingTou.style.backgroundSize = jingTouWidth +'px';
                //改变镜头的大小
                jingMove(jingTouWidth,function () {
                    //回调函数 呼出选择父元素
                    movePos(my$('select'),-200,0,'bottom',-5,function () {
                        //循环移动镜头
                        jingMove2();
                    });
                });
            },500);


        });
    };

    //点击选择按钮
    var chooseObj = my$('select').children[0];
    chooseObj.onclick = function () {
    //选择按钮的父元素 淡出 且隐藏
    animate(my$('select'),{'opacity':0},function () {
        my$('select').style.display = 'none';
    });
    //清除 循环移动镜头的 定时器
    clearInterval(jingTou.move2);
    //调用函数 镜头选择目标
    jingTouMove3(function () {
        //一次性定时器 0.5秒后呼出 瞄准星
        setTimeout(function () {
            //改变准星透明度 让它显示出来
            animate(muBiao2,{'opacity':1});
            animate(muBiao1,{'opacity':1},function () {
                //控制镜头父元素的透明度 让它隐藏
                var muBiaoDivLeft = oContUl.children[random].offsetLeft + my$('content').offsetLeft - 10;
                var muBiaoDivTop = oContUl.children[random].offsetTop + my$('content').offsetTop - 10;
                animate(my$('target'),{'opacity':0},function () {
                    //控制镜头父元素的display 让它隐藏
                    my$('target').style.display = 'none';
                    //镜头父元素隐藏后 踢飞动画 显示
                    setTimeout(function () {
                        //踢出动画显示
                         my$('animation').style.display = 'block';
                        // my$('animation').style.backgroundImage = 'url("images/donghua.gif")';
                        var aImg = document.createElement('img');
                        my$('animation').append(aImg);
                        aImg.src = 'images/donghua'+numAni+'.gif';
                        numAni++;
                        aImg.className = 'pic';
                        //踢飞动画隐藏 小鸟显示 飞出
                        setTimeout(function () {
                            my$('animation').style.display = 'none';
                            my$('bird').style.display = 'block';
                            //小鸟飞出
                            animate(my$('bird'),{'left':muBiaoDivLeft+10,'top':muBiaoDivTop+10},function () {
                                //目标锁定的元素 隐藏
                                my$('muBiaoDiv').style.display = 'none';
                                //小鸟隐藏
                                setTimeout(function () {
                                    animate(my$('bird'),{'opacity':0},function () {
                                        //小鸟隐藏后 小猪颤抖
                                        jingMove4(oContUl.children[random].children[0],function () {
                                            // oContUl.children[random].children[0].style.zIndex = 200;
                                            var zhuBigLeft = (bodyWidth - 400)/2;
                                            var zhuBigTop = (bodyHeight - 400)/2;

                                            //灯罩显示
                                            my$('chimney').style.display = 'block';
                                            //小猪大图显示
                                            my$('bigZhu').style.display = 'block';
                                            //小猪大图里面添加名字
                                            my$('bigZhu').children[0].innerHTML = arr[random];
                                            //小猪大图的位置
                                            my$('bigZhu').style.left = oContUl.children[random].offsetLeft + my$('content').offsetLeft + 'px';
                                            my$('bigZhu').style.top = oContUl.children[random].offsetTop+ my$('content').offsetTop + 'px';
                                            //小猪大图里面的名字 渐渐的显出
                                            animate(my$('bigZhu').children[0],{'opacity':1});
                                            var zhuJson1 = {
                                                'width':400,
                                                'height':400,
                                                'backgroundSize':400,
                                                'left':zhuBigLeft,
                                                'top':zhuBigTop
                                            };
                                            //小猪大图变大
                                            animate(my$('bigZhu'),zhuJson1);
                                            // animate(oContUl.children[random].children[0],zhuJson1,function () {
                                            //   animate(oContUl.children[random].children[0].children[0],{'opacity':1});
                                            // })
                                        });
                                    });
                                },200);

                            });
                        },7500);
                    },100);

                });
                my$('muBiaoDiv').style.display = 'block';
                my$('muBiaoDiv').style.left = muBiaoDivLeft + 'px';
                my$('muBiaoDiv').style.top = muBiaoDivTop + 'px';
            });
        },500);

    });

    };

    //点击关闭按钮
    var close = my$('bigZhu').children[1];
    close.onclick = function () {
        //初始化 操作 用于二次操作
        muBiao1.style.opacity = 0;
        //选择按钮 初始化 用于二次操作
        my$('select').style.display = 'block';
        my$('select').style.opacity = 1;
        my$('select').style.bottom = '-200px';
        my$('target').style.opacity = '1';
        //小鸟初始化 用于二次操作
        my$('bird').style.left = '200px';
        my$('bird').style.bottom = '220px';
        my$('bird').style.top = '';
        my$('bird').style.display = 'none';
        my$('bird').style.opacity = '1';
        my$('animation').removeChild(my$('animation').children[0]);
        //my$('animation').style.backgroundImage = 'none';
        //my$('animation').innerHTML = '';

        //灯罩隐藏
        my$('chimney').style.display = 'none';
        //小猪大图里面的名字 隐藏
        my$('bigZhu').children[0].style.opacity = '0';
        //小猪大图的 目标位置
        var zhuBigLeft2 =  oContUl.children[random].offsetLeft + my$('content').offsetLeft;
        var zhuBigTop2 = oContUl.children[random].offsetTop+ my$('content').offsetTop;
        var zhuJson1 = {
            'width':80,
            'height':80,
            'backgroundSize':80,
            'left':zhuBigLeft2,
            'top':zhuBigTop2
        };
        //小猪大图变小 且回到以前位置
        animate(my$('bigZhu'),zhuJson1,function () {
            my$('bigZhu').style.display = 'none';
            movePos(my$('dianMing'),-200,0,'bottom',-5);
        });
    };

    function jingMove4(ele,fn) {
        //获取目标的当前位置
        var zhuCurrent = 0;
        //ul的横坐标位置 镜头的左侧移动范围
        var zhuLeft = 40;
        //镜头的右侧移动范围
        var zhuRight = 40;
        //速度
        var speed = 5;
        var num = 0;
        clearInterval(ele.move4);
        ele.move4 = setInterval(function () {
            num++;
            //镜头的移动位置
            zhuCurrent += speed;
            ele.style.left = zhuCurrent + 'px';
            //判断移动方向
            if (zhuCurrent >= zhuRight) {
                speed = -speed;
            }
            if (zhuCurrent <= zhuLeft) {
                speed = -speed;
            }
            if (num == 100) {
                clearInterval(ele.move4);
                ele.style.left = 0 + 'px';
                if (fn) {
                    fn();
                }
            }
        },10);
    }

    //镜头选择目标的函数
    function jingTouMove3(fn) {
        //拿到一个随机数
        random = parseInt(Math.random() * arr.length);
        //存储随机数对应得数据 定义终点位置
        var currentLiLeft = oContUl.children[random].offsetLeft;
        var currentLiTop = oContUl.children[random].offsetTop;
        currentLiLeft += my$('content').offsetLeft - 10;
        currentLiTop += my$('content').offsetTop - 10;
        //初始位置
        var jingtouLeft = jingTou.offsetLeft;
        var jingtouTop = jingTou.offsetTop;
        //移动速度
        var speedX = 4;
        var speedY = 4;
        //根据X轴方向移动速度 确定Y轴方向移动速度
        if ((currentLiLeft - jingtouLeft) == 0) {
            speedY = 4;
        }else {
            speedY =Math.abs(speedX * (currentLiTop - jingtouTop) / (currentLiLeft - jingtouLeft));
        }
        //判断移动方向
        speedX = (currentLiLeft - jingtouLeft) < 0 ? -speedX : speedX;
        speedY = (currentLiTop - jingtouTop) < 0 ? -speedY : speedY;

        //创建定时器 令镜头移动到 选择的li位置
        clearInterval(jingTou.move3);
        jingTou.move3 = setInterval(function () {
            //当前位置
            jingtouLeft += speedX;
            jingtouTop += speedY;
            //判断是否到达目标
            if ( Math.abs(currentLiLeft - jingtouLeft) > Math.abs(speedX) || Math.abs(currentLiTop - jingtouTop) > Math.abs(speedY)) {
                //没有到达目标 镜头继续移动
                jingTou.style.left = jingtouLeft + 'px';
                jingTou.style.top = jingtouTop + 'px';
                //背景图片继续移动
                jingTou.style.backgroundPositionX = -jingtouLeft +'px';
                jingTou.style.backgroundPositionY = -jingtouTop + 'px';
            }else {
                clearInterval(jingTou.move3);
                jingTou.style.left = currentLiLeft + 'px';
                jingTou.style.top = currentLiTop + 'px';
                jingTou.style.backgroundPositionX = -currentLiLeft + 'px';
                jingTou.style.backgroundPositionY = -currentLiTop + 'px';
                if (fn) {
                    fn();
                }
            }
        },10);
    }

    //循环移动镜头的函数
    function jingMove2() {
        //获取镜头的当前位置
        var jingtouLeft = jingTou.offsetLeft;
        //ul的横坐标位置 镜头的左侧移动范围
        var left = my$('content').offsetLeft;
        //速度
        var speed = 5;
        clearInterval(jingTou.move2);
        jingTou.move2 = setInterval(function () {
            //镜头的右侧移动范围
            var right = left - jingTou.offsetWidth + my$('content').offsetWidth;
            //镜头的移动位置
            jingtouLeft += speed;
            jingTou.style.left = jingtouLeft + 'px';
            //镜头的背景图片移动位置
            jingTou.style.backgroundPositionX = '-'+jingtouLeft + 'px';
            //判断移动方向
            if (jingtouLeft >= right) {
                speed = -speed;
            }
            if (jingtouLeft <= left) {
                speed = -speed;
            }
        },10);
    }

    //镜头变小的函数
    function jingMove(jingTouWidth,fn) {
        clearInterval(jingTou.jingMove1);
        jingTou.jingMove1 = setInterval(function () {
            //速度
            var speed = 10;
            //镜头的宽度及高度相同 且改变
            jingTouWidth -=speed;
            //判断镜头的大小是否到达目标大小
            if (jingTouWidth >= 100) {
                //赋值
                jingTou.style.width = jingTouWidth + 'px';
                jingTou.style.height = jingTouWidth + 'px';
                jingTou.style.left = (my$('target').offsetWidth - jingTouWidth)/2 + 'px';
                jingTou.style.top = (my$('target').offsetHeight - jingTouWidth)/2 + 'px';
                // jingTou.style.backgroundPositionX = '-'+jingTouLeft + 'px';
                // jingTou.style.backgroundPositionY = '-'+jingToutop+'px';
            }else {
                jingTouWidth = 100;
                jingTou.style.width = jingTouWidth + 'px';
                jingTou.style.height = jingTouWidth + 'px';
                jingTou.style.left = (my$('target').offsetWidth - jingTouWidth)/2 + 'px';
                jingTou.style.top = (my$('target').offsetHeight - jingTouWidth)/2 + 'px';
                clearInterval(jingTou.jingMove1);
                if (fn) {
                    fn();
                }
            }
        },10);
    }

    //封装的定时器函数(目标对象，起始位置，终点位置，方向，速度，回调函数)
    //用于移动
    function movePos(ele,current1,finish,direction,speed,fn) {
        var current = current1;
        clearInterval(ele.move1);
        ele.move1 = setInterval(function () {
            current = current - speed;
            if (Math.abs(Math.abs(finish) - Math.abs(current)) > Math.abs(speed)) {
                ele.style[direction] = current + 'px';
            }else {
                ele.style[direction] = finish + 'px';
                clearInterval(ele.move1);
                if (fn) {
                    fn();
                }
            }
        },10);
    }



};