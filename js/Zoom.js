function MouseIn() {
    var x_coordinate, y_coordinate;
    var imgpositon;
    var src;
    //get original image size
    var img = $(this);
    var theImage = new Image();
    var imgsource = img.attr("src");
    theImage.src = imgsource;
    var original_height = theImage.height
    var original_width = theImage.width;

    // displayed image size
    var Image_displaysize_width = img.width();
    var Image_displaysize_height = img.height();
    var Zoom_size = 200;
    var Mouse_Pointer = Zoom_size / 2;

    //Original Image: Display Image 
    var Image_Ratio = original_height / Image_displaysize_height;
    var Gap = Mouse_Pointer / Image_Ratio;

    imgpositon = img.offset();
    var image_left = imgpositon.left + Gap;
    var image_left_max = image_left + Image_displaysize_width - Gap;
    var image_top = imgpositon.top + Gap;
    var image_top_max = image_top + Image_displaysize_height - Gap;

    $(document).mousemove(function(e) {
        //move divZoom along with mouse cursor if it is inside the img
        x_coordinate = e.pageX;
        y_coordinate = e.pageY;
        var movable = $("#divMove");
        movable.css("visibility", "visible");
        movable.css("left", x_coordinate - Mouse_Pointer);
        movable.css("top", y_coordinate - Mouse_Pointer);
        movable.css("cursor", "none");
        movable.css("position", "absolute");

        // To hide the divZoom if the mouse cursor is out of the img 
        if (x_coordinate > image_left_max || x_coordinate < imgpositon.left || y_coordinate < image_top || y_coordinate > image_top_max) {
            movable.css("visibility", "hidden");
        }
        var mouseposition_overimage_left = x_coordinate - imgpositon.left;
        var mouseposition_overimage_top = y_coordinate - imgpositon.top;
        var background_position = "-" + (((mouseposition_overimage_left) * Image_Ratio) - Mouse_Pointer) + "px " + "-" + (((mouseposition_overimage_top) * Image_Ratio) - Mouse_Pointer) + "px";
        movable.css("background-image", 'url(' + imgsource + ')');
        movable.css("background-position", background_position);
        movable.css("width", Zoom_size + "px");
        movable.css("height", Zoom_size + "px");
        $("#status").html(y_coordinate + " " + image_top + " " + image_top_max + "the image ratio" + Image_Ratio + " the width" + $(this).width());
    });
}
function MouseOut() {
    $("#divMove").css("visibility", "hidden");
}
jQuery.fn.extend({
    ImageZoom: function () {
         $(this).hover(MouseIn,MouseOut);
    }
});