angular.module('case', ['ngSanitize', 'zen.ui.select', 'ui.bootstrap', 'angular.stellar'])
    .config(['stellarConfig', function(stellarConfig){
        stellarConfig.horizontalScrolling = false;
        stellarConfig.verticalOffset = -300;
    }])
    .controller('caseCtrl', function($scope, $location, $anchorScroll){
        $scope.scrollTo = function(elementId){
            $location.hash(elementId);
            $anchorScroll();
        };
    })
    .controller('scheduleCtrl', function($scope){
        // Options array for the Best Time select input
        $scope.timeOptions = [
            'Best Time to Reach Me',
            '8AM-10PM',
            '10AM-12PM',
            '12PM-1PM',
            '1PM-3PM',
            '3PM-5PM',
            'Other'];

        // The default choice for the Best Time select input
        $scope.bestTime = $scope.timeOptions[0];
    })
    .controller('heroCtrl', function($scope){
        $scope.slides = [{
            header: 'Kitchens',
            img: '/img/carousel/kitchens.jpg',
            description1: '<mark>Lorem ipsum dolor sit amet conse ctetuer</mark>',
            description2: '<mark>adipiscing elit</mark>, sed diam nonummy nibh',
            description3: 'eusmod tincidunt ut laoreet.',
            active: true
        },{
            header: 'Baths',
            img: '/img/carousel/baths.jpg',
            description1: '<mark>Lorem ipsum dolor sit amet conse ctetuer</mark>',
            description2: '<mark>adipiscing elit</mark>, sed diam nonummy nibh',
            description3: 'eusmod tincidunt ut laoreet.',
            active: false
        },{
            header: 'Interiors',
            img: '/img/carousel/interiors.jpg',
            description1: '<mark>Lorem ipsum dolor sit amet conse ctetuer</mark>',
            description2: '<mark>adipiscing elit</mark>, sed diam nonummy nibh',
            description3: 'eusmod tincidunt ut laoreet.',
            active: false
        },{
            header: 'Exteriors',
            img: '/img/carousel/exteriors.jpg',
            description1: '<mark>Lorem ipsum dolor sit amet conse ctetuer</mark>',
            description2: '<mark>adipiscing elit</mark>, sed diam nonummy nibh',
            description3: 'eusmod tincidunt ut laoreet.',
            active: false
        },{
            header: 'Additions',
            img: '/img/carousel/additions.jpg',
            description1: '<mark>Lorem ipsum dolor sit amet conse ctetuer</mark>',
            description2: '<mark>adipiscing elit</mark>, sed diam nonummy nibh',
            description3: 'eusmod tincidunt ut laoreet.',
            active: false
        }];

        $scope.nextImage = function(index){
            var nextIndex = (index + 1) % $scope.slides.length;
            return $scope.slides[nextIndex].img;
        };
    })
    .directive('scrollTo', function(){
        return {
            link: function(scope, element, attrs){
                var targetId = '#' + attrs.scrollTo;
                element.on('click', function(){
                    $('html, body').animate({
                        scrollTop: $(targetId).offset().top
                    }, {
                        duration: 2000,
                        easing: 'easeInOutCubic'
                    });
                    return false;
                });
            }
        }
    });