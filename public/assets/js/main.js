/*
	Main JS
	Modified from Forty by HTML5UP by Harmon Amakobe
*/
// Wait for the DOM to be ready
document.addEventListener("DOMContentLoaded", function () {
  // Function to add a new timeline item
  function addItem() {
    // Create a new timeline item
    var newItem = document.createElement("div");
    newItem.className = "timeline-section";
    newItem.innerHTML = `
					<div class="timeline-date">[New Date]</div>
					<div class="row">
						<div class="col-sm-4">
							<div class="timeline-box">
								<!-- ... content for the new item ... -->
							</div>
						</div>
					</div>
				`;
    // Append the new item to the timeline
    document.querySelector(".timeline").appendChild(newItem);
  }

  // Function to edit the month
  function editMonth() {
    // Implement your edit logic here
    alert("Edit month functionality goes here!");
  }

  // Event listener for the "Add Item" button
  document.querySelector(".add-item").addEventListener("click", addItem);

  // Event listener for the "Edit" buttons in each month
  var editButtons = document.querySelectorAll(".edit-month");
  editButtons.forEach(function (button) {
    button.addEventListener("click", editMonth);
  });
});

// Wait for the DOM to be ready
document.addEventListener("DOMContentLoaded", function () {
  // Replace 'YOUR_VIDEO_ID' with the actual video ID
  var videoId = "8oRRZiRQxTs";

  // Load the YouTube Player API script
  var tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  // Variables to store video player and timeline-month element
  var player;
  var timelineMonthElement;

  // Function to create a timeline-month element
  function createTimelineMonth(timestamp) {
    // Create a new timeline-month element
    timelineMonthElement = document.createElement("div");
    timelineMonthElement.className = "timeline-month";
    timelineMonthElement.innerHTML = `
${getMonthYearString(timestamp)}
<span>3 Entries</span>
<button class="edit-month"><i class="fas fa-edit"></i></button>
`;

    // Append the new timeline-month element to the timeline
    document.querySelector(".timeline").appendChild(timelineMonthElement);
  }

  // Function to update the timeline based on video timestamp
  function updateTimeline() {
    var currentTime = player.getCurrentTime();
    var percentage = (currentTime / player.getDuration()) * 100;

    // Update the timeline-month element's style to match the video progress
    timelineMonthElement.style.width = percentage + "%";
  }

  // Function to get a formatted month-year string from the video timestamp
  function getMonthYearString(timestamp) {
    var date = new Date(timestamp * 1000); // Convert timestamp to milliseconds
    var month = date.toLocaleString("default", { month: "long" });
    var year = date.getFullYear();
    return `${month}, ${year}`;
  }

  // YouTube Player API callback function
  window.onYouTubeIframeAPIReady = function () {
    player = new YT.Player("player", {
      height: "360",
      width: "640",
      videoId: videoId,
      events: {
        onReady: function (event) {
          // Get the initial timestamp and create the timeline-month element
          createTimelineMonth(player.getDuration());
        },
        onStateChange: function (event) {
          if (event.data == YT.PlayerState.PLAYING) {
            // Update the timeline continuously when the video is playing
            setInterval(updateTimeline, 1000);
          }
        },
      },
    });
  };

  // Event listener for the "Edit" button in the created timeline-month element
  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("edit-month")) {
      // Implement your edit month logic here
      alert("Edit month functionality goes here!");
    }
  });
});

(function ($) {
  var $window = $(window),
    $body = $("body"),
    $wrapper = $("#wrapper"),
    $header = $("#header"),
    $banner = $("#banner");

  // Breakpoints.
  breakpoints({
    xlarge: ["1281px", "1680px"],
    large: ["981px", "1280px"],
    medium: ["737px", "980px"],
    small: ["481px", "736px"],
    xsmall: ["361px", "480px"],
    xxsmall: [null, "360px"],
  });

  /**
   * Applies parallax scrolling to an element's background image.
   * @return {jQuery} jQuery object.
   */
  $.fn._parallax =
    browser.name == "ie" || browser.name == "edge" || browser.mobile
      ? function () {
          return $(this);
        }
      : function (intensity) {
          var $window = $(window),
            $this = $(this);

          if (this.length == 0 || intensity === 0) return $this;

          if (this.length > 1) {
            for (var i = 0; i < this.length; i++)
              $(this[i])._parallax(intensity);

            return $this;
          }

          if (!intensity) intensity = 0.25;

          $this.each(function () {
            var $t = $(this),
              on,
              off;

            on = function () {
              $t.css(
                "background-position",
                "center 100%, center 100%, center 0px"
              );

              $window.on("scroll._parallax", function () {
                var pos =
                  parseInt($window.scrollTop()) - parseInt($t.position().top);

                $t.css(
                  "background-position",
                  "center " + pos * (-1 * intensity) + "px"
                );
              });
            };

            off = function () {
              $t.css("background-position", "");

              $window.off("scroll._parallax");
            };

            breakpoints.on("<=medium", off);
            breakpoints.on(">medium", on);
          });

          $window
            .off("load._parallax resize._parallax")
            .on("load._parallax resize._parallax", function () {
              $window.trigger("scroll");
            });

          return $(this);
        };

  // Play initial animations on page load.
  $window.on("load", function () {
    window.setTimeout(function () {
      $body.removeClass("is-preload");
    }, 100);
  });

  // Clear transitioning state on unload/hide.
  $window.on("unload pagehide", function () {
    window.setTimeout(function () {
      $(".is-transitioning").removeClass("is-transitioning");
    }, 250);
  });

  // Fix: Enable IE-only tweaks.
  if (browser.name == "ie" || browser.name == "edge") $body.addClass("is-ie");

  // Scrolly.
  $(".scrolly").scrolly({
    offset: function () {
      return $header.height() - 2;
    },
  });

  // Header.
  if ($banner.length > 0 && $header.hasClass("alt")) {
    $window.on("resize", function () {
      $window.trigger("scroll");
    });

    $window.on("load", function () {
      $banner.scrollex({
        bottom: $header.height() + 10,
        terminate: function () {
          $header.removeClass("alt");
        },
        enter: function () {
          $header.addClass("alt");
        },
        leave: function () {
          $header.removeClass("alt");
          $header.addClass("reveal");
        },
      });

      window.setTimeout(function () {
        $window.triggerHandler("scroll");
      }, 100);
    });
  }

  // Banner.
  $banner.each(function () {
    var $this = $(this),
      $image = $this.find(".image"),
      $img = $image.find("img");

    // Parallax.
    $this._parallax(0.275);

    // Image.
    if ($image.length > 0) {
      // Set image.
      $this.css("background-image", "url(" + $img.attr("src") + ")");

      // Hide original.
      $image.hide();
    }
  });
})(jQuery);
