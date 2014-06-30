Meteor.Spinner.options = {
    lines: 17, // The number of lines to draw
    length: 0, // The length of each line
    width: 4, // The line thickness
    radius: 4, // The radius of the inner circle
    corners: 0.3, // Corner roundness (0..1)
    rotate: 23, // The rotation offset
    direction: 1, // 1: clockwise, -1: counterclockwise
    color: '#282828', // #rgb or #rrggbb
    speed: 1.3, // Rounds per second
    trail: 43, // Afterglow percentage
    shadow: false, // Whether to render a shadow
    hwaccel: true, // Whether to use hardware acceleration
    className: 'spinner', // The CSS class to assign to the spinner
    zIndex: 2e9, // The z-index (defaults to 2000000000)
    top: 'auto', // Top position relative to parent in px
    left: 'auto' // Left position relative to parent in px
};