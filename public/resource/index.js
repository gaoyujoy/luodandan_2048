"use strict";

Vue.config.delimiters = ["{*", "*}"];
var todo = {
    vue: new Vue({
        el: '#app',
        data: {
            todos: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            first: 0,
            secend: 0
        }
    }),
    init: function init() {
        todo.getNumb(16);
        todo.binds();
        // todo.backgournd_animation();
    },
    getNumb: function getNumb(x) {
        var first = Math.ceil(Math.random() * x) - 1;
        var secend;
        while (true) {
            secend = Math.ceil(Math.random() * x) - 1;
            if (secend != first) {
                break;
            }
        }
        var list = $.extend([], todo.vue.todos);
        // todo.vue.todos = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        var j = -1;
        for (var i = 0; i < list.length; i++) {
            if (list[i] == 0) {
                j++;
            }
            if (j == first) {
                todo.vue.first = i;
                list[i] = 2;
                first = -1;
            }
            if (j == secend) {
                todo.vue.secend = i;
                list[i] = 2;
                secend = -1;
            }
        }

        setTimeout(function () {
            todo.vue.todos = list;
        }, 1);
    },
    fng: function fng(start, end) {
        var chaX = start.x - end.x;
        var chaY = start.y - end.y;
        if (chaY > 0 && chaY > 50) {
            if (chaX < 0) {
                if (-chaX > chaY) {
                    return 1; //右
                } else {
                    return 2; //上
                }
            } else if (chaX > 0) {
                if (chaX > chaY) {
                    return 3; //左
                } else {
                    return 2; //上
                }
            } else {
                return 2;
            }
        } else if (chaY < 0 && chaY < -50) {
            if (chaX < 0) {
                if (-chaX > -chaY) {
                    return 1; //右
                } else {
                    return 4; //下
                }
            } else if (chaX > 0) {
                if (chaX > -chaY) {
                    return 3; //左
                } else {
                    return 4; //下
                }
            } else {
                return 4; //下
            }
        } else {
            if (chaX > 50 || chaX < -50) {
                if (chaX > 0) {
                    return 3; //左
                } else {
                    return 1; //右
                }
            }
        }
    },
    changeNum: function changeNum(to) {
        var todoList = $.extend([], todo.vue.todos);
        var list;
        // var list = [1, '右', '上', '左', '下'];
        if (to == 1) {
            list = [[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11], [12, 13, 14, 15]];
        } else if (to == 4) {
            list = [[0, 4, 8, 12], [1, 5, 9, 13], [2, 6, 10, 14], [3, 7, 11, 15]];
        } else if (to == 2) {
            list = [[12, 8, 4, 0], [13, 9, 5, 1], [14, 10, 6, 2], [15, 11, 7, 3]];
        } else if (to == 3) {
            list = [[3, 2, 1, 0], [7, 6, 5, 4], [11, 10, 9, 8], [15, 14, 13, 12]];
        }
        for (var i = 0; i < 4; i++) {
            var thislist = list[i];
            var x = 3,
                y = 3;
            while (true) {
                if (todoList[thislist[x - 1]] != 0) {
                    if (todoList[thislist[y]] != 0) {
                        if (todoList[thislist[y]] == todoList[thislist[x - 1]]) {
                            todoList[thislist[y]] *= 2;
                            todoList[thislist[x - 1]] = 0;
                            var b = y;
                            while (true) {
                                if (todoList[thislist[b]] == todoList[thislist[b + 1]]) {
                                    todoList[thislist[b + 1]] *= 2;
                                    todoList[thislist[b]] = 0;
                                    b++;
                                } else {
                                    break;
                                }
                            }
                        } else {
                            x = y;
                            y--;
                        }
                    } else {
                        if (todoList[thislist[y + 1]] == todoList[thislist[x - 1]]) {
                            todoList[thislist[y + 1]] = todoList[thislist[y + 1]] * 2;
                            todoList[thislist[x - 1]] = 0;
                        } else {
                            todoList[thislist[y]] = todoList[thislist[x - 1]];
                            todoList[thislist[x - 1]] = 0;
                        }
                    }
                }
                x--;
                if (x == 0) {
                    break;
                }
            }
        }
        todo.vue.todos = todoList;
    },
    binds: function binds() {
        var start = {};
        $('ul').on('touchstart', function (e) {
            start = {
                x: e.originalEvent.changedTouches[0].screenX,
                y: e.originalEvent.changedTouches[0].screenY
            };
        }).on('touchend', function (e) {
            var end = {
                x: e.originalEvent.changedTouches[0].screenX,
                y: e.originalEvent.changedTouches[0].screenY
            };
            todo.changeNum(todo.fng(start, end));
            var list_0 = todo.vue.todos.filter(function (x) {
                return x == 0;
            });
            if (Math.max.apply(null, todo.vue.todos) == 2048) {
                $.get('/get', function (res) {
                    alert('达到了' + Math.max.apply(null, todo.vue.todos) + '分，点击确定查看隐藏话！');
                    alert(res.message);
                    alert(res.message);
                    alert(res.message + '，最重要的事情要说三遍！');
                    todo.isEnd(list_0);
                }, 'json');
            } else {
                todo.isEnd(list_0);
            }
        }).on('touchmove', function (e) {
            e.preventDefault();
        });
    },
    isEnd: function isEnd(list_0) {
        if (list_0.length < 2) {
            alert('游戏结束，最高分：' + Math.max.apply(null, todo.vue.todos) + '，点击确定重新开始。');
            todo.vue.todos = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            todo.getNumb(16);
            return;
        }
        todo.getNumb(list_0.length);
    },
    backgournd_animation: function backgournd_animation() {
        var div = $('#app');
        var i = 1;
        setInterval(function () {
            div.css('background-image', 'url(/images/background' + i + '.jpg)');
            i == 6 ? i = 1 : i++;
        }, 4000);
    }
};
todo.init();