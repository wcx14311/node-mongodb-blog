$('#settouxing').click(function(){
    $('.dialog-imgupLoad').show();
});
$('.dialog-imgupLoad .close').click(function(){
    $('.dialog-imgupLoad').hide();
});
$('#avatarInput').on('change', function(e) {
    var filemaxsize = 1024 * 5; //5M
    var target = $(e.target);
    var Size = target[0].files[0].size / 1024;
    if (Size > filemaxsize) {
        alert('图片过大，请重新选择!');
        $(".avatar-wrapper").childre().remove;
        return false;
    }
    if (!this.files[0].type.match(/image.*/)) {
        alert('请选择正确的图片!')
    };
});
$(".avatar-save").on("click", function() {
    html2canvas($('#imageHead'), {
        allowTaint: true,
        taintTest: false,
        onrendered: function(canvas) {
            canvas.id = "mycanvas";
            var dataUrl = canvas.toDataURL("image/jpeg");
            var newImg = document.createElement("img");
            newImg.src = dataUrl;
            imagesAjax(dataUrl);
            $('.dialog-imgupLoad').hide();
        }
    });
})

function imagesAjax(src) {
    var data = {};
    data.img = src;
    $.ajax({
        url: "/uploadHeadPortrait",
        data: data,
        type: "POST",
        dataType: 'json',
        success: function(res) {
            if (res.status) {
                window.parent.location.reload();
            }
        }
    });
}
function savepic() { 
    if (document.all.a1 == null) { 
        objIframe = document.createElement("IFRAME"); 
        document.body.insertBefore(objIframe); 
        objIframe.outerHTML = "<iframe name='a1' style='width:400px;hieght:300px' src='" + imageName.href + "'></iframe>"; 
        re = setTimeout("savepic()", 1) 
    } else { 
        clearTimeout(re) 
        pic = window.open(imageName.href, "a1") 
        pic.document.execCommand("SaveAs") 
        document.all.a1.removeNode(true) 
    } 
}  