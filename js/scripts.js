var activeProject=0;
var isAutoPlay = true;


$(document).ready(function() {

    initPage();

});


function initPage(){

    showExtendedNavOnScrollTop();
    smoothScroll();
    projectClick();

    $(document).on("scroll", onScroll);
    
    $('a[href^="#main"]').on('click', function (e) {
        $(this).removeClass('active');
    });

    setActiveProject(0);
    renderProjectDetails(projects[activeProject]);

    var autoPlay = setInterval(function() {
       if (isAutoPlay) {
         if (activeProject === projects.length - 1) {
           setActiveProject(0);
         } else {
           setActiveProject(activeProject + 1);
         }
         renderProjectDetails(projects[activeProject]);
       } else {
         clearInterval(autoPlay);
       }
     }, 10000);
}


//When clicking on project button, make the icon bigger
function projectClick(){
    $(".project-item").on('click', function(e) {
        e.preventDefault();
        isAutoPlay = false;
        $(".project-item").each(function () {
            $(this).parent().removeClass('active-project');
        }); 

        $(this).parent().addClass('active-project'); 

    });
}


//When clicking a href change the style to active
function smoothScroll(){
    $(".nav-item").on('click', function (e) {
        e.preventDefault();
        $(document).off("scroll");
        
        $(".nav-item").each(function () {
            $(this).removeClass('active');
        }); 

        $(this).blur();
        var target = this.hash,
            menu = target;
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top+2
        }, 500, 'swing', function () {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
        });
    });
}


// When scrolling up show the extended menu nav bar
function showExtendedNavOnScrollTop(){
    var lastScrollTop = 0;
    $(window).scroll(function(event){
       var st = $(this).scrollTop();
       if (st > lastScrollTop){
          $('#mainNav').addClass("affix");
          $('#mainNav').removeClass("affix-top");
       } else {
          $('#mainNav').removeClass("affix");
          $('#mainNav').addClass("affix-top");
       }
       lastScrollTop = st;
    });
}


//When scrolling add active style to logo when reaching hero section
function onScroll(event){
    var scrollPos = $(document).scrollTop();
         var is_mobile = false;

            if( $('#some-element').css('display')=='none') {
                is_mobile = true;       
            }


            if (is_mobile === true) {
                  if(scrollPos<=350) {
                    $('.navbar-font-logo').addClass("hovered");
                }
                else {
                    $('.navbar-font-logo').removeClass("hovered");
                    $('.navbar-font-logo').blur();
                }
            } else {


            if(scrollPos<=550) {
                $('.navbar-font-logo').addClass("hovered");
            }
            else {
                $('.navbar-font-logo').removeClass("hovered");
                $('.navbar-font-logo').blur();
            }

        }

}


// Initialize affix and add an offset to add affix class on scroll
$('#mainNav').affix({
  offset: {
    top: 100
  }
});


function getTechImage(tech, techCode) {
  for (var i = 0; i < tech.length; i++) {
    if (tech[i].code === techCode) {
      return tech[i].image;
    }
  }
  return '';
}



function renderProjectDetails(project) {
  var html = '';
  // Generate a list of skills used as a list of html images
  var techList = '';
  for (var i = 0; i < project.tech.length; i++) {
    techList += '<li><img src="img/' + getTechImage(tech, project.tech[i])+ '" alt=""></li>';
  }

  // Assemble the HTML output to be appended to the DOM
  html += '<div class="project-preview"><img src="img/' + project.preview + '" alt=""></div>';
  html += '<h3>' + project.name + '</h3>';
  html += '<div class="project-links">';
  html += '  <a href="' + project.url + '" target="_blank" class="btn-project-view">Demo</a>';
  html += '  <a href="' + project.github + '" target="_blank" class="btn-project-github">GitHub</a>';
  html += '</div>';
  html += '<p>' + project.description + '</p>';
  html += '<ul class="skills">';
  html +=    techList;
  html += '</ul>';



  // Fade out existing content and fade in the new one
  var h = $('.project-details').height();
  $('.project-details').height(h).fadeOut(300, function() {
    $(this).html(html).fadeIn(300, function() {
      $(this).height('auto');
    });
  });
}



$('.project-list li').click(function(e) {
  e.preventDefault();
  var projectId = $(this).attr('data-id');
  if (projectId !== activeProject) {
    renderProjectDetails(projects[projectId]);
    // Mark current project as active and set appropriate classes
    projectClick(projectId);
  }
});


function setActiveProject(id){
   activeProject = id;
   var navElement = $('*[data-id="' + id + '"]');
   $('.project-list li').removeClass('active-project');
   navElement.addClass('active-project');
 }


