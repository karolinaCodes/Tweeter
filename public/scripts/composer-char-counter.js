$(document).ready(() => {
  $(".new-tweet-text").on("input", function () {
    //refactor?
    const maxLimit = 140;
    const inputLength = $(this).val().length;
    const counterVal = maxLimit - inputLength;

    const $counterEl = $(this).parent().find(".counter");

    $counterEl.text(counterVal);

    if (counterVal < 0) {
      $counterEl.addClass("invalid");
    } else {
      $counterEl.removeClass("invalid");
    }
  });
});
