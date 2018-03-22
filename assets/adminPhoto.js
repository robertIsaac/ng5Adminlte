$(function () {

    $("#uploadPhoto").change(function(){
        var photo=$(this)[0].files[0];
        if(!photo){
            $('#preview').attr('src', '');
        }else if(photo.size>5*1024*1024){
            alert('Sorry, your photo is too large.');
            $(this).val('');
            $('#preview').attr('src', '');
        }else if(!(photo.type=='image/jpg'||photo.type=='image/png'||photo.type=='image/jpeg'||photo.type=='image/gif')){
            alert('Sorry, only JPG, JPEG, PNG & GIF files are allowed.');
            $(this).val('');
            $('#preview').attr('src', '');
        }else{
             var reader = new FileReader();
             reader.onload = function (e) {
                 $('#preview').attr('src', e.target.result);
             };
             reader.readAsDataURL($(this)[0].files[0]);
        }
    });

    $('#upload').click(function (e) {
        e.preventDefault();
        //var photoHead=$('#photoHead');
        $('#loading').show();
        $('#photo').find('input[type=submit]').attr('disabled',true);
        var fd = new FormData();
        fd.append('photo', $('#uploadPhoto')[0].files[0]);
        $.ajax({
            url: ROOT + 'admin/uploadPhoto/',
            data: fd,
            processData: false,
            contentType: false,
            type: 'POST',
            success: function (data) {
                var obj = $.parseJSON(data);
                if (obj.state == 'success') {
                    $('#photo').find('input[type=submit]').attr('disabled',false);
                    $('#loading').hide();
                    $('#url').val('ROOT/image/upload/'+obj.photoName);
                } else {
                    alert(obj.message);
                }
            }
        });
    });

    //now the photo is uploaded and set it's name into url hidden input

    $('#photo').submit(function (e) {
        e.preventDefault();
        var buildId=$('#buildId').val();
        var photoId=$('#photoId').val();
        var head=$('#head').val();
        var headAr=$('#headAr').val();
        var contentId=$('#contentId').val();
        var url=$('#url').val();
        var tags=$('#tags').val();
        if(photoId==0){
            //add new photo
            if($('#photoId').find('option:contains("'+head+'")').length>0){
                alert('head already used');
                return false;
            }
            $.post(ROOT+'admin/insertPhoto/', {tags:tags, buildId:buildId, head:head, headAr:headAr, contentId:contentId, url:url}, function (r) {
                var o=JSON.parse(r);
                if(o[0]){
                    alert('done');
                    $('#photoId').append('<option value="'+o[1]+'">'+head+'</option>');
                    reset();
                    $('#contentId').val('');
                }else{
                    alert('error');
                }
            });
        }else{
            //edit exist photo
            if($('#photoId').find('option:not(:selected):contains("'+head+'")').length>0){
                alert('head already used');
                return false;
            }
            $.post(ROOT+'admin/updatePhoto/', {tags:tags, photoId:photoId, head:head, headAr:headAr, contentId:contentId, url:url}, function (r) {
                if(r=='true'){
                    alert('done');
                    reset();
                    $('#contentId').val('');
                    $('#photoId').val(0);
                }else{
                    alert('error');
                }
            });
        }
    });

    $('#buildId').change(function () {
        var buildId=$(this).val();
        if(buildId==''){
            reset();
        }else{
            $.post(ROOT+'admin/getBuildPhotos/', {buildId:buildId}, function (r) {
                var photos=JSON.parse(r);
                var photosOptions='<option value="0">add new photo</option>';
                for (var i=0, l=photos.length;i<l;i++){
                    photosOptions+='<option value="'+photos[i].id+'">'+photos[i].head+'</option>'
                }
                $('#photoId').html(photosOptions);
            });
            $.post(ROOT+'admin/getBuildContents/', {buildId:buildId}, function (r) {
                var contents=JSON.parse(r);
                var contentsOptions='<option value="">no content</option>';
                for (var i=0, l=contents.length;i<l;i++){
                    contentsOptions+='<option value="'+contents[i].id+'">'+contents[i].name+'</option>'
                }
                $('#contentId').html(contentsOptions);
            });
        }
    });

    $('#photoId').change(function () {
        var photoId=$(this).val();
        if(photoId==0){
            reset();
            $('#contentId').val('');
        }else{
            $.post(ROOT+'admin/getPhoto/', {photoId:photoId}, function (r) {
                var photos=JSON.parse(r);
                $('#head').val(photos.head);
                $('#headAr').val(photos.headAr);
                $('#url').val(photos.url);
                $('#contentId').val(photos.contentId);
                $('#tags').val('');
                for(var i=0,l=photos.tags.length;i<l;i++){
                    $('#tags').find('option[value='+photos.tags[0].tagId+']').prop('selected',true);
                }
            });
        }
    });

    function reset()
    {
        $('#head').val('');
        $('#headAr').val('');
        $('#url').val('');
        $('#preview').attr('src','');
        $('#tags').val('');
    }
});