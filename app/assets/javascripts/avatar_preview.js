$(window).on("load", function() {
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
    
            reader.onload = function (e) {
                $('#img_prev').attr('src', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    
    $("#avatar-upload").change(function() {
        $('#img_prev').removeClass('hidden');
        $('#rem_hid').removeClass('hidden');
    readURL(this);
    });
});