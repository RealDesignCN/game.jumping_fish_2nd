/**
 * Created by zhaojm on 15/3/17.
 */
game._Config = {

    language : game._Enum.language.en,    // cn or en

    physics: {
        groundHeight: 100,    // 地面高度，负数
        gravity : -1000,    // 重力
    },


    walter_height_percent : 0.57,


    coinMatrixList : [
            {
                x:3,
                y:5,
                numlist :[
                    1, 1, 1,
                    1, 0, 1,
                    1, 0, 1,
                    1, 0, 1,
                    1, 1, 1
                ]
            },
            {
                x:3,
                y:5,
                numlist :[
                    0, 0, 1,
                    0, 0, 1,
                    0, 0, 1,
                    0, 0, 1,
                    0, 0, 1
                ]
            },
            {
                x:3,
                y:5,
                numlist :[
                    1, 1, 1,
                    0, 0, 1,
                    1, 1, 1,
                    1, 0, 0,
                    1, 1, 1
                ]
            },
            {
                x:3,
                y:5,
                numlist :[
                    1, 1, 1,
                    0, 0, 1,
                    1, 1, 1,
                    0, 0, 1,
                    1, 1, 1
                ]
            },
            {
                x:3,
                y:5,
                numlist :[
                    1, 0, 1,
                    1, 0, 1,
                    1, 1, 1,
                    0, 0, 1,
                    0, 0, 1
                ]
            },
            {
                x:3,
                y:5,
                numlist :[
                    1, 1, 1,
                    1, 0, 0,
                    1, 1, 1,
                    0, 0, 1,
                    1, 1, 1
                ]
            },
            {
                x:3,
                y:5,
                numlist :[
                    1, 1, 1,
                    1, 0, 0,
                    1, 1, 1,
                    1, 0, 1,
                    1, 1, 1
                ]
            },

            {
                x:3,
                y:5,
                numlist :[
                    1, 1, 1,
                    1, 0, 1,
                    0, 0, 1,
                    0, 0, 1,
                    0, 0, 1
                ]
            },

            {
                x:3,
                y:5,
                numlist :[
                    1, 1, 1,
                    1, 0, 1,
                    1, 1, 1,
                    1, 0, 1,
                    1, 1, 1
                ]
            },

            {
                x:3,
                y:5,
                numlist :[
                    1, 1, 1,
                    1, 0, 1,
                    1, 1, 1,
                    0, 0, 1,
                    1, 1, 1
                ]
            },

        ],



};


game._Config.getCoinMatrix = function(idx){
    return game._Config.coinMatrixList[idx];
};