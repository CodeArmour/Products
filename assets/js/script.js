$(document).ready(function() {
    $('#add-category').click(function() {
        $('#addCategoryModal').toggleClass('show');
    });

    $('.close-icon').click(function() {
        $('#addCategoryModal').removeClass('show');
    });
});

