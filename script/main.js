var videos = {
    "question0": {
        "question": "HOW DO YOU PREFER YOUR SOCIAL LIFE?",
        "image": "assets/Relationships.png",
        "video1": {
            "title": "ALONE",
            "quote": "",
            "key": "question1",
            "video": "assets/individual.mp4",
            "concept": "ALONE"
        },
        "video2": {
            "title": "TOGETHER",
            "quote": "",
            "key": "question2",
            "video": "assets/Collective.mp4",
            "concept": "TOGETHER"
        }

    },
    "question1": {
        "question": "WHAT DO YOU OWN?",
        "image": "assets/Wealth.png",
        "video1": {
            "title": "MONEY",
            "quote": "",
            "key": "question1.1",
            "video": "assets/richmoney.mp4",
            "concept": "MONEY"
        },
        "video2": {
            "title": "DIGNITY",
            "quote": "",
            "key": "question1.2",
            "video": "assets/nomoneyland.mp4",
            "concept": "DIGNITY"
        }
    },
    "question2": {
        "question": "WHAT DO YOU BELIEVE?",
        "image": "assets/Religion.png",
        "video1": {
            "title": "SCIENCE",
            "quote": "",
            "key": "question2.1",
            "video": "assets/Pure Science.mp4",
            "concept": "SCIENCE"
        },
        "video2": {
            "title": "FICTION",
            "quote": "",
            "key": "question2.2",
            "video": "assets/pure fantasy.mp4",
            "concept": "FICTION"
        }
    },
    "question1.1": {
        "question": "WHO DO YOU FOLLOW?",
        "image": "assets/politics.png",
        "video1": {
            "title": "LEADERS",
            "quote": "",
            "key": "end",
            "video": "assets/POLITICIANS.mp4",
            "concept": "LEADERS"
        },
        "video2": {
            "title": "YOURSELF",
            "quote": "",
            "key": "end",
            "video": "assets/politics 2.mp4",
            "concept": "YOURSELF"
        }
    },
    "question1.2": {
        "question": "HOW DO YOU TAKE CARE OF YOURSELF?",
        "image": "assets/Health.png",
        "video1": {
            "title": "BEING GREEN",
            "quote": "",
            "key": "end",
            "video": "assets/radicalveganism.mp4",
            "concept": "BEING GREEN"
        },
        "video2": {
            "title": "BEING FAST",
            "quote": "",
            "key": "end",
            "video": "assets/fastfood.mp4",
            "concept": "BEING FAST"
        }
    },
    "question2.1": {
        "question": "HOW DO YOU WASTE YOUR TIME?",
        "image": "assets/Career.png",
        "video1": {
            "title": "EASLY",
            "quote": "",
            "key": "end",
            "video": "assets/positive.mp4",
            "concept": "EASLY"
        },
        "video2": {
            "title": "HARDLY",
            "quote": "",
            "key": "end",
            "video": "assets/negative.mp4",
            "concept": "HARDLY"
        }
    },
    "question2.2": {
        "question": "HOW DO YOU ENJOY LIFE?",
        "image": "assets/passion.png",
        "video1": {
            "title": "JUMPING",
            "quote": "",
            "key": "end",
            "video": "assets/DANCING OBSESSION.mp4",
            "concept": "JUMPING"
        },
        "video2": {
            "title": "OBSESSING",
            "quote": "",
            "key": "end",
            "video": "assets/PASSIONS 2.mp4",
            "concept": "OBSESSING"
        }
    }
};
var index = 2;

$(document).ready(function() {
    $('#fullpage').fullpage({
        verticalCentered: true,
        sectionsColor: ['#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000'],
        afterRender: function() {}
    });
    $.fn.fullpage.setMouseWheelScrolling(false);
    $.fn.fullpage.setAllowScrolling(false);

    $('#start-overlay').on('click', function() {
        $(this).fadeOut(500, function() {
            startQuest();
            startWebCam();
        });
    });
});
var startWebCam = function() {
    var video = document.querySelector("#videoElement");

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function(stream) {
                video.srcObject = stream;
            })
            .catch(function(e) {
                // webcam not available
            });
    }
}

var startQuest = function() {
    $('#careta').get(0).play();
    $('#careta').on('ended', function() {
        startQuestion("question0");

    });

}
var startQuestion = function(questionKey) {
    if (questionKey.indexOf("question") == 0) {
        var question = videos[questionKey];
        $("#question").removeAttr("style");
        $("#question>h1").removeAttr("style");
        $("#question>h1").text(question.question);
        $.fn.fullpage.moveTo(index, index);
        $("#question").addClass("animated flipInX fixedElement");
        $("#question").removeClass("hidden");
        setTimeout(function() {
            startVideos()
        }, 3000);
        $("#section" + index).css('background-image', 'url(' + question.image + ')');

        index++;
        var template = $("#template").html();
        var $template = $("#section" + index).find(".fp-tableCell").append(template);
        var $container1 = $template.find(".container1");
        var $container2 = $template.find(".container2");
        fillContainer($container1, question.video1);
        fillContainer($container2, question.video2);
    } else {
        startEnd(questionKey);
    }
}
var startEnd = function(key) {
    $("#question").addClass("hidden");
    $("#last").fadeIn(1000, function() {
        $.fn.fullpage.moveTo(index, index);
        $("#videoElement").removeClass("hidden");
        type("The happiness is inside you", $("#lastTitle"), function() {
            setTimeout(function() {
                $("#last").fadeOut(1000);
                setTimeout(function() {
                    $("#credits").fadeIn(1000);
                }, 5000);
            }, 2000);

        });
    });
}

function type(string, element, callback) {
    (function writer(i, display) {
        if (i++ >= string.length) {
            callback();
        }

        element.html(string.substring(0, i));
        var rand = Math.floor(Math.random() * (100));
        setTimeout(function() {
            writer(i);
        }, rand);
    })(0)
}
var fillContainer = function($container, video) {
    $container.find(".title").text(video.title);
    $container.find(".quote").text(video.quote);
    $container.find("video source").attr('src', video.video).load();
    $container.find("button").click(function(event) {
        startQuestion(video.key);
    });
    $container.find("button").text(video.concept);
}
var startVideos = function() {
    $.fn.fullpage.moveTo(index, index);
    $("#question").removeClass("flipInX");
    $("#question").animate({
        top: "-80px"
    }, 500);
    $("#question>h1").animate({
        fontSize: "34px"
    }, 500);
    var array = $("#section" + index).find('video');
    for (var i = 0; i < array.length; i++) {
        var video = array.get(i);
        video.play();
        var $video = $(video);
        addVideoButton($video);
    }
    index++;
}
var addVideoButton = function($video) {
    $video.on('ended', function() {
        $video.parent().parent().find('.video-button').removeClass('hidden');
    });
}
