var cartController= function ($scope) {
    $scope.cart=[
        {
            id:1,
            name:'iphone7 Plus',
            quantity:3,
            price:7488
        },
        {
            id:2,
            name:'huawei P10',
            quantity:4,
            price:6488
        },
        {
            id:3,
            name:'samsung S8',
            quantity:5,
            price:5488
        },
        {
            id:4,
            name:'xiaomi5 Plus',
            quantity:6,
            price:4488
        }
    ];
    //计算购物总价
    $scope.totalPrice= function () {
        var total=0;
        angular.forEach($scope.cart, function (item) {
            total +=item.price*item.quantity;
        });
        return total;
    };
    //计算总购买数量
    $scope.totalQuantity= function () {
        var total=0;
        angular.forEach($scope.cart, function (item) {
            total +=parseInt(item.quantity);
        });
        return total;
    };
    //findIndex用来获取事件触发的对应的商品的id
    var findIndex= function (id) {
        var index=-1;
        angular.forEach($scope.cart, function (item,key) {
            if(item.id===id){
                index=key;
                return;
            }
        });
        return index;
    };
    //删除某个商品
    $scope.remove= function (id) {
        var index=findIndex(id);
        if(index!==-1){
            $scope.cart.splice(index,1);
        }
    };
    //为某个商品添加商品数量
    $scope.add= function (id) {
        var index=findIndex(id);
        if(index !==-1){
            ++$scope.cart[index].quantity;
        }
    };
    //为某个商品减少商品数量
    $scope.reduce= function (id) {
        var index=findIndex(id);
        if(index !==-1){
            var item=$scope.cart[index];
            if(item.quantity > 1){
                --item.quantity;
            }else{
                //减少至商品数量小于1时,触发弹框,判断是否删除该商品
                var returnKey=confirm('是否从购物车内删除该产品!');
                if(returnKey){
                    $scope.remove(id);
                }
            }
        }
    };
    //监听input的输入
    $scope.$watch('cart', function (newValue,oldValue) {
        angular.forEach(newValue, function (item,key) {
            if(item.quantity<1){
                //输入的商品数量小于1时,触发弹框,判断是否删除该商品
                var returnKey=confirm('是否从购物车内删除该产品!');
                if(returnKey){
                    $scope.remove(item.id);
                }else{
                    item.quantity=oldValue[key].quantity;
                }
            }
        });
    },true);   //这个true是监听多组数据变化
};