var tech = [
  {
    "name" : "JavaScript",
    "code" : "js",
    "type" : "language",
    "image" : "lang-js.png",
  },
  {
    "name" : "HTML 5",
    "code" : "html",
    "type" : "language",
    "image" : "lang-html.png",
  },
  {
    "name" : "CSS 3",
    "code" : "css",
    "type" : "language",
    "image" : "lang-css.png",
  },
  {
    "name" : "jQuery",
    "code" : "jquery",
    "type" : "framework",
    "image" : "framework-jquery.png",
  },
  {
    "name" : "Sass",
    "code" : "sass",
    "type" : "framework",
    "image" : "framework-sass.png",
  },
  {
    "name" : "Bootstrap",
    "code" : "bootstrap",
    "type" : "framework",
    "image" : "framework-bootstrap.png",
  },
  {
    "name" : "Git",
    "code" : "git",
    "type" : "tool",
    "image" : "tool-git.png",
  },
  {
    "name" : "GitHub",
    "code" : "github",
    "type" : "tool",
    "image" : "tool-github.png",
  },
  {
    "name" : "Gulp",
    "code" : "gulp",
    "type" : "tool",
    "image" : "tool-gulp.png",
  }
];


var projects = [
  {
    "name" : "Responsive Registration Form",
    "url" : "http://www.orianlevy.com/project3/",
    "github" : "https://github.com/orianlevy/Project-3",
    "description" : "In this project I built a responsive, mobile-friendly registration form using a wide variety of HTML form input types and attributes. Using the supplied mockup file as a guide, I created repsonsive mobile, tablet and desktop versions of the form using CSS media queries and a \"mobile-first\" approach as well as implementing custom form controls.",
    "preview" : "project-preview-1.png",
    "tech" : ["html", "css", "github"]
  },
  {
    "name" : "Interactive Photo Gallery",
    "url" : "http://www.orianlevy.com/project4/",
    "github" : "https://github.com/orianlevy/Project-4",
    "description" : "This project was about creating an interactive photo gallery using JavaScript and jQuery. Thumbnails and photos were be provided with descriptions. User intraction with the search box will cause images in the gallery to be filtered based on the input. Clicking on thumbnails, opens up a lighbox showing a larger version of each photo and allows keyboard navigation.",
    "preview" : "project-preview-2.png",
    "tech" : ["html", "css", "js", "jquery", "github"]
  },
  {
    "name" : "Responsive Layouts with Sass",
    "url" : "http://www.orianlevy.com/project5/",
    "github" : "https://github.com/orianlevy/Project-5",
    "description" : "This project was about refactoring a previous project originally written in CSS, to Sass. I used the oportunity to redesign the layout using Flexbox instead of floating divs. I also took advantage of many Sass features such as support for partials, variables, extends, and mixins to write modular, more maintainable code.",
    "preview" : "project-preview-3.png",
    "tech" : ["html", "css", "sass", "github"]
  },
  {
    "name" : "Interactive Video Player",
    "url" : "http://www.orianlevy.com/project7/",
    "github" : "https://github.com/orianlevy/Project-7",
    "description" : "This is an HTML5 video player featuring custom control elements, written in JavaScript using the HTML5 Video API. Using the supplied mockups, video files, and transcript, I wrote an interactive video player that synchronizes the video and the transcript. The transcript is highlighting as the video progresses.",
    "preview" : "project-preview-4.png",
    "tech" : ["html", "css", "js", "jquery", "github"]
  },
  {
    "name" : "Web Application Dashboard",
    "url" : "http://www.orianlevy.com/project9/",
    "github" : "https://github.com/orianlevy/Project-9",
    "description" : "This project was about building a beautiful web application dashboard complete with JavaScript-driven charts and graphs base on a suplied graphic mockup. This was a front end project only that required to create the responsive layout in HTML and CSS with added JavaScript functionality.",
    "preview" : "project-preview-5.png",
    "tech" : ["html", "css", "js", "github"]
  },
  {
    "name" : "Public API Galley",
    "url" : "http://www.orianlevy.com/project10/",
    "github" : "https://github.com/orianlevy/Project-10",
    "description" : "This project was about using at least one of the provided APIs to grab, fromat and present data from that API. Items had to be presented on a page in an attractive gallery of images or titles. Clicking an image opens a lightbox prodiving detailed information about that item. This project included Ajax calls using jQuery, pasring and formatting JSON with Javascript and a bit of CSS magic.",
    "preview" : "project-preview-6.png",
    "tech" : ["html", "css", "js", "jquery", "github"]
  },
];
