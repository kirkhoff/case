angular.module('case', ['ngSanitize', 'zen.ui.select', 'ui.bootstrap', 'angular.stellar'])
    .config(['stellarConfig', function(stellarConfig){
        stellarConfig.horizontalScrolling = false;
        stellarConfig.verticalOffset = -300;
    }])
    .constant('HERO_SLIDES', [
        {
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
        }])
    .constant('OUR_WORK', [
        {
            name: 'Kitchens',
            url: '#',
            img: '/img/sub-nav/kitchens.jpg'
        },{
            name: 'Baths',
            url: '#',
            img: '/img/sub-nav/baths.jpg'
        },{
            name: 'Interiors',
            url: '#',
            img: '/img/sub-nav/interiors.jpg'
        },{
            name: 'Exteriors',
            url: '#',
            img: '/img/sub-nav/exteriors.jpg'
        },{
            name: 'Additions',
            url: '#',
            img: '/img/sub-nav/additions.jpg'
        }])
    .constant('OUR_PEOPLE', [
        {
            name: 'Craftsmen',
            url: '#',
            img: '/img/sub-nav/baths.jpg'
        },{
            name: 'Designers',
            url: '#',
            img: '/img/sub-nav/interiors.jpg'
        },{
            name: 'Project Managers',
            url: '#',
            img: '/img/sub-nav/exteriors.jpg'
        },{
            name: 'Project Developers',
            url: '#',
            img: '/img/sub-nav/additions.jpg'
        }])
    .constant('IDEA_CENTER', [
        {
            name: 'Kitchens',
            url: '#',
            img: '/img/sub-nav/kitchens.jpg'
        },{
            name: 'Baths',
            url: '#',
            img: '/img/sub-nav/baths.jpg'
        },{
            name: 'Interiors',
            url: '#',
            img: '/img/sub-nav/interiors.jpg'
        },{
            name: 'Exteriors',
            url: '#',
            img: '/img/sub-nav/exteriors.jpg'
        },{
            name: 'Additions',
            url: '#',
            img: '/img/sub-nav/additions.jpg'
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
    .controller('heroCtrl', function($scope, HERO_SLIDES){
        $scope.slides = HERO_SLIDES;
        $scope.nextImage = function(index){
            var nextIndex = (index + 1) % $scope.slides.length;
            return $scope.slides[nextIndex].img;
        };
    })
    .controller('subNavCtrl', function($scope, $timeout, OUR_WORK, OUR_PEOPLE, IDEA_CENTER){
        var ourWorkTimeout,
            ourPeopleTimeout,
            ideaCenterTimeout;

        $scope.ourWork = {
            nav: OUR_WORK,
            collapsed: true
        };
        $scope.ourPeople = {
            nav: OUR_PEOPLE,
            collapsed: true
        };
        $scope.ideaCenter = {
            nav: IDEA_CENTER,
            collapsed: true
        };

        $scope.ourWorkCollapsed = true;
        $scope.ourPeopleCollapsed = true;
        $scope.ideaCenterCollapsed = true;

        $scope.open = function(section){
            closeAllExcept(section)
            $timeout.cancel(section.timeout);
        };

        $scope.close = function(section){
            section.timeout = $timeout(function(){
                section.collapsed = true;
            }, 500);
        };

        function closeAllExcept(section){
            $scope.ourWork.collapsed = ($scope.ourWork.collapse != section);
            $scope.ourPeople.collapsed = ($scope.ourPeople.collapse != section);
            $scope.ideaCenter.collapsed = ($scope.ideaCenter.collapse != section);

            section.collapsed = false;
        }
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