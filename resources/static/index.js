angular.module('app', []).controller('indexController', function ($scope, $http) {
    const contextPath = 'http://localhost:6868/app';

    $scope.loadProducts = function () {
        $http.get(contextPath + '/products')
            .then(function (response) {
                console.log(response.data);
                $scope.ProductList = response.data;
            });
    };
    $scope.deleteProduct = function (productId) {
        if (confirm('Delete ' + productId) == true) {
            $http.get(contextPath + '/products/delete/' + productId)
                .then(function () {
                    $scope.loadProducts()
                })
        }
    };
    $scope.createProduct = function () {
        // $http.post(contextPath + '/products/add', $scope.new_product)
            $http({
                url: contextPath +'/products/add',
                method: 'POST',
                data: $scope.new_product,
            })
            .then(function () {
                $scope.new_product.title = null;
                $scope.new_product.price = null;
                $scope.loadProducts()
            })
    };

    $scope.filterProduct = function () {
        $http({
            url: contextPath + '/products',
            method: 'GET',
            params: {
                min: $scope.filter_product.minValue,
                max: $scope.filter_product.maxValue
            }
        }).then(function (response) {
            $scope.ProductList = null;
            $scope.ProductList = response.data;
        })
    };

    $scope.loadProducts();
});