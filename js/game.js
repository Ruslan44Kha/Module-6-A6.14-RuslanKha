const numDivs = 36;
const maxHits = 10;
let miss = 0;
let hits = 0;
let firstHitTime = 0;

function round() {
  let divSelector = randomDivId();
  $(divSelector).addClass("target").text(hits + 1);
  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  $(".game-field").addClass("d-none");
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  if ((hits - miss)< 0) {
    $("#score").text(0);
  }
  else {$("#score").text(hits - miss);}
  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  if ($(event.target).hasClass("target")) {
    $(".game-field").removeClass("miss target").text('');
    hits += 1;
    round();
  }
  else {
    $(event.target).addClass("miss").text("X");
    miss += 1;
  }
}
// Обнуляет счетчик промахов
function clearMiss() {
  miss = 0;
  $(".game-field").removeClass("miss").text('');
}

function init() {
  $("#button-start").click(function(event) {
    $(event.target).addClass("d-none");
    $("#button-reload").removeClass("d-none");
    clearMiss();
    firstHitTime = new Date();
    round();
  });
  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {
    location.reload();
  });
}

$(document).ready(init);
