angular.module('case', ['ngSanitize', 'ngAnimate', 'zen.ui.select', 'ui.bootstrap', 'angular.stellar'])
    .config(function(stellarConfig){
        stellarConfig.horizontalScrolling = false;
        stellarConfig.verticalOffset = -500;
    })
    .constant('HERO_SLIDES', [
        {
            header: 'Kitchens',
            img: 'img/carousel/kitchens.jpg',
            description1: "<mark>Life takes place in the kitchen.</mark>",
            description2: "We'll help you bring the most out",
            description3: "of yours.",
            active: true,
            url: 'http://www.casedesign.com/our-work/portfolio/baths'
        },{
            header: 'Baths',
            img: 'img/carousel/baths.jpg',
            description1: "<mark>Sink into happiness.</mark> Our luxurious",
            description2: "bathrooms brighten moments and indulge",
            description3: "the senses.",
            active: false,
            url: 'http://www.casedesign.com/our-work/portfolio/baths'
        },{
            header: 'Interiors',
            img: 'img/carousel/interiors.jpg',
            description1: "<mark>Create a space you love.</mark> We'll help you",
            description2: "design a custom living experience that's",
            description3: "uniquely your own.",
            active: false,
            url: 'http://www.casedesign.com/our-work/portfolio/interiors'
        },{
            header: 'Exteriors',
            img: 'img/carousel/exteriors.jpg',
            description1: "<mark>Boost your curb appeal.</mark> Transform the",
            description2: "value of your home and open up new",
            description3: "possibilities.",
            active: false,
            url: 'http://www.casedesign.com/our-work/portfolio/exteriors'
        },{
            header: 'Additions',
            img: 'img/carousel/additions.jpg',
            description1: "<mark>Expand your horizons.</mark> Our home additions",
            description2: "transform your spaces and broaden your",
            description3: "perspectives.",
            active: false,
            url: 'http://www.casedesign.com/our-work/portfolio/additions'
        }])
    .constant('OUR_WORK', [
        {
            name: 'Kitchens',
            url: 'http://www.casedesign.com/our-work/portfolio/kitchens',
            img: 'img/sub-nav/our-work/kitchens.jpg'
        },{
            name: 'Baths',
            url: 'http://www.casedesign.com/our-work/portfolio/baths',
            img: 'img/sub-nav/our-work/baths.jpg'
        },{
            name: 'Interiors',
            url: 'http://www.casedesign.com/our-work/portfolio/interiors',
            img: 'img/sub-nav/our-work/interiors.jpg'
        },{
            name: 'Exteriors',
            url: 'http://www.casedesign.com/our-work/portfolio/exteriors',
            img: 'img/sub-nav/our-work/exteriors.jpg'
        },{
            name: 'Additions',
            url: 'http://www.casedesign.com/our-work/portfolio/additions',
            img: 'img/sub-nav/our-work/additions.jpg'
        }])
    .constant('OUR_PEOPLE', [
        {
            name: 'Project Developers',
            url: 'http://www.casedesign.com/our-people/project-designers',
            img: 'img/sub-nav/our-people/project-developers.jpg'
        },{
            name: 'Project Managers',
            url: 'http://www.casedesign.com/our-people/project-managers',
            img: 'img/sub-nav/our-people/project-managers.jpg'
        },{
            name: 'Designers',
            url: 'http://www.casedesign.com/our-people/designers',
            img: 'img/sub-nav/our-people/designers.jpg'
        },{
            name: 'Craftsmen',
            url: 'http://www.casedesign.com/our-people/craftsmen',
            img: 'img/sub-nav/our-people/craftsmen.jpg'
        }])
    .constant('WHAT_TO_EXPECT', [
        {
            name: 'Kitchens',
            url: 'http://www.casedesign.com/our-work/what-to-expect/kitchens',
            img: 'img/sub-nav/what-to-expect/kitchens.jpg'
        },{
            name: 'Baths',
            url: 'http://www.casedesign.com/our-work/what-to-expect/baths',
            img: 'img/sub-nav/what-to-expect/baths.jpg'
        },{
            name: 'Interiors',
            url: 'http://www.casedesign.com/our-work/what-to-expect/interiors',
            img: 'img/sub-nav/what-to-expect/interiors.jpg'
        },{
            name: 'Exteriors',
            url: 'http://www.casedesign.com/our-work/what-to-expect/exteriors',
            img: 'img/sub-nav/what-to-expect/exteriors.jpg'
        },{
            name: 'Additions',
            url: 'http://www.casedesign.com/our-work/what-to-expect/additions',
            img: 'img/sub-nav/what-to-expect/additions.jpg'
        }])
    .factory('BlogService', function($http){
        var url = 'http://www.casedesign.com/blog/feed',
            num = 9;
        return {
            fetch: function(){
                return $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?' +
                    'v=1.0&' +
                    'callback=JSON_CALLBACK&' +
                    'num=' + num + '&' +
                    'q=' + encodeURIComponent(url));
            },
            getSlides: function(feedArr, numPerPage){
                var slides = [],
                    slide = {};
                while (feedArr.length) {
                    slide = {
                        'entries': feedArr.splice(0, numPerPage),
                        'active': false
                    }
                    slides.push(slide);
                }
                if (slides.length) slides[0]['active'] = true;
                return slides;
            }
        }
    })
    .run(function($document, $animate){
        // Disable ngAnimate for carousel items
        $animate.enabled(false, $document.find('carousel'));
    })
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
    .controller('heroCtrl', function($scope, $animate, HERO_SLIDES){
        $scope.slides = HERO_SLIDES;
        $scope.nextImage = function(index){
            var nextIndex = (index + 1) % $scope.slides.length;
            return $scope.slides[nextIndex].img;
        };
    })
    .controller('promoCtrl', function($scope, $animate, $timeout, $document){
        var isTouch = $document.find('html').eq(0).hasClass('touch');
        if (!isTouch) {
            $timeout(function(){
                $scope.showPromo = true;
            }, 1000);
        } else $scope.showPromo = false;

    })
    .controller('subNavCtrl', function($scope, $timeout, $animate, OUR_WORK, OUR_PEOPLE, WHAT_TO_EXPECT){
        $scope.ourWork = {
            nav: OUR_WORK,
            collapsed: true
        };
        $scope.ourPeople = {
            nav: OUR_PEOPLE,
            collapsed: true
        };
        $scope.whatToExpect = {
            nav: WHAT_TO_EXPECT,
            collapsed: true
        };

        $scope.ourWorkCollapsed = true;
        $scope.ourPeopleCollapsed = true;
        $scope.whatToExpectCollapsed = true;

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
            $scope.whatToExpect.collapsed = ($scope.whatToExpect.collapse != section);

            section.collapsed = false;
        }
    })
    .controller('mobileMenuCtrl', function($scope, $animate){
        $scope.showMenu = false;
    })
    .controller('blogCtrl', function($scope, $animate, $window, $document, BlogService){
        // Check to see if we're on a touch device
        if ($document.find('html').eq(0).hasClass('touch')) {
            if ($window.innerWidth && $window.innerWidth >= 768) {
                // Tablet
                $scope.entriesPerPage = 2;
                $scope.showBlogNav = true;
            } else {
                // Phone
                $scope.entriesPerPage = 2;
                $scope.showBlogNav = false;
            }
        } else {
            $scope.entriesPerPage = 3;
            $scope.showBlogNav = true;
        }
        $scope.defaultImg = 'img/default-article.jpg';
        $scope.getImgFromContent = function(content){
            var element = angular.element('<div>' + content + '</div>');
            var firstImg = element.find('img').eq(0);
            var src = firstImg.attr('src');
            return src || $scope.defaultImg;
        };

        // Get Blog items and construct slides
        BlogService.fetch().then(
            function(rsp){
                var entries = rsp.data.responseData.feed.entries,
                    slideEntries = angular.copy(entries);
                $scope.entries = entries;
                $scope.slides = BlogService.getSlides(slideEntries, $scope.entriesPerPage);
            });
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
    })
    .directive('mobileMenuTrigger', function($document){
        return {
            link: function(scope, element, attrs){
                var $body = $document.find('body').eq(0),
                    $menu = element.parent().find('menu').eq(0).hide(),
                    leftOffset = 0;
                scope.toggled = false;
                $body.css({
                    position: 'relative',
                    left: '0%'
                });
                element.on('click', function(){
                    switch (scope.toggled) {
                        case true:
                            leftOffset = '0%';
                            break;
                        case false:
                            leftOffset = '-85%';
                            $menu.show();
                            break;
                    }
                    $body.animate({
                        left: leftOffset
                    }, {
                        duration: 500,
                        easing: 'easeInOutCubic',
                        complete: function(){
                            scope.toggled = !scope.toggled;
                            if (!scope.toggled) $menu.hide();
                        }
                    });
                });
            }
        }
    })
    .directive('errorSrc', function(){
        return {
            link: function(scope, element, attrs){
                scope.$watch(function(){
                    return attrs['ngSrc'];
                }, function (value) {
                    if (!value) {
                        element.attr('src', attrs.errorSrc);
                    }
                });
                element.bind('error', function(){
                    element.attr('src', attrs.errorSrc);
                });
            }
        }
    })
    .directive('removeOutsideStyles', function(){
        return {
            link: function(scope, element, attrs){
                element.find('link').remove();
            }
        }
    })
    .directive('replaceSelect', function($compile){
        return {
            link: function(scope, element, attrs){
                // Find the select box provided by Form Stack
                var select = element.find('select').eq(0);
                var selectLabel = select.parent().find('label').eq(0);
                var submitBtn;
                var submitRow;
                var checkboxLabel;

                angular.forEach(element.find('input'), function(input){
                    var $input = angular.element(input);
                    if ($input.attr('type') == 'submit') {
                        submitBtn = $input;
                        submitRow = $input.parent();
                        submitRow.addClass('submit-row');
                        submitBtn.attr('style', '');
                    } else if ($input.attr('type') == 'checkbox') {
                        // Reformat checkboxes so we can style them
                        checkboxLabel = $input.parent();
                        checkboxLabel.after($input);
                        $input.after(checkboxLabel);
                    }
                });

                // Add the zen-select attribute so we can style it
                scope.selectModel = select.find('option').eq(0).val();
                select.attr('zen-select', '').attr('ng-model', 'selectModel');
                selectLabel.addClass('hidden508');
                $compile(select)(scope);
                submitRow.prepend(select).prepend(selectLabel);
            }
        }
    })
    .filter('startFrom', function(){
        return function(input, start){
            if (angular.isDefined(input)) {
                start = +start;
                return input.slice(start);
            }
        }
    });